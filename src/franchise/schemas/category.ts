import { z } from 'zod';

// Schema for creating a category
export const createCategorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().max(255).optional(),
});

// Schema for updating a category (all fields optional)
export const updateCategorySchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().max(255).optional().nullable(),
});

// Schema for query parameters (pagination, filters)
export const categoryQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  search: z.string().optional(),
});

// Schema for category ID (URL params validation)
export const categoryIdSchema = z.object({
  id: z.string().uuid('Invalid category ID format'),
});

// Category response schema (what the API returns)
export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
});

// Inferred TypeScript types
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryQueryParams = z.input<typeof categoryQuerySchema>;
export type CategoryIdParams = z.infer<typeof categoryIdSchema>;
export type Category = z.infer<typeof categorySchema>;
