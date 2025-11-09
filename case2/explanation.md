# User Profile Service

Serviço simples de gerenciamento de perfis de usuário.

## Como executar

```bash
npm start
```

## Teste

Acesse: `http://localhost:3000/api/profile/1`

## Detalhes do erro

- **Tipo**: ReferenceError
- **Localização**: `app.js`, linha 18 (função `processUserData`)
- **Causa raiz**: Variável `userData` não inicializada

## Como solucionar

Remova a referência à variável inexistente ou inicialize-a:

```javascript
function processUserData(userId) {
  const profile = getUserProfile(userId);

  const formattedData = {
    id: profile.id,
    displayName: profile.name,
    contact: profile.email,
    lastUpdate: new Date().toISOString(), // Corrigido
  };

  return formattedData;
}
```
