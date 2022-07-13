import prisma from "../../lib/prisma";

const SingleUser = ({ userRounds }) => {
  return (
    <div>
      {userRounds.map(round => (
        <div key={round.id}>
          <ul>
            <li>{round.user.name}</li>
            <li>{round.project}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SingleUser;

export const getServerSideProps = async context => {
  const id = context.params.id;
  const userRounds = await prisma.round.findMany({
    where: {
      userId: parseInt(id)
    },
    select: {
      id: true,
      user: {
        select: {
          name: true
        }
      },
      userId: true,
      project: true
    }
  });
  return {
    props: {
      userRounds
    }
  };
};
