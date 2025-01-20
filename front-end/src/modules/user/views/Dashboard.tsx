import Header from "../../../components/layout/Header";
import UserCard from "../components/UserCard";
import { useGetUsers } from "../hooks/useUserHooks";

/**
 * Componente de dashboard.
 */
const Dashboard = () => {
  const { data: userList, isLoading, error } = useGetUsers({});

  return (
    <>
      <Header />
      <div className="flex items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col">
        <section>Meus clientes</section>
        <div className="flex flex-wrap gap-4 justify-center w-full px-8 py-6">
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao carregar usuários.</p>}
          {userList?.data &&
            userList.data.map((user) => (
              <UserCard
                key={user.id}
                userId={user.id}
                fullName={user.fullName}
                email={user.email}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
