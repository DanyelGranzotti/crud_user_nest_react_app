# Back-End Project

### Principais Bibliotecas e Ferramentas Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **TypeORM**: ORM para interação com bancos de dados.
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Passport**: Middleware de autenticação para Node.js.
- **JWT**: Utilizado para autenticação baseada em tokens.
- **Bcrypt**: Biblioteca para hashing de senhas.
- **Class Validator**: Biblioteca para validação de objetos.
- **Swagger**: Ferramenta para documentação de APIs.
- **Jest**: Framework de testes para JavaScript e TypeScript.
- **Supertest**: Biblioteca para testes de integração de APIs.
- **ESLint**: Ferramenta de linting (análise de código) para JavaScript e TypeScript.
- **Prettier**: Ferramenta de formatação de código.

### Organização de Pastas

- **src/**: Diretório principal do código-fonte.
  - **common/**: Código compartilhado entre diferentes módulos.
    - `filters/`: Filtros globais da aplicação.
  - **database/**: Configurações e migrações do banco de dados.
  - **modules/**: Módulos da aplicação, cada um representando uma funcionalidade específica.
    - **auth/**: Funcionalidades de autenticação.
    - **colors/**: Funcionalidades relacionadas a cores.
    - **notes/**: Funcionalidades relacionadas a notas.
    - **users/**: Funcionalidades relacionadas a usuários.
  - `main.ts`: Ponto de entrada da aplicação.

### Configuração do Projeto

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie a aplicação com `npm run start:dev`.

### Scripts Disponíveis

- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm start`: Inicia a aplicação em modo de produção.
- `npm run build`: Cria uma versão otimizada para produção.
- `npm test`: Executa os testes da aplicação.
- `npm run migration:generate`: Gera uma nova migração.
- `npm run migration:run`: Executa as migrações pendentes.
- `npm run migration:revert`: Reverte a última migração executada.

### Contribuição

Sinta-se à vontade para contribuir com o projeto. Para isso, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
