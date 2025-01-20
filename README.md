# Projeto Gestão de Usuários Fullstack (React + NestJS)

O projeto foi pensado para um sistema onde o administrador pode gerenciar usuários que se cadastram na plataforma.

- O administrador fazer login na rota `/auth/login` com as credenciais cadastradas no arquivo `.env`
- Os usuários podem se cadastrar na rota pública `/user/form` 
- Uma vez cadastrado um card com as informações do usuário é exibido para o administrador na rota `/user/form/dashboard`
- O administrador pode então visualizar as informações fornecidas pelo usuário e cadastrar notas no card do usuário.
- O administrador pode também editar e excluir as opções de resposta do formulário de cadastro do usuário. (Até o momento apenas a opção de cor preferida foi implementada)
  
Este projeto é uma aplicação web cliente-servidor, onde o front-end foi desenvolvido com React e o back-end com NestJS. O banco de dados utilizado é o PostgreSQL. Abaixo estão as instruções para configuração e execução de cada parte.
  
## Estrutura do Projeto

- **front-end/**: Diretório contendo o código-fonte do front-end.
- **back-end/**: Diretório contendo o código-fonte do back-end.

A listagem de pastas e arquivos foi omitida para simplificar a visualização. Para mais detalhes, consulte a documentação específica de cada parte.

## Configuração Geral

1. Clone o repositório.
2. Para rodar os serviços individualmente, siga as instruções de configuração e execução de cada parte. (Rodando primeiro o back-end e depois o front-end)
3. Para rodar o projeto com Docker, siga as instruções na seção abaixo.

## Rodando o Projeto com Docker

Para facilitar a execução do projeto, foi criado um arquivo `docker-compose.yml` que define os serviços necessários para rodar a aplicação. Siga as instruções abaixo para executar o projeto com Docker.

### Configuração do Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Navegue até o diretório raiz do projeto.
3. Execute `docker-compose up --build` para construir e iniciar os containers.

### Serviços Docker

- **postgres**: Banco de dados PostgreSQL.
- **adminer**: Interface de administração para o PostgreSQL.
- **app**: Aplicação back-end.
- **front**: Aplicação front-end.

### URLs de Acesso
Após a execução dos containers, a aplicação estará disponível nos seguintes endereços:
- **Front-End**: [http://localhost:80](http://localhost:80)
- **Back-End**: [http://localhost:3000](http://localhost:3000)
- **Adminer**: [http://localhost:8080](http://localhost:8080)
- **Swagger**: [http://localhost:3000/api](http://localhost:3000/api)
- **Página de Cadastro**: [http://localhost:80/user/form](http://localhost:80/user/form)
- **Página de Login**: [http://localhost:80/auth/login](http://localhost:80/auth/login)
  
## Decisões Técnicas

### Erro de Roteamento

Em uma SPA, o roteamento é gerenciado pelo JavaScript no lado do cliente. Se você tentar acessar uma rota diretamente pelo navegador, o servidor pode não saber como lidar com essa requisição, pois espera servir um arquivo estático que não existe.

Para resolver isso, o Nginx foi configurado para redirecionar todas as requisições para `index.html`, permitindo que o React Router gerencie o roteamento no lado do cliente.

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Escolha do React Query

O React Query foi escolhido por suas capacidades avançadas de gerenciamento de estado assíncrono e cache de dados, simplificando a lógica de busca, cache, sincronização e atualização de dados no front-end.

#### Benefícios

- **Gerenciamento de Cache**: Evita buscas desnecessárias e melhora a performance.
- **Sincronização Automática**: Mantém os dados atualizados automaticamente.
- **Revalidação em Segundo Plano**: Proporciona uma experiência de usuário mais fluida.
- **Facilidade de Uso**: API intuitiva e fácil de usar.

### Build Multiestágio do Docker

#### Motivação

O build multiestágio do Docker é utilizado para criar imagens Docker mais eficientes e seguras. Ele permite separar o processo de build do processo de execução, resultando em imagens menores e mais rápidas.

#### Benefícios

- **Imagens Menores**: Apenas os arquivos necessários para a execução são incluídos na imagem final.
- **Segurança**: Reduz a superfície de ataque ao excluir ferramentas de build e dependências desnecessárias.
- **Performance**: Imagens menores são mais rápidas para transferir e iniciar.

#### Exemplo de Uso

Aqui está um exemplo de Dockerfile com build multiestágio para o front-end:

```dockerfile
# syntax=docker/dockerfile:1.3-labs
# Enable Docker BuildKit
# Use a lightweight Node.js image for building
FROM node:22.13.0-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Use a lightweight Nginx image for serving
FROM nginx:1.25.2-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Neste exemplo, a primeira etapa (`build`) utiliza uma imagem Node.js para instalar dependências e construir a aplicação. A segunda etapa (`nginx`) utiliza uma imagem Nginx para servir a aplicação construída, resultando em uma imagem final menor e mais eficiente.

### Uso de Cache no Docker

#### Motivação

Para poupar tempo durante o build das imagens no GitHub Actions, foram adotados métodos como build multiestágio e uso de cache.

#### Benefícios

- **Redução de Tempo**: O uso de cache reduz significativamente o tempo necessário para construir as imagens.
- **Eficiência**: Aproveita camadas de build anteriores, evitando a reinstalação de dependências que não mudaram.

#### Exemplo de Uso

Aqui está um exemplo de como utilizar cache no Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1.3-labs
# Enable Docker BuildKit
# Use a lightweight Node.js image for building
FROM node:22.13.0-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install --frozen-lockfile

COPY . .
RUN npm run build

# Use a lightweight Nginx image for serving
FROM nginx:1.25.2-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Neste exemplo, a instrução `--mount=type=cache,target=/root/.npm` é utilizada para cachear as dependências do npm, reduzindo o tempo de build nas execuções subsequentes.

