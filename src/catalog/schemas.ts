import { z } from 'zod';

// Dish schemas
export const dishSchema = z.object({
  id: z.string(),
  franchiseId: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  availability: z.boolean(),
  menuId: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  createdAt: z.string().datetime().or(z.date()).optional(),
  updatedAt: z.string().datetime().or(z.date()).optional(),
});

export const createDishSchema = z.object({
  franchiseId: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  availability: z.boolean().optional(),
  menuId: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const updateDishSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  basePrice: z.number().optional(),
  availability: z.boolean().optional(),
  menuId: z.string().optional(),
  imageUrl: z.string().optional(),
});

// Menu schemas
export const menuSchema = z.object({
  id: z.string(),
  franchiseId: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  availability: z.boolean().optional(),
  createdAt: z.string().datetime().or(z.date()).optional(),
  updatedAt: z.string().datetime().or(z.date()).optional(),
});

export const createMenuSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  availability: z.boolean().optional(),
});

export const updateMenuSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  availability: z.boolean().optional(),
});

// Category schemas
export const catalogCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.string().datetime().or(z.date()).optional(),
  updatedAt: z.string().datetime().or(z.date()).optional(),
});

export const createCatalogCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const updateCatalogCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

// Discount type enum
export const discountTypeSchema = z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'SPECIAL_OFFER']);

// Discount schemas
export const discountSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable().optional(),
  type: discountTypeSchema,
  value: z.number(),
  dateFrom: z.string().datetime().or(z.date()),
  dateTo: z.string().datetime().or(z.date()),
  createdAt: z.string().datetime().or(z.date()).optional(),
  updatedAt: z.string().datetime().or(z.date()).optional(),
});

export const createDiscountSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  type: discountTypeSchema,
  value: z.number(),
  dateFrom: z.string(),
  dateTo: z.string(),
});

export const updateDiscountSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  description: z.string().optional(),
  type: discountTypeSchema.optional(),
  value: z.number().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

// DishIngredient schemas
export const dishIngredientSchema = z.object({
  id: z.string().uuid(),
  dish_id: z.string().uuid(),
  stock_id: z.string().uuid(),
  quantity_required: z.number().int().min(1),
  created_at: z.string().datetime().or(z.date()).optional(),
  updated_at: z.string().datetime().or(z.date()).optional(),
});

export const createDishIngredientSchema = z.object({
  stock_id: z.string().uuid(),
  quantity_required: z.number().int().min(1),
});

export const updateDishIngredientSchema = z.object({
  quantity_required: z.number().int().min(1),
});

// Inferred TypeScript types
export type DishIngredient = z.infer<typeof dishIngredientSchema>;
export type CreateDishIngredientInput = z.infer<typeof createDishIngredientSchema>;
export type UpdateDishIngredientInput = z.infer<typeof updateDishIngredientSchema>;

export type Dish = z.infer<typeof dishSchema>;
export type CreateDishInput = z.infer<typeof createDishSchema>;
export type UpdateDishInput = z.infer<typeof updateDishSchema>;

export type Menu = z.infer<typeof menuSchema>;
export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;

export type CatalogCategory = z.infer<typeof catalogCategorySchema>;
export type CreateCatalogCategoryInput = z.infer<typeof createCatalogCategorySchema>;
export type UpdateCatalogCategoryInput = z.infer<typeof updateCatalogCategorySchema>;

export type DiscountType = z.infer<typeof discountTypeSchema>;
export type Discount = z.infer<typeof discountSchema>;
export type CreateDiscountInput = z.infer<typeof createDiscountSchema>;
export type UpdateDiscountInput = z.infer<typeof updateDiscountSchema>;
