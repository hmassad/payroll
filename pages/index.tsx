import { prisma } from "../lib/prisma";
import Layout from "../components/Layout";

const Index = ({ rounds }) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {rounds.map(round => (
            <div key={round.id} className="post">
              {round.name}
              {round.project}
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
      name: true,
      project: true
    }
  });
  return {
    props: {
      rounds
    }
  };
};
