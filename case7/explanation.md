# Inventory Management API

Sistema de gerenciamento de inventário.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Tente buscar um produto:

```bash
curl http://localhost:3007/api/inventory/PROD001
```

## Detalhes do erro

- **Tipo**: Error (MODULE_NOT_FOUND)
- **Localização**: `services/inventoryService.js`, linha 1
- **Causa raiz**: `require("../databse/connection")` tem typo no caminho (databse ao invés de database)

## Como solucionar

Corrija o typo no caminho do require:

```javascript
const dbConnection = require("../database/connection");
```
