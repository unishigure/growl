import { Bot, ScheduledNote, NotificationNote } from "@prisma/client";
import { CronJob } from "cron";
import { setTimeout } from "timers/promises";

const API_ROOT = "http://localhost:3000/api";

async function callAPI(apiPath: string): Promise<Response> {
    let isFetched = false;
    let response: any;

    while (!isFetched) {
        try {
            response = await fetch(`${API_ROOT}/${apiPath}`).then((notes) => {
                isFetched = true;
                return notes;
            });
        } catch (error) {
            console.log("Waiting for API server starting...");
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

async function getBot(botId: string): Promise<Bot> {
    const bot = await callAPI(`bot?id=${botId}`);
    return bot.json();
}

const scheduledNoteList = getScheduleNote()
    .then((notes) => notes)
    .catch((error) => console.error(error));

const notificationNoteList = getNotificationNote()
    .then((notes) => notes)
    .catch((error) => console.error(error));

// TODO: Set crons
scheduledNoteList.then((list) => {
    if (list) {
        list.forEach((note) => {
            CronJob.from({
                cronTime: note.schedule,
                onTick: function () {
                    console.log(`${Date()}: ScheduledNote, ${note.id}`);
                },
                start: true,
            });
        });
    }
});

notificationNoteList.then((list) => {
    if (list) {
        list.forEach((note) => {
            CronJob.from({
                cronTime: note.schedule,
                onTick: function () {
                    console.log(`${Date()}: NotificationNote, ${note.id}`);
                },
                start: true,
            });
        });
    }
});
