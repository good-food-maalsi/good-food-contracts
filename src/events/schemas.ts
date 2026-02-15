import { z } from 'zod';

export const stockDeletedEventSchema = z.object({
  stock_id: z.string().uuid(),
  franchise_id: z.string().uuid(),
  timestamp: z.string().datetime(),
});

export type StockDeletedEvent = z.infer<typeof stockDeletedEventSchema>;
