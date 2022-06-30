import { prisma } from "../lib/prisma";
import Layout from "../components/Layout";

const Index = ({ rounds }) => {
  const handleClick = (e, round) => {
    e.preventDefault();
    fetch(`/api/projects/${round.project}/rounds`, {
      method: "POST",
      body: JSON.stringify({ userId: round.userId })
    });
  };
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {rounds.map(round => (
            <div key={round.id} className="post">
              <ul>
                <li>{round.user.name}</li>
                <li>{round.project}</li>
                {/* <li>{round.finishedAt}</li> */}
              </ul>
              <button onClick={e => handleClick(e, round)} type="button">
                Crear Round
              </button>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
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
      rounds
    }
  };
};
