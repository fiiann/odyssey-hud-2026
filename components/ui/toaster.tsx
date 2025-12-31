'use client';

import { useToast } from './use-toast';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }: { toast: any; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const variant = toast.variant || 'default';

  return (
    <div
      className={cn(
        'relative flex w-full max-w-sm items-center gap-3 rounded-lg border p-4 shadow-lg transition-all',
        'animate-in slide-in-from-right-full',
        variant === 'destructive'
          ? 'border-destructive/50 bg-destructive text-destructive-foreground'
          : 'border-border bg-background text-foreground'
      )}
    >
      {variant === 'destructive' ? (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
      )}
      <div className="flex-1">
        {toast.title && <div className="font-semibold">{toast.title}</div>}
        {toast.description && (
          <div className="mt-1 text-sm opacity-90">{toast.description}</div>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
