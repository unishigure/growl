FROM node:latest

RUN apt-get update
RUN npm install -g pnpm pm2

RUN useradd growl
USER growl

WORKDIR /home/growl
COPY --chown=growl:growl . ./

RUN pnpm i
RUN pnpm tsc src/cron.ts --outDir ./dist

CMD ["pm2-runtime", "ecosystem.config.js"]
