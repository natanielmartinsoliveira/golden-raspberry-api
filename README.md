# Golden Raspberry API




Esta aplicação é uma API RESTful desenvolvida com NestJS para consultar a lista de filmes indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards, com base em um arquivo CSV. Ela permite obter informações sobre os produtores com maior e menor intervalo entre prêmios consecutivos.

## Funcionalidades

    Importação de dados: Ao iniciar a aplicação, os dados dos filmes são lidos do arquivo CSV e inseridos no banco de dados em memória (SQLite).
    Consulta de produtores: Obtenha o produtor com o maior intervalo entre prêmios consecutivos e o que obteve dois prêmios mais rapidamente.

## Tecnologias Utilizadas

    1.NestJS
    2.SQLite (banco de dados em memória)
    3.TypeORM
    4.csv-parser

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

````bash

npm install

```


## Rodando a Aplicação

    Inicie o servidor NestJS:

````bash
npm run start
# ou
yarn start
# ou
yarn install
```
