import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (_request, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to retrieve prompt"), {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to edit prompt"), {
      status: 500,
    });
  }
};

export const DELETE = async (_request, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndRemove(params.id);

    return new Response(JSON.stringify("Prompt deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to delete prompt"), {
      status: 500,
    });
  }
};
