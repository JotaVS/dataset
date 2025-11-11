#!/bin/bash

# Script para executar todos os casos de teste do dataset
# Cada caso é iniciado, testado e finalizado antes de passar para o próximo

echo "=========================================="
echo "Dataset de Testes - Execução Automatizada"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para executar um caso
run_case() {
    local case_number=$1
    local case_dir="case${case_number}"
    local port=$((3000 + case_number))
    
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}Case ${case_number} - Porta ${port}${NC}"
    echo -e "${BLUE}========================================${NC}"
    
    # Verifica se o diretório existe
    if [ ! -d "$case_dir" ]; then
        echo -e "${RED}✗ Diretório ${case_dir} não encontrado${NC}"
        return 1
    fi
    
    cd "$case_dir"
    
    # Instala dependências se necessário
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Instalando dependências...${NC}"
        npm install --silent > /dev/null 2>&1
    fi
    
    # Inicia o servidor em background
    echo -e "${YELLOW}Iniciando servidor...${NC}"
    npm start > /dev/null 2>&1 &
    local server_pid=$!
    
    # Aguarda o servidor iniciar
    echo -e "${YELLOW}Aguardando servidor inicializar...${NC}"
    sleep 3
    
    # Verifica se o servidor está rodando
    if ! ps -p $server_pid > /dev/null; then
        echo -e "${RED}✗ Falha ao iniciar o servidor${NC}"
        cd ..
        return 1
    fi
    
    echo -e "${GREEN}✓ Servidor iniciado (PID: ${server_pid})${NC}"
    
    # Aguarda um pouco mais para garantir que está pronto
    sleep 2
    
    # Executa o teste específico de cada caso
    echo -e "${YELLOW}Executando teste...${NC}"
    
    case $case_number in
        1)
            # Case 1: Auth Middleware API
            echo "  → Login (deve funcionar)"
            curl -s -X POST http://localhost:${port}/api/auth/login \
                -H "Content-Type: application/json" \
                -d '{"username":"admin","password":"123456"}' > /dev/null
            sleep 1
            echo "  → Dashboard com userId inválido (deve gerar erro)"
            curl -s http://localhost:${port}/api/dashboard -H "user-id: 999" > /dev/null
            ;;
        2)
            # Case 2: User Profile Service
            echo "  → Buscar perfil (deve gerar erro)"
            curl -s http://localhost:${port}/api/profile/1 > /dev/null
            ;;
        3)
            # Case 3: Order Processing API
            echo "  → Processar pedido (deve gerar erro)"
            curl -s -X POST http://localhost:${port}/api/orders \
                -H "Content-Type: application/json" \
                -d '{"userId":"user123","items":[{"id":"item1","qty":15}]}' > /dev/null
            ;;
        4)
            # Case 4: Payment Webhook API
            echo "  → Webhook com JSON inválido (deve gerar erro)"
            curl -s -X POST http://localhost:${port}/api/webhooks/payment \
                -H "Content-Type: application/json" \
                -d '{"status":"approved","amount":100,"transactionId":"TX123",}' > /dev/null
            ;;
        5)
            # Case 5: Config Loader API
            echo "  → Carregar config inexistente (deve gerar erro)"
            curl -s http://localhost:${port}/api/config/production > /dev/null
            ;;
        6)
            # Case 6: API Gateway
            echo "  → Buscar dados sem API_KEY (deve gerar erro)"
            curl -s http://localhost:${port}/api/users/123/data > /dev/null
            ;;
        7)
            # Case 7: Inventory Management API
            echo "  → Buscar produto (deve gerar erro de módulo)"
            curl -s http://localhost:${port}/api/inventory/PROD001 > /dev/null
            ;;
        8)
            # Case 8: Batch Processor API
            echo "  → Processar batch (deve gerar erro de array)"
            curl -s -X POST http://localhost:${port}/api/batch/process \
                -H "Content-Type: application/json" \
                -d '{"records":[{"id":1},{"id":2},{"id":3}]}' > /dev/null
            ;;
        9)
            # Case 9: Scheduling API
            echo "  → Criar evento com data inválida (deve gerar erro)"
            curl -s -X POST http://localhost:${port}/api/events \
                -H "Content-Type: application/json" \
                -d '{"title":"Meeting","startTime":"2024-Jan-01 10:00","timezone":"America/New_York"}' > /dev/null
            ;;
        10)
            # Case 10: User Export API
            echo "  → Exportar dados com referência circular (deve gerar erro)"
            curl -s http://localhost:${port}/api/export/user/123 > /dev/null
            ;;
        11)
            # Case 11: Category Tree API
            echo "  → Construir árvore circular (deve gerar erro)"
            curl -s http://localhost:${port}/api/categories/1/tree > /dev/null
            ;;
        12)
            # Case 12: Analytics API
            echo "  → Gerar relatório com divisão por zero (deve gerar erro)"
            curl -s http://localhost:${port}/api/analytics/report/user123 > /dev/null
            ;;
    esac
    
    # Aguarda tempo suficiente para processar e salvar os logs
    echo -e "${YELLOW}Aguardando processamento e salvamento dos logs...${NC}"
    sleep 20
    
    echo -e "${GREEN}✓ Teste executado${NC}"
    
    # Verifica se logs foram gerados
    if ls logs/error-original-*.json 1> /dev/null 2>&1; then
        echo -e "${GREEN}✓ Logs de erro gerados${NC}"
        local error_count=$(ls logs/error-original-*.json 2>/dev/null | wc -l)
        echo -e "  ${error_count} arquivo(s) de erro encontrado(s)"
    else
        echo -e "${YELLOW}⚠ Nenhum log de erro gerado${NC}"
    fi
    
    # Finaliza o servidor
    echo -e "${YELLOW}Finalizando servidor...${NC}"
    kill $server_pid 2>/dev/null
    wait $server_pid 2>/dev/null
    
    echo -e "${GREEN}✓ Case ${case_number} concluído${NC}"
    echo ""
    
    cd ..
}

# Executa todos os casos
for i in {1..12}; do
    run_case $i
    
    # Pequena pausa entre os casos
    sleep 1
done

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Todos os casos foram executados!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Logs de erro de cada caso: case*/logs/"
