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
- **Dificuldade**: Fácil
- **Stack trace**: Aponta diretamente para a linha 18 onde `userData.timestamp` é acessado
