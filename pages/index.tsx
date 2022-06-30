import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import classes from "../styles/Home.module.css";

const Index = ({rounds}) => {

  // console.debug({rounds})

  const handleClick = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({project: round.project})
    });
  };
  return (
    <Layout>
      <div className={classes.main}>
        <h1 className={classes.title}>Public Feed</h1>
        <main>
          {rounds.map(round => (
            <div key={round.id} className={classes.card}>
              <ul>
                <li>{round.user.name}</li>
                <li>{round.project}</li>
                <li>{round.startedAt.toLocaleString()}</li>
                <li>{round.finishedAt}</li>
              </ul>
              <button onClick={e => handleClick(e, round)} type="button">
                Crear Round
              </button>
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
        finishedAt: r.finishedAt?.toISOString(),
      })),
    }
  };
};
