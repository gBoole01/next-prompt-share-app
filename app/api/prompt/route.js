import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to retrieve prompts"), {
      status: 500,
    });
  }
};
