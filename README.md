# Golden Raspberry API

Esta aplicação é uma API RESTful desenvolvida com NestJS para consultar a lista de filmes indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards, com base em um arquivo CSV. Ela permite obter informações sobre os produtores com maior e menor intervalo entre prêmios consecutivos.

## Funcionalidades

Importação de dados: Ao iniciar a aplicação, os dados dos filmes são lidos do arquivo CSV e inseridos no banco de dados em memória (SQLite).
Consulta de produtores: Obtenha o produtor com o maior intervalo entre prêmios consecutivos e o que obteve dois prêmios mais rapidamente.

## Tecnologias Utilizadas

    1.[Karma](https://nestjs.com/)
    2.[SQLite](https://www.sqlite.org/) (banco de dados em memória)
    3.[TypeORM](https://typeorm.io/)
    4.[csv-parser](https://www.npmjs.com/package/csv-parser)

## Requisitos

    1.Node.js (>= 14.x)
    2.npm ou yarn
    
## Instalação
Clone este repositório:

```bash

git clone https://github.com/seu-usuario/golden-raspberry-api.git

```

Navegue até o diretório do projeto:

```bash
cd golden-raspberry-api
```


Instale as dependências:

```bash
npm install
```


## Rodando a Aplicação

Inicie o servidor NestJS:

```bash
npm run start
# ou
yarn start
# ou
yarn install
```

A aplicação será iniciada e estará disponível em: http://localhost:3000.

## Endpoints

Obter produtores com maior e menor intervalo entre vitórias consecutivas

GET /movies/producers

Retorna os produtores com o maior intervalo entre dois prêmios consecutivos e o menor intervalo entre prêmios.

Resposta de Exemplo:

```json

{
  "min": [
    {
      "producer": "Produtor A",
      "interval": 1,
      "previousWin": 2001,
      "followingWin": 2002
    }
  ],
  "max": [
    {
      "producer": "Produtor B",
      "interval": 10,
      "previousWin": 1990,
      "followingWin": 2000
    }
  ]
}
```

## Testes de Integração

Para garantir a consistência dos dados e a funcionalidade correta da API, foram implementados testes de integração.
Rodar os Testes

Execute os testes de integração com o seguinte comando:

```bash

npm run test
# ou
yarn test

```
