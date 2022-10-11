import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const newUser = await JSON.parse(req.body);
  const savedUser = await prisma.user.create({
    data: newUser
  });
  res.json(savedUser);
}
