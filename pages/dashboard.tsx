import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Button from "../components/Button";
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
      <div>
        <h1 className="text-3xl font-bold underline mb-5">Public Feed</h1>
        <main>
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
        </main>
      </div>
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const rounds = await prisma.round.findMany({
    select: {
      id: true,
      user: {
        select: {
          name: true
        }
      },
      userId: true,
      project: true,
      startedAt: true,
      finishedAt: true
    }
  });

  return {
    props: {
      rounds: rounds.map(r => ({
        ...r,
        startedAt: r.startedAt?.toISOString(),
        finishedAt: r.finishedAt?.toISOString()
      }))
    }
  };
};
