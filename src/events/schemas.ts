import { z } from "zod";

export const stockDeletedEventSchema = z.object({
    stock_id: z.string().uuid(),
    franchise_id: z.string().uuid(),
    timestamp: z.string().datetime(),
});

export type StockDeletedEvent = z.infer<typeof stockDeletedEventSchema>;

export const orderItemSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    itemId: z.string().uuid(),
    quantity: z.number().int(),
    unitPrice: z.any(),
    discountId: z.string().uuid().nullable().optional(),
});

export const orderCreatedEventSchema = z.object({
    orderId: z.string().uuid(),
    shopId: z.string().uuid(),
    userId: z.string().uuid().nullable().optional(),
    items: z.array(orderItemSchema),
    total: z.any(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
export type OrderCreatedEvent = z.infer<typeof orderCreatedEventSchema>;
