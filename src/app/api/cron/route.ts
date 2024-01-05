import { exec } from "child_process";

export async function PATCH() {
  exec("pm2 reload growl-cron");
  return Response.json({ result: "cron reloaded." });
}
