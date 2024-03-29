import * as BotRepository from "./repository";
import { Bot } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    const name = searchParams.get("name");
    const instance = searchParams.get("instance");

    let bots: Bot | Bot[] | null;
    if (id != 0) {
        bots = await BotRepository.findOneById(id);
    } else if (name != null && instance != null) {
        bots = await BotRepository.findAllByIdAndInstance(name, instance);
    } else if (name != null) {
        bots = await BotRepository.findAllByName(name);
    } else if (instance != null) {
        bots = await BotRepository.findAllByInstance(instance);
    } else {
        bots = await BotRepository.findAll();
    }
    return Response.json(bots);
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const instance = searchParams.get("instance");
    const token = searchParams.get("token");

    // TODO: validation

    if (name != null && instance != null && token != null) {
        try {
            const bot = await BotRepository.insert({
                name: name,
                instance: instance,
                token: token,
            });
            return Response.json({ result: "Bot created", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                return Response.json({ error: "Duplicate of name & instance" }, { status: 400 });
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
    const name = searchParams.get("name");
    const instance = searchParams.get("instance");
    const token = searchParams.get("token");

    // TODO: validation

    if (id != 0 && name != null && instance != null && token != null) {
        try {
            const bot = await BotRepository.update(id, {
                name: name,
                instance: instance,
                token: token,
            });
            return Response.json({ result: "Bot updated", data: bot });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return Response.json(
                        { error: "Duplicate of name & instance" },
                        { status: 400 },
                    );
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
            await BotRepository.deleteById(id);
            return Response.json({ result: "Bot deleted" });
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
