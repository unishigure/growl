import { Bot, ScheduledNote, NotificationNote } from "@prisma/client";
import { CronJob } from "cron";
import { setTimeout } from "timers/promises";

const API_ROOT = "http://localhost:3000/api";

async function callAPI(apiPath: string, method = "GET"): Promise<Response> {
    let isFetched = false;
    let response: any;

    while (!isFetched) {
        try {
            response = await fetch(`${API_ROOT}/${apiPath}`, { method: method }).then((notes) => {
                isFetched = true;
                return notes;
            });
        } catch (error) {
            console.log(`${Date()}: Waiting for API server starting...`);
            await setTimeout(5000);
        }
    }
    return response;
}

async function getScheduleNote(): Promise<ScheduledNote[]> {
    let scheduledNote = await callAPI("schedule");
    return scheduledNote.json();
}

async function getNotificationNote(): Promise<NotificationNote[]> {
    const scheduledNote = await callAPI("notification");
    return scheduledNote.json();
}

async function getBot(botId: number): Promise<Bot> {
    const bot = await callAPI(`bot?id=${botId}`);
    return bot.json();
}

async function sendNote(text: string, visibility: string, instance: string, token: string) {
    return await callAPI(
        `note` +
            `?text=${text}` +
            `&visibility=${visibility}` +
            `&instance=${instance}` +
            `&token=${token}`,
        "POST",
    );
}

getScheduleNote().then((list) => {
    if (list) {
        list.forEach((note) => {
            getBot(note.botId)
                .then((bot) => {
                    CronJob.from({
                        cronTime: note.schedule,
                        onTick: () => {
                            sendNote(
                                note.noteTemplate,
                                note.noteVisible,
                                bot.instance,
                                bot.token,
                            ).then(() =>
                                console.log(`${Date()}: ScheduledNote sent. id:${note.id}`),
                            );
                        },
                        start: true,
                    });
                    console.log(`${Date()}: ScheduledNote registered. id:${note.id}`);
                });
        });
    }
});

// TODO: Set crons
getNotificationNote().then((list) => {
    if (list) {
        list.forEach((note) => {
            console.log(`${Date()}: NotificationNote id:${note.id}`);
        });
    }
});
