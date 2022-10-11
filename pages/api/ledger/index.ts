import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../../db';

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const newLedger  = await JSON.parse(req.body);
  const savedLedger = await prisma.ledger.create({
    data: newLedger
  });
  res.json(savedLedger);
}
