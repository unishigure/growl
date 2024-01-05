module.exports = {
  apps: [
    {
      name: "growl-cron",
      script: "./dist/cron.js",
      args: "start",
    },
  ],
};
