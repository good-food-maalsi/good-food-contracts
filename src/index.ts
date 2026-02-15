// Main exports
export * from './common/index.js';

// Re-export auth module
export * as auth from './auth/index.js';
export { authContract, type AuthContract } from './auth/contract.js';

// Re-export franchise module
export * as franchise from './franchise/index.js';
export { franchiseContract, type FranchiseContract } from './franchise/contract.js';

// Re-export catalog module
export * as catalog from './catalog/index.js';
export { catalogContract, type CatalogContract } from './catalog/contract.js';
