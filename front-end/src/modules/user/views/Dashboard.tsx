import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../components/layout/Header";
import { RootState } from "../../../state/rootReducer";
import UserCard from "../components/UserCard";
import { useSearchUsers } from "../hooks/useUserHooks";

/**
 * Componente de dashboard.
 */
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    fullName: "",
  });
  const theme = useSelector((state: RootState) => state.theme.theme);

  const { data: userList, isLoading, error } = useSearchUsers(searchParams);

  const handleSearch = () => {
    setSearchParams({ ...searchParams, fullName: searchTerm });
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchParams({ page: 1, limit: 10, fullName: "" });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (error) {
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as { message?: string })
        ?.message;
      if (
        axiosError.response?.status === 404 &&
        errorMessage === "No users found with the given filters"
      ) {
        toast.info("Nenhum usuário encontrado para os filtros fornecidos.");
      } else {
        toast.error("Erro ao buscar usuários. Tente novamente mais tarde.");
      }
    }
  }, [error]);

  return (
    <>
      <Header />
      <div className="flex items-center w-full h-dvh bg-white text-black dark:bg-background-dark dark:text-white flex-col">
        <section className="flex items-center w-full px-8 py-6 justify-between">
          <h3 className="text-4xl text-menu-title-dark ">Meus clientes</h3>
          <div className="flex items-center gap-4">
            <Form.Control
              type="text"
              placeholder="Pesquisar por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${
                theme === "dark"
                  ? "bg-form-darkgray text-white border-form-gray placeholder-dark"
                  : "placeholder-light"
              }`}
            />
            <Button onClick={handleSearch} className="btn btn-primary">
              Pesquisar
            </Button>
          </div>
        </section>
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
