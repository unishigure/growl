FROM node:latest

RUN apt-get update
RUN npm install -g pnpm

RUN useradd growl
USER growl

WORKDIR /home/growl
COPY --chown=growl:growl . ./

RUN pnpm i
RUN pnpm build
RUN pnpm tsc src/cron.ts --outDir ./dist

CMD ["pnpm", "start"]
