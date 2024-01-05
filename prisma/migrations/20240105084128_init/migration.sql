-- CreateTable
CREATE TABLE "Bot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instance" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledNote" (
    "id" SERIAL NOT NULL,
    "schedule" TEXT NOT NULL,
    "noteTemplate" TEXT NOT NULL,
    "noteVisible" TEXT NOT NULL,
    "botId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationNote" (
    "id" SERIAL NOT NULL,
    "rssUrl" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "noteTemplate" TEXT NOT NULL,
    "noteVisible" TEXT NOT NULL,
    "botId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rss" (
    "id" SERIAL NOT NULL,
    "rssUrl" TEXT NOT NULL,
    "latestRss" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rss_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bot_name_instance_key" ON "Bot"("name", "instance");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationNote_rssUrl_key" ON "NotificationNote"("rssUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Rss_rssUrl_key" ON "Rss"("rssUrl");

-- AddForeignKey
ALTER TABLE "ScheduledNote" ADD CONSTRAINT "ScheduledNote_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationNote" ADD CONSTRAINT "NotificationNote_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rss" ADD CONSTRAINT "Rss_rssUrl_fkey" FOREIGN KEY ("rssUrl") REFERENCES "NotificationNote"("rssUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
