import * as NotificationNoteRepository from "./repository";
import { NotificationNote } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const rssUrl = searchParams.get("rssUrl");
    const botId = Number(searchParams.get("botId"));

    let notes: NotificationNote | NotificationNote[] | null;
    if (id != 0) {
        notes = await NotificationNoteRepository.findOneById(id);
    } else if (rssUrl != null) {
        notes = await NotificationNoteRepository.findAllByRssUrl(rssUrl);
    } else if (botId != 0) {
        notes = await NotificationNoteRepository.findAllByBotId(botId);
    } else {
        notes = await NotificationNoteRepository.findAll();
    }
    return Response.json(notes);
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const rssUrl = searchParams.get("rssUrl");
    const schedule = searchParams.get("schedule");
    const noteTemplate = searchParams.get("noteTemplate");
    const noteVisible = searchParams.get("noteVisible");
    const botId = Number(searchParams.get("botId"));

    // TODO: validation

    if (
        rssUrl != null &&
        schedule != null &&
        noteTemplate != null &&
        noteVisible != null &&
        botId != 0
    ) {
        try {
            const bot = await NotificationNoteRepository.insert({
                rssUrl: rssUrl,
                schedule: schedule,
                noteTemplate: noteTemplate,
                noteVisible: noteVisible,
                botId: botId,
            });
            return Response.json({ result: "NotificationNote created", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                return Response.json({ error: "Duplicate of rssUrl" }, { status: 400 });
            } else if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003"
            ) {
                return Response.json({ error: "Not found specified bot" }, { status: 400 });
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
    const schedule = searchParams.get("schedule");
    const noteTemplate = searchParams.get("noteTemplate");
    const noteVisible = searchParams.get("noteVisible");
    const botId = Number(searchParams.get("botId"));

    // TODO: validation

    if (
        id != 0 &&
        rssUrl != null &&
        schedule != null &&
        noteTemplate != null &&
        noteVisible != null &&
        botId != 0
    ) {
        try {
            const bot = await NotificationNoteRepository.update(id, {
                rssUrl: rssUrl,
                schedule: schedule,
                noteTemplate: noteTemplate,
                noteVisible: noteVisible,
                botId: botId,
            });
            return Response.json({ result: "NotificationNote created", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return Response.json({ error: "Duplicate of rssUrl" }, { status: 400 });
                } else if (error.code === "P2003") {
                    return Response.json({ error: "Not found specified bot" }, { status: 400 });
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
            await NotificationNoteRepository.deleteById(id);
            return Response.json({ result: "NotificationNote deleted" });
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
