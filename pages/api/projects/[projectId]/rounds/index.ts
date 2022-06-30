import { prisma } from "../../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // const startedAt = Date.now().toString();
    // try {
    //   await prisma.round.create({
    //     data: {}
    //   });
    //   res.status(200).json({ message: "iniciado" });
    // } catch (error) {
    //   res.status(404);
    // }
  } else if (req.method === "GET") {
    return "Hello";
  }
};
export default handler;
