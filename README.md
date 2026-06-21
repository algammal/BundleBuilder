# Frontend Bundle Builder

A responsive React-based multi-step bundle builder prototype for configuring a home security system.

This project was built as a frontend take-home assessment and recreates the provided Figma design with interactive product selection, variant management, live cart review, and persistent configuration storage.

---

## Features

### Multi-step bundle builder
- 4-step accordion flow:
  - Choose your cameras
  - Choose your plan
  - Choose your sensors
  - Add extra protection

### Product selection
- Variant/color selection
- Per-variant quantity management
- Quantity stepper
- Discount badges
- Product pricing with compare-at pricing

### Live review panel
- Displays selected products grouped by category
- Quantity steppers synchronized with product cards
- Live pricing updates
- Total calculation
- Savings display

### Variant-aware cart logic
Each product variant has its own quantity.

Example:
- White Camera → quantity 2
- Black Camera → quantity 1

Both variants appear independently in the review panel.

### Persistence
- “Save my system for later”
- Uses localStorage
- Restores configuration after refresh or return visit

### Responsive design
Optimized for:
- Desktop
- Tablet
- Mobile

Desktop follows Figma closely, while smaller screens adapt into stacked layouts.

---

# Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Context API + useReducer**
- **MSW (Mock Service Worker)**

---

# Why These Technologies?

## Tailwind CSS
Chosen for:
- Fast UI development
- Better control for pixel-perfect Figma implementation
- Predictable styling without CSS specificity issues
- Easier responsive design using utility classes

## Context + Reducer
Chosen instead of Redux/Zustand because:
- Project state is medium complexity
- State transitions are predictable
- No need for external state libraries

## MSW
Used to mock backend APIs locally.

Benefits:
- Simulates real API requests
- Keeps UI decoupled from backend
- Easy future migration to real backend

---

# Architecture

The app follows a layered architecture:

```bash
src/
│
├── components/        # Reusable UI primitives
├── features/          # Feature composition layer
├── pages/            # Page entry points
├── store/            # Global state management
├── api/              # API calls
├── hooks/            # Custom hooks
├── services/         # Persistence / external services
├── types/            # Shared TS types
├── constants/        # Constants / enums
└── mocks/            # MSW handlers
```

---

## Architectural Decisions

### UI Primitives
Reusable micro-components such as:
- Button
- Stepper
- Card
- Badge
- accordion
- ProductCard

These keep feature components small and maintainable.

---

### Layout Layer
Acts as a middle layer between pages and reusable components.

Examples:
- BuilderLayout
- ReviewPanel


This improves separation of concerns.

---

### State Model
State is normalized around product selections.

Example:

```ts
{
  selections: {
    "cam-v4": {
      productId: "cam-v4",
      selectedVariantId: "black",
      variantQuantities: {
        white: 2,
        black: 1
      }
    }
  }
}
```

This design simplifies:
- variant switching
- cart rendering
- total calculations

---

# Installation

Clone repository:

```bash
git clone <repo-url>
cd bundle-builder
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

# Available Scripts

Start app:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Mock API

MSW is used to mock API responses.

Example endpoint:

```txt
GET /api/bundle
```

Returns:
- bundle steps
- products
- pricing
- variants

---

# Assumptions / Tradeoffs

- Backend implementation is mocked via MSW
- Product data is served from local mock JSON
- Some visual details may slightly differ depending on browser rendering
- Focus was placed on architecture, scalability, and clean state management

---

# Author

Ahmed Algammal