import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAll() {
    return await prisma.rss.findMany();
}

export async function findOneById(id: number) {
    return await prisma.rss.findUnique({ where: { id: id } });
}

export async function findOneByRssUrl(rssUrl: string) {
    return await prisma.rss.findUnique({ where: { rssUrl: rssUrl } });
}

export async function insert(rss: Prisma.RssUncheckedCreateInput) {
    return await prisma.rss.create({
        data: {
            rssUrl: rss.rssUrl,
            latestRss: rss.latestRss,
        },
    });
}

export async function update(id: number, rss: Prisma.RssUncheckedUpdateInput) {
    return await prisma.rss.update({
        data: {
            rssUrl: rss.rssUrl,
            latestRss: rss.latestRss,
        },
        where: { id: id },
    });
}

export async function deleteById(id: number) {
    return await prisma.rss.delete({ where: { id: id } });
}
