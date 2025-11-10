# User Export API

API de exportação de dados de usuários.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Tente exportar dados de usuário com relações circulares:

```bash
curl http://localhost:3010/api/export/user/123
```

## Detalhes do erro

- **Tipo**: TypeError
- **Localização**: `services/exportService.js`, linha 9 (função `exportUserData`)
- **Causa raiz**: `JSON.stringify()` tenta serializar objeto com referência circular (user.manager.subordinate aponta de volta para user)

## Como solucionar

Use um replacer function para lidar com referências circulares:

```javascript
function exportUserData(userId, format) {
  const user = userRepository.getUserWithRelations(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const seen = new WeakSet();
  const exportData = JSON.stringify(
    user,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    },
    2
  );

  return exportData;
}
```
