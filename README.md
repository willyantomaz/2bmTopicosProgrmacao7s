<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  ---

## **Descrição**

Este é um projeto de API RESTful desenvolvido com NestJS, focado em autenticação de usuários via JWT (JSON Web Tokens) e controle de acesso baseado em papéis (roles). A aplicação permite o cadastro de usuários com dois tipos de papéis: `admin` e `user`. Usuários `admin` possuem permissões adicionais, como listar, editar e deletar qualquer usuário, enquanto usuários comuns (`user`) podem visualizar e editar apenas seus próprios perfis. O armazenamento dos dados é feito utilizando **PostgreSQL** com **TypeORM**.

---

## **Pré-requisitos**

Para rodar esta aplicação em sua máquina, você precisará ter o seguinte instalado:

* **Node.js** (versão 18.x ou superior recomendada)
* **npm** (gerenciador de pacotes do Node.js)
* **PostgreSQL** (servidor de banco de dados)

---

## **Configuração do Banco de Dados (PostgreSQL)**

Antes de iniciar a aplicação, você precisa configurar o banco de dados PostgreSQL.

1.  **Instale o PostgreSQL:** Se você ainda não tem o PostgreSQL instalado, baixe e instale-o através do site oficial ou do gerenciador de pacotes do seu sistema operacional.
2.  **Verifique o Status:** Certifique-se de que o servidor PostgreSQL está rodando, geralmente na porta `5432`.
3.  **Crie o Banco de Dados:** Crie um banco de dados com o nome `atividade`. Você pode fazer isso via `psql` (terminal do PostgreSQL) ou uma ferramenta gráfica como pgAdmin ou DBeaver.
    ```sql
    CREATE DATABASE atividade;
    ```
4.  **Credenciais do Usuário:** A API está configurada para usar o usuário `postgres` com a senha `123`. Certifique-se de que seu usuário `postgres` tem essa senha definida e permissão para acessar o banco de dados `atividade`. Você pode definir a senha via `psql` (ex: `ALTER USER postgres WITH PASSWORD '123';`).

    **Atenção:** Em ambientes de produção, é **altamente recomendável** usar credenciais mais seguras e variáveis de ambiente para a configuração do banco de dados.

---

## **Configuração do Projeto**

### **Instalação das Dependências**

Após clonar o repositório, navegue até a pasta do projeto no seu terminal e instale as dependências:

```bash

$ npm install
Isso instalará todos os pacotes necessários, incluindo @nestjs/typeorm, typeorm, pg, @nestjs/jwt, passport, bcryptjs, e class-validator.
````

Executando a Aplicação
Modo de Desenvolvimento
Para iniciar a API em modo de desenvolvimento (com hot-reloading):
Bash

$ npm run start:dev
A API estará disponível em http://localhost:3000. O TypeORM irá automaticamente criar as tabelas no seu banco de dados atividade na primeira execução devido à configuração synchronize: true em src/app.module.ts.

Outros Comandos
Compilar e Rodar (Produção):
```Bash

$ npm run start:prod
````
Compilar (apenas):
```Bash

$ npm run build
````


Endpoints da API
A API oferece as seguintes rotas principais para gerenciamento de usuários e autenticação:
```Bash
POST /users/register: Cadastra um novo usuário.
Público.
Body: { "username": "...", "email": "...", "password": "...", "role": "user" | "admin" }
POST /auth/login: Realiza o login do usuário e retorna um JWT.
Público.
Body: { "email": "...", "password": "..." }
Resposta: { "access_token": "..." }
GET /users: Lista todos os usuários.
Protegida por JWT. Apenas admin.
Header: Authorization: Bearer <seu_token_jwt>
GET /users/:id: Visualiza um usuário específico.
Protegida por JWT. admin pode ver qualquer um; user pode ver apenas o próprio perfil.
Header: Authorization: Bearer <seu_token_jwt>
PATCH /users/:id: Edita um usuário específico.
Protegida por JWT. admin pode editar qualquer um (incluindo o papel); user pode editar apenas o próprio perfil (não pode alterar o papel).
Header: Authorization: Bearer <seu_token_jwt>
Body: { "username"?: "...", "email"?: "...", "password"?: "...", "role"?: "user" | "admin" }
DELETE /users/:id: Deleta um usuário específico.
Protegida por JWT. Apenas admin.
Header: Authorization: Bearer <seu_token_jwt>
````
