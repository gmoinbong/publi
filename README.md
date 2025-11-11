# PubliPack Frontend

Next.js 15 application built with Feature-Sliced Design architecture.

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5 (strict mode)
- **State**: Zustand 5.0.6
- **Data**: TanStack React Query 5.83.0
- **Validation**: Zod 4.0.5
- **UI**: Radix UI + Tailwind CSS 4
- **Styling**: Tailwind utility-first

## Project Structure

```
app/
├── features/          # Business logic modules
├── widgets/           # Composite UI components
├── shared/            # Reusable utilities
├── stores/            # Zustand global state
├── hooks/             # Custom React hooks
├── types/             # TypeScript domain types
├── api/               # Next.js API routes
└── [routes]/          # App pages
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Rules

- **Layer Import Hierarchy**: shared → features → widgets → app/[routes]
- **Server Components**: Default, use `'use client'` only when needed
- **Data Fetching**: React Query for all data operations
- **State Management**: Zustand for global state
- **Styling**: Tailwind utility classes only
- **Type Safety**: TypeScript strict mode + Zod validation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking


