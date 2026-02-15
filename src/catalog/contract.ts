import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { errorResponseSchema, messageResponseSchema } from '../common/schemas.js';
import {
  dishSchema,
  createDishSchema,
  updateDishSchema,
  dishIngredientSchema,
  createDishIngredientSchema,
  updateDishIngredientSchema,
  menuSchema,
  createMenuSchema,
  updateMenuSchema,
  catalogCategorySchema,
  createCatalogCategorySchema,
  updateCatalogCategorySchema,
  discountSchema,
  createDiscountSchema,
  updateDiscountSchema,
} from './schemas.js';

const c = initContract();

// ===== Dishes Contract =====
const dishesContract = c.router({
  getAll: {
    method: 'GET',
    path: '/dish',
    query: z.object({
      menuId: z.string().optional(),
    }),
    responses: {
      200: z.object({ data: z.array(dishSchema) }),
    },
    summary: 'Get all dishes',
  },
  getById: {
    method: 'GET',
    path: '/dish/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.object({ data: dishSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get dish by ID',
  },
  create: {
    method: 'POST',
    path: '/dish',
    body: createDishSchema,
    responses: {
      201: z.object({ message: z.string(), data: dishSchema }),
      400: z.object({ message: z.string() }),
    },
    summary: 'Create a new dish',
  },
  update: {
    method: 'PUT',
    path: '/dish/:id',
    pathParams: z.object({ id: z.string() }),
    body: updateDishSchema,
    responses: {
      200: z.object({ message: z.string(), data: dishSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update a dish',
  },
  delete: {
    method: 'DELETE',
    path: '/dish/:id',
    pathParams: z.object({ id: z.string() }),
    body: z.object({}).optional(),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a dish',
  },
});

// ===== Dish Ingredients Contract =====
const dishIngredientsContract = c.router({
  getAll: {
    method: 'GET',
    path: '/dish/:id/ingredients',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.object({ data: z.array(dishIngredientSchema) }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get all ingredients for a dish',
  },
  add: {
    method: 'POST',
    path: '/dish/:id/ingredients',
    pathParams: z.object({ id: z.string() }),
    body: createDishIngredientSchema,
    responses: {
      201: z.object({ message: z.string(), data: dishIngredientSchema }),
      400: z.object({ error: z.unknown() }),
      404: z.object({ message: z.string() }),
      409: z.object({ message: z.string() }),
    },
    summary: 'Add an ingredient to a dish',
  },
  update: {
    method: 'PUT',
    path: '/dish/:id/ingredients/:ingredientId',
    pathParams: z.object({ id: z.string(), ingredientId: z.string() }),
    body: updateDishIngredientSchema,
    responses: {
      200: z.object({ message: z.string(), data: dishIngredientSchema }),
      400: z.object({ error: z.unknown() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update an ingredient quantity in a dish',
  },
  remove: {
    method: 'DELETE',
    path: '/dish/:id/ingredients/:ingredientId',
    pathParams: z.object({ id: z.string(), ingredientId: z.string() }),
    body: z.object({}).optional(),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Remove an ingredient from a dish',
  },
});

// ===== Menus Contract =====
const menusContract = c.router({
  getAll: {
    method: 'GET',
    path: '/menu',
    responses: {
      200: z.object({ data: z.array(menuSchema) }),
    },
    summary: 'Get all menus',
  },
  getById: {
    method: 'GET',
    path: '/menu/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.object({ data: menuSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get menu by ID',
  },
  create: {
    method: 'POST',
    path: '/menu',
    body: createMenuSchema,
    responses: {
      201: z.object({ message: z.string(), data: menuSchema }),
      400: errorResponseSchema,
    },
    summary: 'Create a new menu',
  },
  update: {
    method: 'PUT',
    path: '/menu/:id',
    pathParams: z.object({ id: z.string() }),
    body: updateMenuSchema,
    responses: {
      200: z.object({ message: z.string(), data: menuSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update a menu',
  },
  delete: {
    method: 'DELETE',
    path: '/menu/:id',
    pathParams: z.object({ id: z.string() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a menu',
  },
});

// ===== Categories Contract =====
const catalogCategoriesContract = c.router({
  getAll: {
    method: 'GET',
    path: '/category',
    responses: {
      200: z.object({ data: z.array(catalogCategorySchema) }),
    },
    summary: 'Get all categories',
  },
  getById: {
    method: 'GET',
    path: '/category/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.object({ data: catalogCategorySchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get category by ID',
  },
  create: {
    method: 'POST',
    path: '/category',
    body: createCatalogCategorySchema,
    responses: {
      201: z.object({ message: z.string(), data: catalogCategorySchema }),
      400: errorResponseSchema,
    },
    summary: 'Create a new category',
  },
  update: {
    method: 'PUT',
    path: '/category/:id',
    pathParams: z.object({ id: z.string() }),
    body: updateCatalogCategorySchema,
    responses: {
      200: z.object({ message: z.string(), data: catalogCategorySchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update a category',
  },
  delete: {
    method: 'DELETE',
    path: '/category/:id',
    pathParams: z.object({ id: z.string() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a category',
  },
});

// ===== Discounts Contract =====
const discountsContract = c.router({
  getAll: {
    method: 'GET',
    path: '/discount',
    responses: {
      200: z.object({ data: z.array(discountSchema) }),
    },
    summary: 'Get all discounts',
  },
  getById: {
    method: 'GET',
    path: '/discount/:id',
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.object({ data: discountSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Get discount by ID',
  },
  create: {
    method: 'POST',
    path: '/discount',
    body: createDiscountSchema,
    responses: {
      201: z.object({ message: z.string(), data: discountSchema }),
      400: errorResponseSchema,
    },
    summary: 'Create a new discount',
  },
  update: {
    method: 'PUT',
    path: '/discount/:id',
    pathParams: z.object({ id: z.string() }),
    body: updateDiscountSchema,
    responses: {
      200: z.object({ message: z.string(), data: discountSchema }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Update a discount',
  },
  delete: {
    method: 'DELETE',
    path: '/discount/:id',
    pathParams: z.object({ id: z.string() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a discount',
  },
});

// ===== Combined Catalog Contract =====
export const catalogContract = c.router({
  dishes: dishesContract,
  dishIngredients: dishIngredientsContract,
  menus: menusContract,
  categories: catalogCategoriesContract,
  discounts: discountsContract,
});

export type CatalogContract = typeof catalogContract;
