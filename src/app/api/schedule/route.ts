import * as ScheduledNoteRepository from "./repository";
import { ScheduledNote } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const botId = Number(searchParams.get("botId"));

    let notes: ScheduledNote | ScheduledNote[] | null;
    if (id != 0) {
        notes = await ScheduledNoteRepository.findOneById(id);
    } else if (botId != 0) {
        notes = await ScheduledNoteRepository.findAllByBotId(botId);
    } else {
        notes = await ScheduledNoteRepository.findAll();
    }
    return Response.json(notes);
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const schedule = searchParams.get("schedule");
    const noteTemplate = searchParams.get("noteTemplate");
    const noteVisible = searchParams.get("noteVisible");
    const botId = Number(searchParams.get("botId"));

    const isActiveParam = searchParams.get("isActive")?.toLowerCase();
    let isActive = true;
    if (isActiveParam == "false" || isActiveParam == "0") {
        isActive = false;
    }

    // TODO: validation

    if (schedule != null && noteTemplate != null && noteVisible != null && botId != 0) {
        try {
            const bot = await ScheduledNoteRepository.insert({
                schedule: schedule,
                noteTemplate: noteTemplate,
                noteVisible: noteVisible,
                botId: botId,
                isActive: isActive,
            });
            return Response.json({ result: "ScheduledNote created", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
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
    const schedule = searchParams.get("schedule");
    const noteTemplate = searchParams.get("noteTemplate");
    const noteVisible = searchParams.get("noteVisible");
    const botId = Number(searchParams.get("botId"));

    const isActiveParam = searchParams.get("isActive")?.toLowerCase();
    let isActive = true;
    if (isActiveParam == "false" || isActiveParam == "0") {
        isActive = false;
    }

    // TODO: validation

    if (id != 0 && schedule != null && noteTemplate != null && noteVisible != null && botId != 0) {
        try {
            const bot = await ScheduledNoteRepository.update(id, {
                schedule: schedule,
                noteTemplate: noteTemplate,
                noteVisible: noteVisible,
                botId: botId,
                isActive: isActive,
            });
            return Response.json({ result: "ScheduledNote updated", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2003") {
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
            await ScheduledNoteRepository.deleteById(id);
            return Response.json({ result: "ScheduledNote deleted" });
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
