# 🔥 Antigravity Quick Reference

## 🎨 UI Patterns

### Card Layout
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Loading State
```tsx
if (isLoading) return <Loader2 className="animate-spin" />;
```

## 🛠️ Code Snippets

### Form Validation (Zod)
```typescript
const schema = z.object({
  title: z.string().min(1),
  duration: z.number().min(5),
});
```

### Mock API Call
```typescript
const response = await questApi.createQuest(data); // Mission (Quest) creation
if (response.success) {
  toast({ title: "Success!" });
}
```

## ⚠️ Important Gotchas
- **Dark Theme**: Don't use `text-black`, use `text-foreground`.
- **Selects**: Always add `text-foreground` or text will be invisible.
- **Cookies**: Middleware uses cookies, not localStorage.
- **Data Flow**: Use transformers to map API data to client types.

---
