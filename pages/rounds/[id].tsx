import { prisma } from "../../lib/prisma";

const SingleUser = ({ userRounds }) => {
  return <div>{userRounds.name}</div>;
};

export default SingleUser;

export const getServerSideProps = async context => {
  const id = context.params.id;
  const userRounds = await prisma.round.findUnique({
    where: {
      id: parseInt(id)
    },
    select: {
      name: true,
      project: true
    }
  });
  return {
    props: { userRounds }
  };
};
