import { Prisma } from '../../db';

export async function saveUser(user: Prisma.UserCreateInput) {
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
