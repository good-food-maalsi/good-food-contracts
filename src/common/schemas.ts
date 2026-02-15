import { z } from 'zod';

// Common pagination query schema
export const paginationQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
});

// Helper function to create paginated response schemas
export function paginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  });
}

// Common error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

// Common success message response
export const messageResponseSchema = z.object({
  message: z.string(),
});

// UUID param schema
export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// Common types
export type PaginationQuery = z.input<typeof paginationQuerySchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type UuidParam = z.infer<typeof uuidParamSchema>;
