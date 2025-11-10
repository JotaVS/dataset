# Dataset de Testes - Projeto TCC

Este projeto serve como dataset de testes para validar um sistema de análise e detecção de erros. Cada caso simula cenários reais de falhas comuns em desenvolvimento, gerando logs de erro estruturados para alimentar o sistema de análise.

## Estrutura do Projeto

O projeto contém 12 casos de teste independentes, cada um representando um tipo específico de erro comum em aplicações Node.js. Todos os casos incluem:

- **Aplicação funcional**: Código que executa e gera o erro específico
- **Logs estruturados**: Erros capturados em formato JSON para análise
- **Documentação**: Arquivo `explanation.md` detalhando o erro e solução

## Casos de Teste

### Case 1 - Auth Middleware API

**Erro**: `TypeError` - Acesso a propriedade de objeto null  
**Cenário**: Sistema de autenticação tenta formatar nome de usuário inexistente  
**Porta**: 3001  
**Causa**: Falta de validação antes de acessar `user.name` quando usuário não é encontrado

### Case 2 - User Profile Service

**Erro**: `ReferenceError` - Variável não definida  
**Cenário**: Processamento de perfil de usuário referencia variável inexistente  
**Porta**: 3002  
**Causa**: Uso de variável `userData` que nunca foi declarada

### Case 3 - Order Processing API

**Erro**: `UnhandledPromiseRejectionWarning`  
**Cenário**: Processamento de pedidos com operações assíncronas sem tratamento  
**Porta**: 3003  
**Causa**: Promise chain sem `.catch()` para capturar rejeições

### Case 4 - Payment Webhook API

**Erro**: `SyntaxError` - JSON inválido  
**Cenário**: Processamento de webhook de pagamento com payload malformado  
**Porta**: 3004  
**Causa**: `JSON.parse()` recebe string com vírgula extra no final

### Case 5 - Config Loader API

**Erro**: `Error (ENOENT)` - Arquivo não encontrado  
**Cenário**: Carregamento de arquivo de configuração inexistente  
**Porta**: 3005  
**Causa**: `fs.readFileSync()` tenta ler arquivo que não existe

### Case 6 - API Gateway

**Erro**: `TypeError` - Variável de ambiente undefined  
**Cenário**: Gateway tenta usar API key não configurada  
**Porta**: 3006  
**Causa**: `process.env.API_KEY` é undefined e usado sem validação

### Case 7 - Inventory Management API

**Erro**: `Error (MODULE_NOT_FOUND)` - Módulo não encontrado  
**Cenário**: Sistema de inventário com erro de importação  
**Porta**: 3007  
**Causa**: Typo no caminho do require (`databse` ao invés de `database`)

### Case 8 - Batch Processor API

**Erro**: `TypeError` - Array index out of bounds  
**Cenário**: Processamento em lote com loop incorreto  
**Porta**: 3008  
**Causa**: Loop usa `i <= array.length` ao invés de `i < array.length`

### Case 9 - Scheduling API

**Erro**: `Error` - Data inválida  
**Cenário**: API de agendamento recebe formato de data inválido  
**Porta**: 3009  
**Causa**: Parser não valida componentes de data, gerando valores `NaN`

### Case 10 - User Export API

**Erro**: `TypeError` - Referência circular em JSON  
**Cenário**: Exportação de dados com relações bidirecionais  
**Porta**: 3010  
**Causa**: `JSON.stringify()` não consegue serializar objetos com referências circulares

### Case 11 - Category Tree API

**Erro**: `RangeError` - Stack overflow  
**Cenário**: Construção de árvore de categorias com dependências circulares  
**Porta**: 3011  
**Causa**: Recursão infinita sem detecção de ciclos

### Case 12 - Analytics API

**Erro**: `RangeError` - Invalid array length  
**Cenário**: Cálculo de métricas com divisão por zero  
**Porta**: 3012  
**Causa**: Operação `0/0` resulta em `NaN`, usado como tamanho de array

## Como Usar

### Testar e gerar o erro

Cada caso possui sua própria forma de teste catalogada no arquivo `explanation.md`, incluindo comandos `curl` específicos e instruções detalhadas para reproduzir o erro.

### Logs gerados

Os erros são automaticamente salvos em:

- `logs/error-original-*.json` - Stacktrace completo do erro
- `logs/webhook-response-*.json` - Resposta formatada para o sistema de análise

## Tecnologias

- Node.js
- Express.js
- Sistema de logging customizado (`utils/errorLogger.js`)

## Objetivo Acadêmico

Este dataset foi desenvolvido como parte de um trabalho de conclusão de curso (TCC) focado em análise automatizada de erros em aplicações Node.js. Os casos cobrem os tipos de erro mais comuns no desenvolvimento real:

- Validação de dados
- Manipulação de null/undefined
- Tratamento de erros assíncronos
- Parsing de JSON
- Operações com filesystem
- Configuração de ambiente
- Estruturas de dados circulares
- Validação de entrada do usuário

---

**Nota**: Todos os casos são propositalmente defeituosos para fins de teste. Os arquivos `explanation.md` em cada pasta contêm as soluções corretas.
