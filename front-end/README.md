# Front-End Project

### Principais Bibliotecas e Ferramentas Utilizadas

- **Vite**: Ferramenta de build e desenvolvimento para aplicações web.
- **React**: Biblioteca principal para construção da aplicação.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **Redux Toolkit**: Utilizado para gerenciamento de estado global da aplicação.
- **React Router**: Utilizado para gerenciamento de rotas na aplicação.
- **React Query**: Gerenciamento de estado assíncrono e cache de dados.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **React Bootstrap**: Biblioteca de componentes de interface baseados no Bootstrap.
- **Tailwind CSS**: Framework de estilos para construção de interfaces.
- **React Icons**: Biblioteca de ícones para React.
- **React Toastify**: Biblioteca para exibição de notificações.
- **ESLint**: Ferramenta de linting (análise de código) para JavaScript e TypeScript.
- **Jest**: Framework de testes para JavaScript e TypeScript.
- **Testing Library**: Conjunto de utilitários para testar componentes React.
- **Babel**: Transpilador JavaScript para converter código moderno em código compatível com navegadores antigos.
- **PostCSS**: Ferramenta para transformar CSS com plugins (como Autoprefixer).
- **Autoprefixer**: Plugin para PostCSS que adiciona prefixos específicos do navegador ao CSS.

### Organização de Pastas

- **src/**: Diretório principal do código-fonte.
  - **api/**: Configurações e endpoints da API.
    - `axiosConfig.ts`: Configuração do Axios com interceptadores.
    - `endpoints.ts`: Definição dos endpoints da API.
  - **components/**: Componentes reutilizáveis da aplicação.
  - **modules/**: Módulos da aplicação, cada um representando uma funcionalidade específica.
    - **auth/**: Funcionalidades de autenticação.
    - **color/**: Funcionalidades relacionadas a cores.
    - **notes/**: Funcionalidades relacionadas a notas.
    - **user/**: Funcionalidades relacionadas a usuários.
      - `hooks/`: Hooks customizados para operações relacionadas a usuários.
      - `routes/`: Rotas específicas do módulo.
      - `services/`: Serviços para comunicação com a API.
      - `types/`: Definição de tipos e interfaces.
        - `enums`: Enums específicos do módulo. 
      - `utils/`: Utilitários e funções auxiliares.
      - `views/`: Componentes de interface relacionados a usuários.
  - **routes/**: Configuração das rotas da aplicação.
    - `router.tsx`: Definição das rotas globais da aplicação.
  - **state/**: Gerenciamento de estado global.
    - `store.ts`: Configuração da store do Redux Toolkit.
    - **global/**: Slices globais da aplicação.
  - **styles/**: Arquivos de estilo global.
  - `main.tsx`: Ponto de entrada da aplicação.

### Configuração do Projeto

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Inicie a aplicação com `npm run dev`.

### Scripts Disponíveis

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm start`: Inicia a aplicação em modo de produção.
- `npm build`: Cria uma versão otimizada para produção.
- `npm test`: Executa os testes da aplicação.

### Contribuição

Sinta-se à vontade para contribuir com o projeto. Para isso, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.


