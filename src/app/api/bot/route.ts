import {
  deleteById,
  findAll,
  findAllByIdAndInstance,
  findAllByInstance,
  findAllByName,
  findOneById,
  insert,
  update,
} from "./repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const name = searchParams.get("name");
  const instance = searchParams.get("instance");

  let bots;
  if (id != 0) {
    bots = await findOneById(id);
  } else if (name != null && instance != null) {
    bots = await findAllByIdAndInstance(name, instance);
  } else if (name != null) {
    bots = await findAllByName(name);
  } else if (instance != null) {
    bots = await findAllByInstance(instance);
  } else {
    bots = await findAll();
  }
  return Response.json(bots);
}

// TODO: avoid duplicate unique key
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const instance = searchParams.get("instance");
  const token = searchParams.get("token");

  if (name != null && instance != null && token != null) {
    await insert({ name: name, instance: instance, token: token });
    return Response.json({ result: "Bot created" });
  } else {
    return Response.json({ message: "Query required" }, { status: 400 });
  }
}

// TODO: avoid duplicate unique key
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const name = searchParams.get("name");
  const instance = searchParams.get("instance");
  const token = searchParams.get("token");

  if (id != 0 && name != null && instance != null && token != null) {
    await update(id, { name: name, instance: instance, token: token });
    return Response.json({ result: "Bot updated" });
  } else {
    return Response.json({ message: "Query required" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (id != 0) {
    await deleteById(id);
    return Response.json({ result: "Bot deleted" });
  } else {
    return Response.json({ message: "id required" }, { status: 400 });
  }
}
