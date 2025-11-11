# Descrição dos Cases - Dataset de Erros

## Case 1 - TypeError: Acesso a propriedade de objeto null

**Cenário:** Sistema de autenticação com middleware para APIs.

**Erro:** Ao tentar acessar o dashboard com um `userId` inexistente, o sistema busca o usuário no repositório que retorna `null`. A função `formatUserName` tenta acessar `user.name` sem verificar se o objeto existe, causando `TypeError: Cannot read properties of null (reading 'name')`.

**Localização:** `services/authService.js`, linha 30

---

## Case 2 - ReferenceError: Variável não definida

**Cenário:** Serviço de gerenciamento de perfis de usuário.

**Erro:** A função `processUserData` tenta acessar a variável `userData.timestamp`, mas essa variável nunca foi declarada ou inicializada no escopo da função, causando `ReferenceError: userData is not defined`.

**Localização:** `app.js`, linha 24

---

## Case 3 - UnhandledPromiseRejection: Promise sem tratamento de erro

**Cenário:** API de processamento de pedidos com operações assíncronas.

**Erro:** Ao processar pedidos com valor total maior que 100, a função `notifyUser` lança um erro. A promise chain em `app.js` não possui `.catch()` para capturar esse erro, resultando em `UnhandledPromiseRejectionWarning`.

**Localização:** `app.js`, linhas 17-23 (falta `.catch()`)

---

## Case 4 - SyntaxError: JSON mal formatado

**Cenário:** API de processamento de webhooks de pagamento.

**Erro:** O endpoint recebe um payload JSON com vírgula extra no final (`{"status":"approved",...,}`). Quando `JSON.parse()` tenta processar esse JSON inválido, lança `SyntaxError: Unexpected token } in JSON`.

**Localização:** `services/paymentService.js`, linha 4

---

## Case 5 - Error (ENOENT): Arquivo não encontrado

**Cenário:** API de carregamento de arquivos de configuração.

**Erro:** Ao tentar carregar configuração de produção, `fs.readFileSync()` tenta ler `config/production.json` que não existe no sistema de arquivos, causando `Error: ENOENT: no such file or directory`.

**Localização:** `services/configService.js`, linha 25

---

## Case 6 - TypeError: Variável de ambiente undefined

**Cenário:** Gateway de integração com serviços externos.

**Erro:** O código tenta usar `process.env.API_KEY` como header de autorização, mas essa variável de ambiente não foi definida. O valor `undefined` é concatenado na URL, causando `TypeError: fetch failed`.

**Localização:** `config/apiConfig.js`, linha 2

---

## Case 7 - Error (MODULE_NOT_FOUND): Typo em caminho de módulo

**Cenário:** Sistema de gerenciamento de inventário.

**Erro:** O código tenta fazer `require("../databse/connection")` com typo no caminho (databse ao invés de database). Node.js não encontra o módulo e lança `Error: Cannot find module '../databse/connection'`.

**Localização:** `services/inventoryService.js`, linha 2

---

## Case 8 - TypeError: Off-by-one error em loop

**Cenário:** API de processamento de dados em lote.

**Erro:** Loop usa `i <= records.length` ao invés de `i < records.length`. Na última iteração, tenta acessar `records[3]` em um array de tamanho 3, que retorna `undefined`. Ao tentar acessar `undefined.id`, causa `TypeError: Cannot read properties of undefined (reading 'id')`.

**Localização:** `services/batchProcessor.js`, linha 7

---

## Case 9 - Error: Validação insuficiente de entrada

**Cenário:** API de agendamento de eventos com suporte a timezones.

**Erro:** Parser de data recebe entrada "2024-Jan-01 10:00" e faz `.split('-').map(Number)`. A string "Jan" é convertida para `NaN` pelo `Number()`. Ao criar `new Date(2024, NaN, 1)`, resulta em data inválida, causando `Error: Invalid date values`.

**Localização:** `utils/dateParser.js`, linha 9

---

## Case 10 - TypeError: Referência circular em JSON

**Cenário:** API de exportação de dados de usuários.

**Erro:** Objeto `user` tem propriedade `manager`, que por sua vez tem propriedade `subordinate` apontando de volta para `user` (referência circular). Ao tentar serializar com `JSON.stringify()`, causa `TypeError: Converting circular structure to JSON`.

**Localização:** `services/exportService.js`, linha 10

---

## Case 11 - RangeError: Recursão infinita

**Cenário:** API de hierarquia de categorias em árvore.

**Erro:** Categoria 1 tem filho 2, categoria 2 tem filho 1 (referência circular). A função recursiva `buildCategoryTree` não verifica ciclos, causando recursão infinita até estourar a pilha de chamadas: `RangeError: Maximum call stack size exceeded`.

**Localização:** `services/categoryService.js`, linha 18

---

## Case 12 - RangeError: Valor inválido para tamanho de array

**Cenário:** API de cálculo de métricas e análises.

**Erro:** Usuário sem sessões causa `calculateConversionRate(0, 0)` que resulta em `(0/0) * 100 = NaN`. Depois `1000 / NaN = NaN`. Tentar criar `new Array(NaN)` causa `RangeError: Invalid array length`.

**Localização:** `services/analyticsService.js`, linha 35

---

## Resumo de Tipos de Erro

- **TypeError**: 4 cases (1, 6, 8, 10) - Acesso inválido a propriedades/operações
- **ReferenceError**: 1 case (2) - Variável não declarada
- **SyntaxError**: 1 case (4) - JSON mal formatado
- **RangeError**: 2 cases (11, 12) - Valores fora do intervalo válido
- **UnhandledPromiseRejection**: 1 case (3) - Promise sem tratamento
- **ENOENT**: 1 case (5) - Arquivo não encontrado
- **MODULE_NOT_FOUND**: 1 case (7) - Módulo não encontrado
- **Error**: 1 case (9) - Erro customizado de validação
