import Layout from "../components/Layout";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/Button";
import useRequireAuth from "../lib/useRequireAuth";

const Home = () => {
  const session = useRequireAuth();
  if (!session) return <div>Cargando...</div>;
  return (
    <Layout>
      <div>
        <h1>{`Hola ${session?.user?.name}`}</h1>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </Layout>
  );
};

export default Home;
