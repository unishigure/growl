import { CronJob } from "cron";

// TODO: below is cronjob example
const job = CronJob.from({
    cronTime: "* * * * * *",
    onTick: function () {
        console.log("Hello, world. " + Date());
    },
    start: true,
    timeZone: "America/Los_Angeles",
});
