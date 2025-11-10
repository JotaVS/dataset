# Scheduling API

API de agendamento de eventos com suporte a timezones.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Envie uma data com formato inválido:

```bash
curl -X POST http://localhost:3009/api/events -H "Content-Type: application/json" -d "{\"title\":\"Meeting\",\"startTime\":\"2024-Jan-01 10:00\",\"timezone\":\"America/New_York\"}"
```

## Detalhes do erro

- **Tipo**: Error
- **Localização**: `utils/dateParser.js`, linha 12 (função `parseDateTime`)
- **Causa raiz**: Parser não valida se os componentes da data são numéricos. Entrada "2024-Jan-01" causa `NaN` ao fazer `.map(Number)`, resultando em data inválida

## Como solucionar

Valide os valores antes de criar a data:

```javascript
function parseDateTime(dateTimeString, timezone) {
  const parts = dateTimeString.split(" ");

  if (parts.length !== 2) {
    throw new Error("Invalid datetime format. Expected: YYYY-MM-DD HH:MM");
  }

  const [datePart, timePart] = parts;
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12`);
  }

  if (day < 1 || day > 31) {
    throw new Error(`Invalid day: ${day}`);
  }

  if (hours < 0 || hours > 23) {
    throw new Error(`Invalid hours: ${hours}`);
  }

  const date = new Date(year, month - 1, day, hours, minutes);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date values");
  }

  return date;
}
```
