import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Button from "../components/Button";

const Index = ({ rounds }) => {
  // console.debug({rounds})

  const handleClick = (e, round) => {
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
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold underline">Public Feed</h1>
        <main>
          {rounds.map(round => (
            <div
              key={round.id}
              className="px-6 py-4 max-w-sm rounded overflow-hidden shadow-lg"
            >
              <ul>
                <li>{round.user.name}</li>
                <li>{round.project}</li>
                <li>{round.startedAt.toLocaleString()}</li>
                <li>{round.finishedAt !== new Date(0) && round.finishedAt}</li>
              </ul>
              <Button onClick={e => handleClick(e, round)} type="button">
                "Crear Round"
              </Button>
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
