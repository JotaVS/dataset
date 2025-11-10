# Category Tree API

API de hierarquia de categorias em árvore.

## Como executar

```bash
npm start
```

## Teste que gera o erro

Tente construir árvore de categoria com referência circular:

```bash
curl http://localhost:3011/api/categories/1/tree
```

## Detalhes do erro

- **Tipo**: RangeError
- **Localização**: `services/categoryService.js`, linha 17 (função `buildCategoryTree`)
- **Causa raiz**: Recursão infinita devido a referências circulares nas categorias (categoria 1 → 2 → 1 → 2...). Sem condição de parada para detectar ciclos.

## Como solucionar

Adicione rastreamento de categorias visitadas para detectar ciclos:

```javascript
function buildCategoryTree(categoryId, includeProducts, visited = new Set()) {
  if (visited.has(categoryId)) {
    return { id: categoryId, name: "[Circular Reference]", children: [] };
  }

  visited.add(categoryId);

  const category = categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const tree = {
    id: category.id,
    name: category.name,
    children: [],
  };

  if (category.childrenIds && category.childrenIds.length > 0) {
    for (const childId of category.childrenIds) {
      const childTree = buildCategoryTree(
        childId,
        includeProducts,
        new Set(visited)
      );
      tree.children.push(childTree);
    }
  }

  return tree;
}
```
