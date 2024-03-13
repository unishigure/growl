import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAll() {
    return await prisma.bot.findMany();
}

export async function findOneById(id: number) {
    return await prisma.bot.findUnique({ where: { id: id } });
}

export async function findAllByName(name: string) {
    return await prisma.bot.findMany({ where: { name: name } });
}

export async function findAllByInstance(instance: string) {
    return await prisma.bot.findMany({ where: { instance: instance } });
}

export async function findAllByIdAndInstance(name: string, instance: string) {
    return await prisma.bot.findMany({
        where: { name: name, instance: instance },
    });
}

export async function insert(bot: Prisma.BotCreateInput) {
    return await prisma.bot.create({
        data: { name: bot.name, instance: bot.instance, token: bot.token },
    });
}

export async function update(id: number, bot: Prisma.BotUpdateInput) {
    return await prisma.bot.update({
        data: { name: bot.name, instance: bot.instance, token: bot.token },
        where: { id: id },
    });
}

export async function deleteById(id: number) {
    return await prisma.bot.delete({ where: { id: id } });
}
