
# Microservices Gateway

Este projeto tem como finalidade o desenvolvimento de dois microsserviços, utilizando Apache Kafka como mensageria entre os dois serviços. 



## Stack utilizada

+ **Back-end:** Node.js, Typescript, Express, Prisma e Jest.
+ **DevOps:** Docker e Apache Kafka.


## Aprendizados

+ Com a construção desse projeto, aprendi a unir microsserviços utilizando a biblioteca **express-gateway**, aprendi a utilizar o Apache Kafka para enviar dados entre os microsserviços que devem ser salvos em bancos de dados, aprendi a utilizar o Docker. 


## Conceitos utilizados nos microsserviços 

+ SOLID
+ Injeção de Dependência
+ Repository Pattern


## Rodando localmente

Clone o projeto.

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto.

```bash
  cd microservices-gateway
```

### Docker

Criar e iniciar contêiner para funcionamento do Kafka.

```bash
  docker compose up
```

### Microsserviços

Entre no diretório de cada um dos microsserviços.

```bash
  cd auth
```

```bash
  cd users
```

Instale as dependências de cada microsserviços.

```bash
  npm install
```

Gere o Prisma Client em cada microsserviços.

```bash
  npx prisma generate
```

Faça uma migração para gerar as tabelas no banco de dados em cada microsserviços.

```bash
  npx prisma migrate dev
```

Inicie o servidor cada microsserviços.

```bash
  npm run start
```

### API Gateway

Entre no diretório

```bash
  cd gateway
```

Instale as dependências.

```bash
  npm install
```

Inicie o servidor.

```bash
  npm run start
```
## Rodando os testes

Para rodar os testes de cada microsserviço, rode o seguinte comando

```bash
  npm run test
```

