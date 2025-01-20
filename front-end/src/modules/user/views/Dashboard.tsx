import Header from "../../../components/layout/Header";

/**
 * Componente de dashboard.
 */
const Dashboard = () => {
  // const { data: users, isLoading, error } = useGetUsers({});

  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col">
        <h2 className="text-2xl sm:text-3xl">Bem-vindo ao Dashboard!</h2>
        <p className="text-xs sm:text-base text-gray-400">
          Aqui você pode gerenciar suas informações.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
