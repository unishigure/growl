import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAll() {
  return await prisma.rss.findMany();
}

export async function findOneById(id: number) {
  return await prisma.rss.findUnique({ where: { id: id } });
}

export async function findAllByRssUrl(rssUrl: string) {
  return await prisma.rss.findMany({ where: { rssUrl: rssUrl } });
}

export async function insert(rssUrl: string, rss: Prisma.RssCreateInput) {
  return await prisma.rss.create({
    data: {
      rssUrl: rssUrl,
      latestRss: rss.latestRss,
    },
  });
}

export async function update(
  id: number,
  rssUrl: string,
  rss: Prisma.RssUpdateInput
) {
  return await prisma.rss.update({
    data: {
      rssUrl: rssUrl,
      latestRss: rss.latestRss,
    },
    where: { id: id },
  });
}

export async function deleteById(id: number) {
  return await prisma.rss.delete({ where: { id: id } });
}
