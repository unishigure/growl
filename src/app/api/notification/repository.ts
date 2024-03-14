import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAll() {
    return await prisma.notificationNote.findMany();
}

export async function findOneById(id: number) {
    return await prisma.notificationNote.findUnique({ where: { id: id } });
}

export async function findAllByRssUrl(rssUrl: string) {
    return await prisma.notificationNote.findMany({ where: { rssUrl: rssUrl } });
}

export async function findAllByBotId(botId: number) {
    return await prisma.notificationNote.findMany({ where: { botId: botId } });
}

export async function insert(notificationNote: Prisma.NotificationNoteUncheckedCreateInput) {
    return await prisma.notificationNote.create({
        data: {
            rssUrl: notificationNote.rssUrl,
            schedule: notificationNote.schedule,
            noteTemplate: notificationNote.noteTemplate,
            noteVisible: notificationNote.noteVisible,
            botId: notificationNote.botId,
        },
    });
}

export async function update(
    id: number,
    notificationNote: Prisma.NotificationNoteUncheckedUpdateInput,
) {
    return await prisma.notificationNote.update({
        data: {
            rssUrl: notificationNote.rssUrl,
            schedule: notificationNote.schedule,
            noteTemplate: notificationNote.noteTemplate,
            noteVisible: notificationNote.noteVisible,
            botId: notificationNote.botId,
        },
        where: { id: id },
    });
}

export async function deleteById(id: number) {
    return await prisma.notificationNote.delete({ where: { id: id } });
}
