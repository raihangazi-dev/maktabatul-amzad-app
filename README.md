# Maktabatul Amzad Bookstore

Next.js full-stack ecommerce bookstore scaffold using the App Router, Tailwind CSS, and lucide-react.

## Scripts

- 
pm run dev - start the development server
- 
pm run build - create a production build
- 
pm run start - run the production server
- 
pm run lint - run ESLint
- 
pm run type-check - run TypeScript checks

## Main Structure

- src/app - App Router pages, layouts, and API route handlers
- src/components - reusable UI, layout, ecommerce, and admin components
- src/features - feature-specific modules for books, cart, orders, auth, and admin
- src/server - server-only database, auth, repositories, services, validators, email, payment, and storage code
- src/actions - server action placeholders
- src/lib - shared utilities and API helpers
- src/types - shared TypeScript types
- public/images - static image folders for books, banners, authors, categories, icons, and logos

## Route Groups

- (store) - public storefront, cart, checkout, account, and content pages
- (auth) - login, registration, password reset, and email verification
- (admin) - admin dashboard and management routes
- pi - backend route handlers for ecommerce resources