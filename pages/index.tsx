import type { NextPage } from 'next';
import { IndexPage } from '../src/screens';
// import { createPrismaClient } from '../db';

const Home: NextPage = () => {
  return <IndexPage />;
};

// export async function getServerSideProps() {
//   const prisma = createPrismaClient();
//   const users = await prisma.user.findMany();

//   return {
//     props: {
//       initialUser: JSON.parse(JSON.stringify(users))
//     }
//   };
// }

export default Home;
