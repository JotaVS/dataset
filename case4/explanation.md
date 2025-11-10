# Payment Webhook API

API de processamento de webhooks de pagamento.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Envie um payload JSON mal formatado (com vírgula extra):

```bash
curl -X POST http://localhost:3004/api/webhooks/payment -H "Content-Type: application/json" -d "{\"status\":\"approved\",\"amount\":100,\"transactionId\":\"TX123\",}"
```

## Detalhes do erro

- **Tipo**: SyntaxError
- **Localização**: `services/paymentService.js`, linha 6 (função `parseWebhookPayload`)
- **Causa raiz**: `JSON.parse()` recebe payload com vírgula extra no final, causando JSON inválido

## Como solucionar

Adicione validação ou tratamento de erro mais robusto:

```javascript
function parseWebhookPayload(rawBody) {
  try {
    const payload = JSON.parse(rawBody);
    return payload;
  } catch (error) {
    throw new Error(`Invalid JSON payload: ${error.message}`);
  }
}
```

Ou valide o payload antes de fazer parse com uma biblioteca como `ajv` ou `zod`.
