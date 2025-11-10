# Batch Processor API

API de processamento de dados em lote.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Envie um array de registros para processar:

```bash
curl -X POST http://localhost:3008/api/batch/process -H "Content-Type: application/json" -d "{\"records\":[{\"id\":1},{\"id\":2},{\"id\":3}]}"
```

## Detalhes do erro

- **Tipo**: TypeError
- **Localização**: `services/batchProcessor.js`, linha 6 (função `processRecords`)
- **Causa raiz**: Loop usa `i <= records.length` ao invés de `i < records.length`, causando acesso a `records[3]` que é `undefined`

## Como solucionar

Corrija a condição do loop:

```javascript
for (let i = 0; i < records.length; i++) {
  const record = records[i];
  // ...
}
```

Arrays em JavaScript são zero-indexed, então o último índice válido é `length - 1`.
