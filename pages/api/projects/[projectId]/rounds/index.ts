import { prisma } from "../../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const startedAt = new Date();
    const payload = req.body;
    try {
      await prisma.round.create({
        data: {
          startedAt: startedAt,
          userId: payload.userId,
          project: String(payload.project)
        }
      });
      console.log(payload.project, startedAt);

      res.status(200).json({ message: "iniciado" });
    } catch (error) {
      res.status(404);
    }
  } else if (req.method === "GET") {
    return "Hello";
  }
};

export default handler;
