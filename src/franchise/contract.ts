import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { paginatedResponseSchema, errorResponseSchema, messageResponseSchema } from '../common/schemas.js';
import {
  // Franchise schemas
  franchiseSchema,
  createFranchiseSchema,
  updateFranchiseSchema,
  franchiseQuerySchema,
  // Category schemas
  categorySchema,
  createCategorySchema,
  updateCategorySchema,
  categoryQuerySchema,
  // Ingredient schemas
  ingredientSchema,
  ingredientWithCategoriesSchema,
  createIngredientSchema,
  updateIngredientSchema,
  ingredientQuerySchema,
  addCategoriesToIngredientSchema,
  // Supplier schemas
  supplierSchema,
  createSupplierSchema,
  updateSupplierSchema,
  supplierQuerySchema,
  // Command schemas
  commandSchema,
  commandWithItemsSchema,
  createCommandSchema,
  updateCommandSchema,
  commandQuerySchema,
  addIngredientToCommandSchema,
  updateCommandIngredientSchema,
  // Stock schemas
  stockSchema,
  stockWithIngredientSchema,
  upsertStockSchema,
  updateStockQuantitySchema,
  stockFranchiseQuerySchema,
  createStockFranchiseSchema,
  updateStockFranchiseSchema,
} from './schemas/index.js';

const c = initContract();

// ===== Franchises Contract =====
const franchisesContract = c.router({
  getAll: {
    method: 'GET',
    path: '/franchises',
    query: franchiseQuerySchema,
    responses: {
      200: paginatedResponseSchema(franchiseSchema),
    },
    summary: 'Get all franchises',
  },
  getById: {
    method: 'GET',
    path: '/franchises/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: franchiseSchema,
      404: errorResponseSchema,
    },
    summary: 'Get franchise by ID',
  },
  create: {
    method: 'POST',
    path: '/franchises',
    body: createFranchiseSchema,
    responses: {
      201: franchiseSchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new franchise',
  },
  update: {
    method: 'PUT',
    path: '/franchises/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateFranchiseSchema,
    responses: {
      200: franchiseSchema,
      404: errorResponseSchema,
    },
    summary: 'Update a franchise',
  },
  delete: {
    method: 'DELETE',
    path: '/franchises/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete a franchise',
  },
  // Stock sub-routes
  getStock: {
    method: 'GET',
    path: '/franchises/:id/stock',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: z.array(stockWithIngredientSchema),
      404: errorResponseSchema,
    },
    summary: 'Get stock of a franchise',
  },
  upsertStock: {
    method: 'POST',
    path: '/franchises/:id/stock',
    pathParams: z.object({ id: z.string().uuid() }),
    body: upsertStockSchema,
    responses: {
      201: stockSchema,
      404: errorResponseSchema,
    },
    summary: 'Add or update stock',
  },
  updateStockQuantity: {
    method: 'PUT',
    path: '/franchises/:id/stock/:ingredientId',
    pathParams: z.object({
      id: z.string().uuid(),
      ingredientId: z.string().uuid(),
    }),
    body: updateStockQuantitySchema,
    responses: {
      200: stockSchema,
      404: errorResponseSchema,
    },
    summary: 'Update stock quantity',
  },
  deleteStock: {
    method: 'DELETE',
    path: '/franchises/:id/stock/:ingredientId',
    pathParams: z.object({
      id: z.string().uuid(),
      ingredientId: z.string().uuid(),
    }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete stock entry',
  },
});

// ===== Categories Contract =====
const categoriesContract = c.router({
  getAll: {
    method: 'GET',
    path: '/categories',
    query: categoryQuerySchema,
    responses: {
      200: paginatedResponseSchema(categorySchema),
    },
    summary: 'Get all categories',
  },
  getById: {
    method: 'GET',
    path: '/categories/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: categorySchema,
      404: errorResponseSchema,
    },
    summary: 'Get category by ID',
  },
  create: {
    method: 'POST',
    path: '/categories',
    body: createCategorySchema,
    responses: {
      201: categorySchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new category',
  },
  update: {
    method: 'PUT',
    path: '/categories/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateCategorySchema,
    responses: {
      200: categorySchema,
      404: errorResponseSchema,
    },
    summary: 'Update a category',
  },
  delete: {
    method: 'DELETE',
    path: '/categories/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete a category',
  },
});

// ===== Ingredients Contract =====
const ingredientsContract = c.router({
  getAll: {
    method: 'GET',
    path: '/ingredients',
    query: ingredientQuerySchema,
    responses: {
      200: paginatedResponseSchema(ingredientWithCategoriesSchema),
    },
    summary: 'Get all ingredients',
  },
  getById: {
    method: 'GET',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: ingredientWithCategoriesSchema,
      404: errorResponseSchema,
    },
    summary: 'Get ingredient by ID',
  },
  create: {
    method: 'POST',
    path: '/ingredients',
    body: createIngredientSchema,
    responses: {
      201: ingredientWithCategoriesSchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new ingredient',
  },
  update: {
    method: 'PUT',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateIngredientSchema,
    responses: {
      200: ingredientSchema,
      404: errorResponseSchema,
    },
    summary: 'Update an ingredient',
  },
  delete: {
    method: 'DELETE',
    path: '/ingredients/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete an ingredient',
  },
  // Categories sub-routes
  getCategories: {
    method: 'GET',
    path: '/ingredients/:id/categories',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: z.array(categorySchema),
      404: errorResponseSchema,
    },
    summary: 'Get categories of an ingredient',
  },
  addCategories: {
    method: 'POST',
    path: '/ingredients/:id/categories',
    pathParams: z.object({ id: z.string().uuid() }),
    body: addCategoriesToIngredientSchema,
    responses: {
      201: ingredientWithCategoriesSchema,
      404: errorResponseSchema,
    },
    summary: 'Add categories to an ingredient',
  },
});

