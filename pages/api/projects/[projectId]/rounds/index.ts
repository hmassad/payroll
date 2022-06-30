import prisma from "../../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const payload = req.body as any;
    try {
      const newRound = await prisma.round.create({
        data: {
          startedAt: new Date(),
          project: payload.project,
          userId: payload.userId,
        },
      });
      console.log("created round", newRound);
      res.status(200).json({message: "iniciado"});
    } catch (error) {
      res.status(404);
    }
  } else if (req.method === "GET") {
    return "Hello";
  }
};

export default handler;
