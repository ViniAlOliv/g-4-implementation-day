# Event Manager API

API Rest para gerenciar eventos, criada com Express e Javascript. Armazenamento em memória, sem banco de dados.

## Funcionalidades
- Listagem de eventos
- Filtro por período (data inicial e final)
- Filtro por tag
- Cadastro de eventos (nome, data início, data final, tag)
- Documentação Swagger disponível em `/api-docs`

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger:
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Observações
- API para fins de estudo/teste, não recomendada para produção.
- Todos os dados são armazenados em memória.
