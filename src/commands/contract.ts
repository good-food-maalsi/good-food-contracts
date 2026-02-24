import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { errorResponseSchema, messageResponseSchema } from '../common/schemas.js';
import {
  orderWithItemsSchema,
  createOrderSchema,
  updateOrderItemsSchema,
  updateOrderStatusSchema,
} from './schemas.js';

const c = initContract();

// ===== Orders Contract =====
const ordersContract = c.router({
  getAll: {
    method: 'GET',
    path: '/orders',
    responses: {
      200: z.object({ data: z.array(orderWithItemsSchema) }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Get all user orders (filtered by JWT userId)',
  },
  getById: {
    method: 'GET',
    path: '/orders/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    responses: {
      200: z.object({ data: orderWithItemsSchema }),
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Get order by ID',
  },
  create: {
    method: 'POST',
    path: '/orders',
    body: createOrderSchema,
    responses: {
      201: z.object({ message: z.string(), data: orderWithItemsSchema }),
      400: errorResponseSchema,
      401: z.object({ message: z.string() }),
    },
    summary: 'Create a new order (draft status)',
  },
  updateItems: {
    method: 'PATCH',
    path: '/orders/:id/items',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateOrderItemsSchema,
    responses: {
      200: z.object({ message: z.string(), data: orderWithItemsSchema }),
      400: errorResponseSchema,
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Update order items (draft orders only)',
  },
  updateStatus: {
    method: 'PATCH',
    path: '/orders/:id/status',
    pathParams: z.object({ id: z.string().uuid() }),
    body: updateOrderStatusSchema,
    responses: {
      200: z.object({ message: z.string(), data: orderWithItemsSchema }),
      400: errorResponseSchema,
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Update order status',
  },
  delete: {
    method: 'DELETE',
    path: '/orders/:id',
    pathParams: z.object({ id: z.string().uuid() }),
    body: z.object({}).optional(),
    responses: {
      200: messageResponseSchema,
      404: z.object({ message: z.string() }),
      401: z.object({ message: z.string() }),
    },
    summary: 'Delete an order (draft only)',
  },
});

// ===== Combined Commands Contract =====
export const commandsContract = c.router({
  orders: ordersContract,
});

export type CommandsContract = typeof commandsContract;
