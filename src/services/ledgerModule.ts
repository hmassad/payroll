import { Prisma } from '../../db';

export async function saveUser(ledger: Prisma.LedgerCreateInput) {
  const response = await fetch('/api/ledger', {
    method: 'POST',
    body: JSON.stringify(ledger)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
