import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const payload = req.body as any;
    try {
      const newRound = await prisma.round.create({
        data: {
          startedAt: new Date(),
          project: payload.project,
          userId: payload.userId,
          finishedAt: new Date(0)
        }
      });
      res.status(200).json({ message: "iniciado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === "PUT") {
    try {
      const payload = req.body as any;
      const closeRound = await prisma.round.update({
        where: {
          id: payload.roundId
        },
        data: {
          finishedAt: new Date()
        }
      });
      res.status(200).json({ message: "iniciado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else if (req.method === "GET") {
    return "Hello";
  }
};

export default handler;
