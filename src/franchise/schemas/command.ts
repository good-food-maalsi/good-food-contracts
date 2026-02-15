import { z } from 'zod';

// Command status enum (matches Prisma enum)
export const CommandStatus = {
  draft: 'draft',
  confirmed: 'confirmed',
  in_progress: 'in_progress',
  delivered: 'delivered',
  canceled: 'canceled',
} as const;

export type CommandStatusType = (typeof CommandStatus)[keyof typeof CommandStatus];

export const commandStatusSchema = z.enum([
  CommandStatus.draft,
  CommandStatus.confirmed,
  CommandStatus.in_progress,
  CommandStatus.delivered,
  CommandStatus.canceled,
]);

// Schema for a command item
export const commandItemSchema = z.object({
  ingredient_id: z.string().uuid('Invalid ingredient ID format'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Schema for creating a command
export const createCommandSchema = z.object({
  franchise_id: z.string().uuid('Invalid franchise ID format').optional(),
  status: commandStatusSchema.optional().default(CommandStatus.draft),
  user_id: z.string().uuid('Invalid user ID format'),
  items: z.array(commandItemSchema).optional().default([]),
});

// Schema for updating a command (all fields optional)
export const updateCommandSchema = z.object({
  status: commandStatusSchema.optional(),
  user_id: z.string().uuid('Invalid user ID format').optional(),
});

// Schema for query parameters (pagination, filters)
export const commandQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  franchise_id: z.string().uuid().optional(),
  status: commandStatusSchema.optional(),
  user_id: z.string().uuid().optional(),
});

// Schema for command ID (URL params validation)
export const commandIdSchema = z.object({
  id: z.string().uuid('Invalid command ID format'),
});

// Schema for adding an ingredient to a command
export const addIngredientToCommandSchema = z.object({
  ingredient_id: z.string().uuid('Invalid ingredient ID format'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Schema for updating ingredient quantity
export const updateCommandIngredientSchema = z.object({
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Command response schema (what the API returns)
export const commandSchema = z.object({
  id: z.string().uuid(),
  franchise_id: z.string().uuid(),
  status: commandStatusSchema,
  user_id: z.string().uuid(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
});

// Command with items response
export const commandWithItemsSchema = commandSchema.extend({
  items: z.array(
    z.object({
      id: z.string().uuid(),
      command_id: z.string().uuid(),
      ingredient_id: z.string().uuid(),
      quantity: z.number().int(),
      ingredient: z
        .object({
          id: z.string().uuid(),
          name: z.string(),
        })
        .optional(),
    })
  ),
});

// Inferred TypeScript types
export type CommandItem = z.infer<typeof commandItemSchema>;
export type CreateCommandInput = z.input<typeof createCommandSchema>;
export type UpdateCommandInput = z.infer<typeof updateCommandSchema>;
export type CommandQueryParams = z.input<typeof commandQuerySchema>;
export type CommandIdParams = z.infer<typeof commandIdSchema>;
export type AddIngredientToCommandInput = z.infer<typeof addIngredientToCommandSchema>;
export type UpdateCommandIngredientInput = z.infer<typeof updateCommandIngredientSchema>;
export type Command = z.infer<typeof commandSchema>;
export type CommandWithItems = z.infer<typeof commandWithItemsSchema>;
