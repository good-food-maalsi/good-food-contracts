import { z } from 'zod';

// User roles enum (matches Prisma enum)
export const UserRole = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
  FRANCHISE_OWNER: 'FRANCHISE_OWNER',
  DELIVERY_PERSON: 'DELIVERY_PERSON',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const userRoleSchema = z.enum([
  UserRole.ADMIN,
  UserRole.CUSTOMER,
  UserRole.STAFF,
  UserRole.FRANCHISE_OWNER,
  UserRole.DELIVERY_PERSON,
]);

// Login schema (converted from class-validator)
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Register schema (converted from class-validator)
export const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Create user schema (for admin)
export const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum([UserRole.STAFF, UserRole.FRANCHISE_OWNER]),
  franchiseId: z.string().min(1, 'Franchise ID is required'),
});

// User response schema (safe user data returned by API)
export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  userRoles: z.array(
    z.object({
      role: userRoleSchema,
    })
  ),
  franchiseId: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().or(z.date()),
  updated_at: z.string().datetime().or(z.date()),
});

// Public user info (minimal)
export const publicUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
});

// Verify token query
export const verifyTokenQuerySchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

// Inferred TypeScript types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type VerifyTokenQuery = z.infer<typeof verifyTokenQuerySchema>;
