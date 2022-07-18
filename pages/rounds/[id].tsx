import prisma from "../../lib/prisma";
import Layout from "../../components/Layout/Layout";
import RoundInfo from "../../components/RoundInfo";

import moment from "moment";

const SingleUser = ({ rounds }) => {
  return (
    <Layout>
      <div className="flex flex-wrap gap-5">
        {rounds.map(round => (
          <RoundInfo key={round.id} round={round} />
        ))}
      </div>
    </Layout>
  );
};

export default SingleUser;

export const getServerSideProps = async req => {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      rounds: {
        select: {
          id: true,
          project: {
            select: {
              id: true,
              name: true,
              customer: true
            }
          },
          contractor: {
            select: {
              id: true,
              name: true
            }
          },
          assignment: {
            select: {
              id: true,
              rate: true
            }
          },
          assignmentId: true,
          userId: true,
          startedAt: true,
          finishedAt: true
        }
      }
    }
  });
  console.log(user.rounds);

  return {
    props: {
      rounds: user.rounds.map(r => ({
        ...r,
        startedAt: r.startedAt?.toISOString(),
        finishedAt: r.finishedAt?.toISOString(),
        duration:
          moment(r.finishedAt) > moment(new Date(0)) &&
          moment(r.finishedAt)
            .diff(moment(r.startedAt), "hours", true)
            .toFixed(1)
      }))
    }
  };
};
