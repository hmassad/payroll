import { prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const payload = body as any;
  console.log('🚀 ~ payload', payload);

  // switch (method) {
  //   case "POST":
  //     try {
  //       const newRound = await prisma.round.create({
  //         data: {
  //           startedAt: new Date(),
  //           project: payload.project,
  //           userId: payload.userId,
  //           finishedAt: new Date(0)
  //         }
  //       });
  //       res.status(200).json({ message: "iniciado" });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error });
  //     }
  //     break;

  //   case "PUT":
  //     try {
  //       console.log(payload.roundId);
  //       const closeRound = await prisma.round.update({
  //         where: {
  //           id: payload.roundId
  //         },
  //         data: {
  //           finishedAt: new Date()
  //         }
  //       });
  //       res.status(200).json({ message: "cerrado" });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error });
  //     }
  //     break;

  //   case "GET":
  //     return "Hello";
  //     break;
  // }
};

export default handler;
