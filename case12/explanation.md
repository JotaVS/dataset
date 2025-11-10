# Analytics API

API de cálculo de métricas e análises.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Gere relatório de usuário sem sessões:

```bash
curl http://localhost:3012/api/analytics/report/user123
```

## Detalhes do erro

- **Tipo**: RangeError
- **Localização**: `services/analyticsService.js`, linha 17 (função `generateUserReport`)
- **Causa raiz**: Divisão `0/0` resulta em `NaN`. Calcular `1000 / NaN` resulta em `NaN`. `new Array(NaN)` lança `RangeError: Invalid array length`

## Como solucionar

Valide divisores antes de calcular:

```javascript
function calculateConversionRate(conversions, totalVisits) {
  if (totalVisits === 0) {
    return 0;
  }
  return (conversions / totalVisits) * 100;
}

function generateUserReport(userId) {
  const userData = {
    userId,
    sessions: [],
    purchases: 0,
  };

  const conversionRate =
    userData.sessions.length > 0
      ? statsCalculator.calculateConversionRate(
          userData.purchases,
          userData.sessions.length
        )
      : 0;

  // ...
}
```