// ===== Suppliers Contract =====
const suppliersContract = c.router({
  getAll: {
    method: 'GET',
    path: '/suppliers',
    query: supplierQuerySchema,
    responses: {
      200: paginatedResponseSchema(supplierSchema),
    },
    summary: 'Get all suppliers',
  },
  getById: {
    method: 'GET',
    path: '/suppliers/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: supplierSchema,
      404: errorResponseSchema,
    },
    summary: 'Get supplier by ID',
  },
  create: {
    method: 'POST',
    path: '/suppliers',
    body: createSupplierSchema,
    responses: {
      201: supplierSchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new supplier',
  },
  update: {
    method: 'PUT',
    path: '/suppliers/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateSupplierSchema,
    responses: {
      200: supplierSchema,
      404: errorResponseSchema,
    },
    summary: 'Update a supplier',
  },
  delete: {
    method: 'DELETE',
    path: '/suppliers/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete a supplier',
  },
});

// ===== Commands Contract =====
const commandsContract = c.router({
  getAll: {
    method: 'GET',
    path: '/commands',
    query: commandQuerySchema,
    responses: {
      200: paginatedResponseSchema(commandSchema),
    },
    summary: 'Get all commands',
  },
  getById: {
    method: 'GET',
    path: '/commands/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: commandWithItemsSchema,
      404: errorResponseSchema,
    },
    summary: 'Get command by ID',
  },
  create: {
    method: 'POST',
    path: '/commands',
    body: createCommandSchema,
    responses: {
      201: commandWithItemsSchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new command',
  },
  update: {
    method: 'PUT',
    path: '/commands/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateCommandSchema,
    responses: {
      200: commandSchema,
      404: errorResponseSchema,
    },
    summary: 'Update a command',
  },
  delete: {
    method: 'DELETE',
    path: '/commands/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete a command',
  },
  // Ingredients sub-routes
  getIngredients: {
    method: 'GET',
    path: '/commands/:id/ingredients',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: z.array(
        z.object({
          id: z.string().uuid(),
          command_id: z.string().uuid(),
          ingredient_id: z.string().uuid(),
          quantity: z.number().int(),
          ingredient: z.object({
            id: z.string().uuid(),
            name: z.string(),
          }),
        })
      ),
      404: errorResponseSchema,
    },
    summary: 'Get ingredients of a command',
  },
  addIngredient: {
    method: 'POST',
    path: '/commands/:id/ingredients',
    pathParams: z.object({ id: z.string().uuid() }),
    body: addIngredientToCommandSchema,
    responses: {
      201: z.object({
        id: z.string().uuid(),
        command_id: z.string().uuid(),
        ingredient_id: z.string().uuid(),
        quantity: z.number().int(),
      }),
      404: errorResponseSchema,
    },
    summary: 'Add an ingredient to a command',
  },
  updateIngredient: {
    method: 'PUT',
    path: '/commands/:id/ingredients/:ingredientId',
    pathParams: z.object({
      id: z.string().uuid(),
      ingredientId: z.string().uuid(),
    }),
    body: updateCommandIngredientSchema,
    responses: {
      200: z.object({
        id: z.string().uuid(),
        command_id: z.string().uuid(),
        ingredient_id: z.string().uuid(),
        quantity: z.number().int(),
      }),
      404: errorResponseSchema,
    },
    summary: 'Update ingredient quantity in a command',
  },
  removeIngredient: {
    method: 'DELETE',
    path: '/commands/:id/ingredients/:ingredientId',
    pathParams: z.object({
      id: z.string().uuid(),
      ingredientId: z.string().uuid(),
    }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Remove an ingredient from a command',
  },
});

// ===== Stocks Contract =====
const stocksContract = c.router({
  getAll: {
    method: 'GET',
    path: '/stocks',
    query: stockFranchiseQuerySchema,
    responses: {
      200: paginatedResponseSchema(stockWithIngredientSchema),
    },
    summary: 'Get all stocks',
  },
  getById: {
    method: 'GET',
    path: '/stocks/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: stockWithIngredientSchema,
      404: errorResponseSchema,
    },
    summary: 'Get stock by ID',
  },
  create: {
    method: 'POST',
    path: '/stocks',
    body: createStockFranchiseSchema,
    responses: {
      201: stockSchema,
      400: errorResponseSchema,
    },
    summary: 'Create a new stock entry',
  },
  update: {
    method: 'PUT',
    path: '/stocks/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateStockFranchiseSchema,
    responses: {
      200: stockSchema,
      404: errorResponseSchema,
    },
    summary: 'Update stock quantity',
  },
  delete: {
    method: 'DELETE',
    path: '/stocks/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: errorResponseSchema,
    },
    summary: 'Delete stock entry',
  },
});

// ===== Combined Franchise Contract =====
export const franchiseContract = c.router({
  franchises: franchisesContract,
  categories: categoriesContract,
  ingredients: ingredientsContract,
  suppliers: suppliersContract,
  commands: commandsContract,
  stocks: stocksContract,
});

export type FranchiseContract = typeof franchiseContract;
