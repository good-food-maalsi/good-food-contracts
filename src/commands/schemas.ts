import { z } from 'zod';

// Order status enum
export const OrderStatus = {
  draft: 'draft',
  confirmed: 'confirmed',
  preparation: 'preparation',
  ready: 'ready',
  canceled: 'canceled',
} as const;

export const orderStatusSchema = z.enum([
  OrderStatus.draft,
  OrderStatus.confirmed,
  OrderStatus.preparation,
  OrderStatus.ready,
  OrderStatus.canceled,
]);

// Selected option schema
export const selectedOptionSchema = z.object({
  name: z.string(),
  additionalPrice: z.number().min(0),
});

// Order item (for creating)
export const orderItemSchema = z.object({
  itemId: z.string().uuid(),
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0),
  selectedOptions: z.array(selectedOptionSchema).optional(),
});

// Add single order item (same as orderItemSchema but semantically different)
export const addOrderItemSchema = orderItemSchema;

// Selected option with ID (response)
export const selectedOptionWithIdSchema = selectedOptionSchema.extend({
  id: z.string().uuid(),
  orderItemId: z.string().uuid(),
});

// Order item with ID (response)
export const orderItemWithIdSchema = orderItemSchema.extend({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  selectedOptions: z.array(selectedOptionWithIdSchema).optional(),
});

// Create order (draft)
export const createOrderSchema = z.object({
  shopId: z.string().uuid(),
  items: z.array(orderItemSchema).min(1),
});

// Update order items
export const updateOrderItemsSchema = z.object({
  items: z.array(orderItemSchema).min(1),
});

// Update order status
export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});

// Order base schema
export const orderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  shopId: z.string().uuid(),
  status: orderStatusSchema,
  total: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Order with items (full response)
export const orderWithItemsSchema = orderSchema.extend({
  items: z.array(orderItemWithIdSchema),
});

// TypeScript types
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type SelectedOption = z.infer<typeof selectedOptionSchema>;
export type SelectedOptionWithId = z.infer<typeof selectedOptionWithIdSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderItemWithId = z.infer<typeof orderItemWithIdSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type AddOrderItemInput = z.infer<typeof addOrderItemSchema>;
export type UpdateOrderItemsInput = z.infer<typeof updateOrderItemsSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderWithItems = z.infer<typeof orderWithItemsSchema>;
