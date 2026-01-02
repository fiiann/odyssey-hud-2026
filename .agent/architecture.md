# 🏗️ Architecture & Technical Guide

## 📡 Data Architecture
The app follows a strict layered architecture:
`UI Component` <-> `Custom Hook` <-> `Mock API Service` <-> `LocalStorage`

### Data Transformation
- **API Model** (`snake_case`): Data as stored in "database" (localStorage).
- **Client Model** (`camelCase`): Data as used in React components.
- **Transformers**: Located in `lib/transformers.ts`.

## ⚠️ CRITICAL: Hook Initialization Pattern
**Always initialize hooks from localStorage to prevent loading flickers during navigation.**

```typescript
// ❌ BAD - Causes "Not Found" flicker
const [data, setData] = useState<Data[]>([]);
const [isLoading, setIsLoading] = useState(true);

// ✅ GOOD - Instant data availability
const getInitialData = (): Data[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.YOUR_DATA);
    if (stored) {
      try {
        return JSON.parse(stored).map(transformData);
      } catch {
        return [];
      }
    }
  }
  return [];
};

export function useYourData() {
  const [data, setData] = useState<Data[]>(getInitialData);
  const [isLoading, setIsLoading] = useState(() => getInitialData().length === 0);
  // ...
}
```

**Why**: Each navigation creates new hook instances. Without cached initialization, state starts empty, causing "Not Found" states briefly.

## 🔐 Security & Auth
- Mock authentication using JWT-like tokens.
- Persistent login using `localStorage` for client state and `cookies` for server-side middleware protection.

## ⚖️ Ranking Logic
Defined in `lib/calculations.ts`. Execution Credits (XP) are derived from total minutes spent on missions (quests).
`Rank = floor(sqrt(Total Minutes / 60))`

## 🎨 UI & UX
- Radix UI for primitives.
- Tailwind CSS v4 for styling.
- Framer Motion for micro-animations.
- Lucide React for iconography.

---
