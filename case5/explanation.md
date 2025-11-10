# Config Loader API

API de carregamento de arquivos de configuração.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Tente carregar um ambiente que não existe:

```bash
curl http://localhost:3005/api/config/production
```

## Detalhes do erro

- **Tipo**: Error (ENOENT)
- **Localização**: `services/configService.js`, linha 19 (função `readConfigFile`)
- **Causa raiz**: `fs.readFileSync()` tenta ler arquivo `config/production.json` que não existe

## Como solucionar

Valide a existência do arquivo antes de ler:

```javascript
function readConfigFile(environment) {
  const configPath = path.join(
    __dirname,
    "..",
    "config",
    `${environment}.json`
  );

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Configuration file not found for environment: ${environment}`
    );
  }

  const fileContent = fs.readFileSync(configPath, "utf8");
  const config = JSON.parse(fileContent);

  return config;
}
```
