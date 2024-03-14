import * as RssRepository from "./repository";
import { Rss } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const rssUrl = searchParams.get("rssUrl");

    let rssList: Rss | Rss[] | null;
    if (id != 0) {
        rssList = await RssRepository.findOneById(id);
    } else if (rssUrl != null) {
        rssList = await RssRepository.findOneByRssUrl(rssUrl);
    } else {
        rssList = await RssRepository.findAll();
    }
    return Response.json(rssList);
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const rssUrl = searchParams.get("rssUrl");
    const latestRss = searchParams.get("latestRss");

    // TODO: validation

    if (rssUrl != null && latestRss != null) {
        try {
            const bot = await RssRepository.insert({
                rssUrl: rssUrl,
                latestRss: latestRss,
            });
            return Response.json({ result: "Rss created", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return Response.json({ error: "Duplicate of rssUrl" }, { status: 400 });
                } else if (error.code === "P2003") {
                    return Response.json({ error: "Not found specified rssUrl" }, { status: 400 });
                }
            }
            console.error(error);
            return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return Response.json({ error: "Query required" }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const rssUrl = searchParams.get("rssUrl");
    const latestRss = searchParams.get("latestRss");

    // TODO: validation

    if (id != 0 && rssUrl != null && latestRss != null) {
        try {
            const bot = await RssRepository.update(id, {
                rssUrl: rssUrl,
                latestRss: latestRss,
            });
            return Response.json({ result: "Rss updated", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return Response.json({ error: "Duplicate of rssUrl" }, { status: 400 });
                } else if (error.code === "P2003") {
                    return Response.json({ error: "Not found specified rssUrl" }, { status: 400 });
                } else if (error.code === "P2025") {
                    return Response.json(
                        { error: "Not found record with the specified ID" },
                        { status: 400 },
                    );
                }
            }
            console.error(error);
            return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return Response.json({ error: "Query required" }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (id != 0) {
        try {
            await RssRepository.deleteById(id);
            return Response.json({ result: "Rss deleted" });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                return Response.json(
                    { error: "Not found record with the specified ID" },
                    { status: 400 },
                );
            }
            console.error(error);
            return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return Response.json({ error: "id required" }, { status: 400 });
    }
}
