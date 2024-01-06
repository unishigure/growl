import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAll() {
  return await prisma.scheduledNote.findMany();
}

export async function findOneById(id: number) {
  return await prisma.scheduledNote.findUnique({ where: { id: id } });
}

export async function findAllByBotId(botId: number) {
  return await prisma.scheduledNote.findMany({ where: { botId: botId } });
}

export async function insert(
  scheduledNote: Prisma.ScheduledNoteCreateInput,
  botId: number
) {
  return await prisma.scheduledNote.create({
    data: {
      schedule: scheduledNote.schedule,
      noteTemplate: scheduledNote.noteTemplate,
      noteVisible: scheduledNote.noteVisible,
      botId: botId,
    },
  });
}

export async function update(
  id: number,
  scheduledNote: Prisma.ScheduledNoteUpdateInput,
  botId: number
) {
  return await prisma.scheduledNote.update({
    data: {
      schedule: scheduledNote.schedule,
      noteTemplate: scheduledNote.noteTemplate,
      noteVisible: scheduledNote.noteVisible,
      botId: botId,
    },
    where: { id: id },
  });
}

export async function deleteById(id: number) {
  return await prisma.scheduledNote.delete({ where: { id: id } });
}
