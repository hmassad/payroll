import Layout from "../components/Layout/Layout";
import { signOut } from "next-auth/react";
import Button from "../components/UI/Button";
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
