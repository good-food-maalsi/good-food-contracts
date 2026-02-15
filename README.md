# @good-food/contracts

Contrats d'API typés pour les micro-services Good Food utilisant [ts-rest](https://ts-rest.com/).

## Installation

### 1. Créer un Personal Access Token GitHub

1. Aller sur GitHub > Settings > Developer settings > Personal access tokens
2. Créer un token avec la permission `read:packages`

### 2. Configurer `.npmrc`

Ajouter dans chaque projet consommateur un fichier `.npmrc` :

```
@good-food:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### 3. Installer le package

```bash
NPM_TOKEN=ghp_xxx npm install @good-food/contracts
```

## Usage

### Côté serveur (Express)

```typescript
import { createExpressEndpoints } from '@ts-rest/express';
import { franchiseContract } from '@good-food/contracts/franchise';

const router = createExpressEndpoints(franchiseContract.franchises, {
  getAll: async ({ query }) => {
    const result = await franchiseHandler.getFranchises(query);
    return { status: 200, body: result };
  },
  getById: async ({ params }) => {
    const franchise = await franchiseHandler.getFranchiseById(params.id);
    return { status: 200, body: franchise };
  },
  // ... autres handlers
});

app.use('/api', router);
```

### Côté serveur (NestJS)

```typescript
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { authContract } from '@good-food/contracts/auth';

@Controller()
export class AuthController {
  @TsRestHandler(authContract.login)
  async login() {
    return tsRestHandler(authContract.login, async ({ body }) => {
      const result = await this.authService.login(body);
      return { status: 200, body: result };
    });
  }
}
```

### Côté client (fetch)

```typescript
import { initClient } from '@ts-rest/core';
import { franchiseContract } from '@good-food/contracts/franchise';

const client = initClient(franchiseContract, {
  baseUrl: 'http://localhost:8080/franchise',
  baseHeaders: { 'Content-Type': 'application/json' },
  credentials: 'include',
});

// Appels typés
const franchises = await client.franchises.getAll({ query: { page: 1, limit: 10 } });
const franchise = await client.franchises.getById({ params: { id: 'uuid' } });
```

### Côté client (React Query)

```typescript
import { initQueryClient } from '@ts-rest/react-query';
import { franchiseContract } from '@good-food/contracts/franchise';

export const franchiseQuery = initQueryClient(franchiseContract, {
  baseUrl: 'http://localhost:8080/franchise',
  credentials: 'include',
});

// Dans un composant
function FranchisesList() {
  const { data, isLoading } = franchiseQuery.franchises.getAll.useQuery({
    queryKey: ['franchises'],
    queryData: { query: { page: 1 } },
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.body.data.map(f => <p key={f.id}>{f.name}</p>)}</div>;
}
```

## Types disponibles

### Auth

```typescript
import {
  LoginInput,
  RegisterInput,
  User,
  PublicUser,
} from '@good-food/contracts/auth';
```

### Franchise

```typescript
import {
  // Franchise
  Franchise,
  CreateFranchiseInput,
  UpdateFranchiseInput,
  FranchiseQueryParams,

  // Command
  Command,
  CommandWithItems,
  CreateCommandInput,
  UpdateCommandInput,
  CommandStatus,

  // Ingredient
  Ingredient,
  CreateIngredientInput,

  // Category
  Category,
  CreateCategoryInput,

  // Supplier
  Supplier,
  CreateSupplierInput,

  // Stock
  Stock,
  UpsertStockInput,
} from '@good-food/contracts/franchise';
```

## Workflow de développement

### Modifier le contrat

```bash
# 1. Cloner le repo contracts
git clone git@github.com:YOUR_ORG/good-food-contracts.git
cd good-food-contracts

# 2. Faire les modifications
# 3. Bump version
npm version patch  # ou minor/major

# 4. Push avec tag
git push && git push --tags

# 5. GitHub Actions publie automatiquement

# 6. Dans les repos consommateurs
npm update @good-food/contracts
```

### Développement local (sans publier)

```bash
# Dans contracts/
npm link

# Dans franchise-service/
npm link @good-food/contracts
```

## Structure

```
src/
├── auth/
│   ├── schemas.ts      # Zod schemas pour auth
│   ├── contract.ts     # ts-rest contract
│   └── index.ts
├── franchise/
│   ├── schemas/
│   │   ├── command.ts
│   │   ├── franchise.ts
│   │   ├── category.ts
│   │   ├── ingredient.ts
│   │   ├── supplier.ts
│   │   ├── stock.ts
│   │   └── index.ts
│   ├── contract.ts     # ts-rest contract
│   └── index.ts
├── common/
│   ├── schemas.ts      # Schemas partagés
│   └── index.ts
└── index.ts
```

## Ajouter un nouveau micro-service

1. Créer `src/<service>/schemas.ts` et `src/<service>/contract.ts`
2. Exporter dans `src/<service>/index.ts`
3. Ajouter l'export dans `package.json` > `exports`
4. Bump version et publier
