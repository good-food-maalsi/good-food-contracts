import { z } from 'zod';

// Schema for creating or linking a category
export const categoryInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(2).max(255).optional(),
    description: z.string().max(255).optional(),
  })
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "Either 'id' (to link existing) or 'name' (to create new) must be provided",
  });

// Schema for creating an ingredient
export const createIngredientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().max(255).optional(),
  supplier_id: z.string().uuid('Invalid supplier ID format'),
  unit_price: z.number().positive('Unit price must be positive'),
  categories: z.array(categoryInputSchema).default([]),
});

// Schema for updating an ingredient (all fields optional)
export const updateIngredientSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().max(255).optional().nullable(),
  supplier_id: z.string().uuid('Invalid supplier ID format').optional(),
  unit_price: z.number().positive('Unit price must be positive').optional(),
});

// Schema for query parameters (pagination, filters)
export const ingredientQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  supplier_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
});

// Schema for ingredient ID (URL params validation)
export const ingredientIdSchema = z.object({
  id: z.string().uuid('Invalid ingredient ID format'),
});

// Schema for adding/creating categories to an ingredient
export const addCategoriesToIngredientSchema = z.object({
  categories: z.array(categoryInputSchema).min(1, 'At least one category must be provided'),
});

// Ingredient response schema (what the API returns)
export const ingredientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  supplier_id: z.string().uuid(),
  unit_price: z.number(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
  supplier: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().optional(),
  }).optional(),

});

// Ingredient with categories
export const ingredientWithCategoriesSchema = ingredientSchema.extend({
  categories: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
});

// Inferred TypeScript types
export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CreateIngredientInput = z.input<typeof createIngredientSchema>;
export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>;
export type IngredientQueryParams = z.input<typeof ingredientQuerySchema>;
export type IngredientIdParams = z.infer<typeof ingredientIdSchema>;
export type AddCategoriesToIngredientInput = z.infer<typeof addCategoriesToIngredientSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type IngredientWithCategories = z.infer<typeof ingredientWithCategoriesSchema>;
