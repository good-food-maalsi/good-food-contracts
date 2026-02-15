import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  loginSchema,
  registerSchema,
  publicUserSchema,
  verifyTokenQuerySchema,
} from './schemas.js';

const c = initContract();

export const authContract = c.router({
  login: {
    method: 'POST',
    path: '/auth/login',
    body: loginSchema,
    responses: {
      200: z.object({
        message: z.string(),
        user: z.object({
          id: z.string(),
          email: z.string().email(),
          username: z.string(),
          roles: z.array(z.string()),
        }),
      }),
      401: z.object({ error: z.string() }),
    },
    summary: 'Login with email and password',
  },

  register: {
    method: 'POST',
    path: '/auth/register',
    body: registerSchema,
    responses: {
      201: z.object({
        message: z.string(),
        user: publicUserSchema,
      }),
      409: z.object({ error: z.string() }),
    },
    summary: 'Register a new user',
  },

  logout: {
    method: 'GET',
    path: '/auth/logout',
    responses: {
      200: z.object({ message: z.string() }),
    },
    summary: 'Logout and clear cookies',
  },

  refresh: {
    method: 'POST',
    path: '/auth/refresh',
    body: z.object({}),
    responses: {
      200: z.object({ message: z.string() }),
      401: z.object({ error: z.string() }),
      403: z.object({ error: z.string() }),
    },
    summary: 'Refresh access token',
  },

  verify: {
    method: 'GET',
    path: '/auth/verify',
    query: verifyTokenQuerySchema,
    responses: {
      200: z.object({
        success: z.boolean(),
        email: z.string().email(),
      }),
      400: z.object({ error: z.string() }),
    },
    summary: 'Verify magic token',
  },

  unsubscribe: {
    method: 'DELETE',
    path: '/auth/unsubscribe',
    body: z.object({}),
    responses: {
      204: z.object({ message: z.string() }),
      401: z.object({ error: z.string() }),
    },
    summary: 'Unsubscribe (delete account)',
  },
});

export type AuthContract = typeof authContract;
