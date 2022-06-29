import { prisma } from "../../lib/prisma";

const handler = async (req, res) => {
  const startedAt = Date.now().toString();
  try {
    await prisma.round.create({
      data: {
        startedAt
      }
    });
    res.status(200).json({ message: "iniciado" });
  } catch (error) {
    res.status(404);
  }
};

export default handler;
