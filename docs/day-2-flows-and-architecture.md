# Day 2 — User Flows and Architecture

## 1. User Flows

### Guest Flow
Home → Catalog → Search/Filter → Product Details

### User Purchase Flow
Home → Catalog → Product Details → Add to Cart → Cart → Checkout → Success

### Admin Flow
Login → Admin Dashboard → Products Table → Create/Edit Product → Save Changes

---

## 1A. Flow Details

### Guest Flow Details
1. User lands on homepage
2. User clicks browse catalog
3. User searches or filters products
4. User opens a product detail page

### User Purchase Flow Details
1. User opens a product page
2. User adds item to cart
3. User reviews cart
4. User proceeds to checkout
5. User completes mock order
6. User sees success page

### Admin Flow Details
1. Admin opens login page
2. Admin enters dashboard
3. Admin reviews product list
4. Admin creates or edits a product

---

## 2. Route Map

### Public Routes
- /
- /catalog
- /product/:id
- /cart
- /checkout
- /success

### Admin Routes
- /admin
- /admin/products
- /admin/products/new
- /admin/products/:id/edit

---

## 3. Domain Boundaries

### Shell
Owns:
- app layout
- navbar
- footer
- top-level routing
- route composition
- shared page wrappers
- global providers (theme, state, query client)

### Catalog
Owns:
- product listing
- search
- filters
- sorting
- catalog grid

### Product
Owns:
- product details
- product gallery
- pricing and feature section
- related products
- add-to-cart entry point

### Cart
Owns:
- cart page
- quantity updates
- remove item actions
- pricing summary
- checkout flow
- success page
- cart persistence (localStorage)

### Admin
Owns:
- admin login gate
- dashboard
- product table
- add/edit product form
- product management actions

---

## 4. Shared Packages

### ui
- buttons
- cards
- inputs
- badges
- layout primitives
- table
- modal/drawer

### types
- Product
- CartItem
- SessionUser

### state
- cart store contract
- session store contract
- theme state

### config
- route constants
- nav items
- app constants
- mock settings

---

## 5. Architecture Decision Notes

- Start with a modular monorepo structure first
- Keep feature ownership clear by domain
- Share only primitives and contracts, not full feature components
- Keep v1 simple before deeper micro-frontend federation
- Separate server state and UI state early (React Query vs Zustand)

---

## 6. Simple Architecture Diagram

```txt
Shell
 ├── Catalog
 ├── Product
 ├── Cart
 └── Admin

Shared Packages
 ├── UI
 ├── Types
 ├── State
 └── Config