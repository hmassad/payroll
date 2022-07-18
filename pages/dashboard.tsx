import prisma from "../lib/prisma";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import RoundInfo from "../components/RoundInfo";
import moment from "moment";

const Index = ({ rounds }) => {
  // console.debug({rounds})

  const handleCreateRound = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        project: round.project,
        userId: round.userId,
        roundId: round.id
      })
    });
  };

  const handleCloseRound = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        roundId: round.id
      })
    });
  };
  return (
    <Layout>
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-5">
          {rounds.map(round => (
            <RoundInfo
              key={round.id}
              project={round.project.name}
              contractor={round.contractor.name}
              rate={round.assignment.rate}
              customer={round.project.customer}
              startedAt={round.startedAt}
              finishedAt={round.finishedAt}
              name={round.contractor.name}
            />
          ))}
        </div>
        {/* <main className="flex flex-wrap gap-5">
          {rounds.map(round => (
            <div key={round.id} className="card mb-3">
              <ul>
                <li>{round.user.name}</li>
                <li>{round.project}</li>
                <li>
                  {moment(round.startedAt)
                    .local()
                    .format("YYYY-MM-DD HH:mm:ss")}
                </li>
                <li>
                  {moment(round.finishedAt) > moment(new Date(0)) &&
                    moment(round.finishedAt)
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")}
                </li>
              </ul>
              {moment(round.finishedAt) > moment(new Date(0)) ? (
                <Button
                  className="btn-primary"
                  onClick={e => handleCreateRound(e, round)}
                  type="button"
                >
                  Crear Round
                </Button>
              ) : (
                <Button
                  className="btn-warning"
                  onClick={e => handleCloseRound(e, round)}
                  type="button"
                >
                  Cerrar Round
                </Button>
              )}
            </div>
          ))}
        </main> */}
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const user = await prisma.user.findUnique({
    where: {
      id: 1
    },
    include: {
      rounds: {
        select: {
          project: {
            select: {
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
        finishedAt: r.finishedAt?.toISOString()
      }))
    }
  };
};
