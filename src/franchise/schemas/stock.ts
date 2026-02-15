import { z } from 'zod';

// Schema for adding/updating stock
export const upsertStockSchema = z.object({
  ingredient_id: z.string().uuid('Invalid ingredient ID format'),
  quantity: z.number().int().min(0, 'Quantity must be zero or positive'),
});

// Schema for updating stock quantity
export const updateStockQuantitySchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be zero or positive'),
});

// Schema for IDs
export const stockIdsSchema = z.object({
  franchiseId: z.string().uuid('Invalid franchise ID format'),
  ingredientId: z.string().uuid('Invalid ingredient ID format'),
});

// Stock-franchise query schema
export const stockFranchiseQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  franchise_id: z.string().optional(),
});

// Create stock-franchise schema
export const createStockFranchiseSchema = z.object({
  franchise_id: z.string().optional(),
  ingredient_id: z.string(),
  quantity: z.number().int().min(0),
});

// Update stock-franchise schema
export const updateStockFranchiseSchema = z.object({
  quantity: z.number().int().min(0),
});

// Stock-franchise ID schema
export const stockFranchiseIdSchema = z.object({
  id: z.string(),
});

// Stock response schema (what the API returns)
export const stockSchema = z.object({
  id: z.string().uuid(),
  franchise_id: z.string().uuid(),
  ingredient_id: z.string().uuid(),
  quantity: z.number().int(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
});

// Stock with ingredient info
export const stockWithIngredientSchema = stockSchema.extend({
  ingredient: z.object({
    id: z.string().uuid(),
    name: z.string(),
    unit_price: z.number(),
    description: z.string().nullable().optional(),
    supplier: z.object({
      id: z.string().uuid(),
      name: z.string(),
    }).optional(),
  }),
});

// Inferred TypeScript types
export type UpsertStockInput = z.infer<typeof upsertStockSchema>;
export type UpdateStockQuantityInput = z.infer<typeof updateStockQuantitySchema>;
export type StockIdsParams = z.infer<typeof stockIdsSchema>;
export type StockFranchiseQueryParams = z.input<typeof stockFranchiseQuerySchema>;
export type CreateStockFranchiseInput = z.infer<typeof createStockFranchiseSchema>;
export type UpdateStockFranchiseInput = z.infer<typeof updateStockFranchiseSchema>;
export type Stock = z.infer<typeof stockSchema>;
export type StockWithIngredient = z.infer<typeof stockWithIngredientSchema>;
