# Order Processing API

API de processamento de pedidos com operações assíncronas.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Envie um pedido com valor total maior que 100:

```bash
curl -X POST http://localhost:3003/api/orders -H "Content-Type: application/json" -d "{\"userId\":\"user123\",\"items\":[{\"id\":\"item1\",\"qty\":15}]}"
```

## Detalhes do erro

- **Tipo**: UnhandledPromiseRejectionWarning / Error
- **Localização**: `services/orderService.js`, linha 39 (função `notifyUser`)
- **Causa raiz**: Promise chain sem `.catch()` no `app.js` (linha 21-27). Quando `notifyUser` lança erro para pedidos > 100, vira Unhandled Rejection

## Como solucionar

Adicione `.catch()` na promise chain:

```javascript
orderService
  .processOrder(userId, items)
  .then((order) => {
    return orderService.notifyUser(order);
  })
  .then((notification) => {
    console.log("User notified:", notification);
  })
  .catch((error) => {
    console.error("Order processing error:", error);
  });
```
