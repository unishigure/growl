import { Bot, ScheduledNote, NotificationNote, Rss } from "@prisma/client";
import { CronJob } from "cron";

const API_ROOT = `http://${process.env.IS_DOCKER ? "api" : "localhost"}:3000/api`;

// TODO: below is cronjob example
const job = CronJob.from({
    cronTime: "* * * * * *",
    onTick: function () {
        console.log(`Hello, world. ${Date()}`);
    },
    start: true,
    timeZone: "America/Los_Angeles",
});

async function getScheduleNote(): Promise<ScheduledNote[]> {
    const scheduledNote = await fetch(`${API_ROOT}/schedule`);
    return scheduledNote.json();
}

async function getNotificationNote(): Promise<NotificationNote[]> {
    const scheduledNote = await fetch(`${API_ROOT}/notification`);
    return scheduledNote.json();
}

async function getBot(botId: string): Promise<Bot> {
    const bot = await fetch(`${API_ROOT}/bot?id=${botId}`);
    return bot.json();
}

// TODO: Get ScheduledNote
const scheduledNoteList = getScheduleNote()
    // .then((notes) => notes)
    .then((notes) => {
        console.log(notes);
        return notes;
    })
    .catch((error) => console.error(error));

// TODO: Get NotificationNote
const notificationNoteList = getNotificationNote()
    // .then((notes) => notes)
    .then((notes) => {
        console.log(notes);
        return notes;
    })
    .catch((error) => console.error(error));

// TODO: Set crons
scheduledNoteList.then((list) => {
    if (list) {
        list.forEach((note) => {
            CronJob.from({
                cronTime: note.schedule,
                onTick: function () {
                    console.log(`Hello, world. ${Date()}`);
                },
                start: true,
            });
        });
    }
});
