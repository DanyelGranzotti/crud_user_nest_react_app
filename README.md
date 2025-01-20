# Projeto Gestão de Usuários (React + NestJS)

Gerencie usuários em uma plataforma que permite cadastro, visualização de dados e anotações por parte do administrador.

## Funcionalidades Principais
- Login do administrador em /auth/login (credenciais no .env).
- Cadastro de usuários em /user/form (rota pública).
- Visualização de usuários cadastrados em /user/form/dashboard.
- Gerenciamento de opções de formulário (por exemplo, cor preferida).

## Estrutura do Projeto
- **front-end/**: Aplicação React.
- **back-end/**: Aplicação NestJS.

## Preparando o Ambiente
1. Clone o repositório.
2. Inicie e configure primeiro o back-end, depois o front-end.
3. Para uso via Docker, siga as instruções abaixo.

## Execução com Docker
1. Verifique a instalação do Docker e Docker Compose.
2. Na raiz do projeto, execute:
   ```
   docker-compose up --build
   ```
3. Serviços disponíveis:
   - **postgres**: Banco de dados PostgreSQL.
   - **adminer**: Interface de administração para o PostgreSQL.
   - **app**: Aplicação back-end (porta 3000).
   - **front**: Aplicação front-end (porta 80).

### Principais URLs
- **Front-End**: http://localhost:80  
- **Back-End**: http://localhost:3000  
- **Adminer**: http://localhost:8080  
- **Swagger**: http://localhost:3000/api  
- **Formulário de Cadastro**: http://localhost:80/user/form  
- **Login**: http://localhost:80/auth/login  

## Decisões Técnicas

### Roteamento em SPA
O Nginx redireciona qualquer rota que não corresponda a um arquivo estático para `index.html`, permitindo que o React Router lide com o roteamento interno.

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
O React Query simplifica a busca e o cache de dados de forma assíncrona no front-end.

### Build Multiestágio do Docker
O uso de build multiestágio gera imagens menores e separa etapas de build e execução.

```dockerfile
# syntax=docker/dockerfile:1.3-labs
FROM node:22.13.0-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Uso de Cache no Docker
Para otimizar tempo no GitHub Actions, utiliza-se cache no processo de build.

```dockerfile
# syntax=docker/dockerfile:1.3-labs
FROM node:22.13.0-alpine AS build

WORKDIR /usr/app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install --frozen-lockfile

COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

