'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_CREDENTIALS } from '@/lib/constants';
import { Sword } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = async (data: LoginFormValues) => {
    await onSubmit(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sword className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Odyssey HUD 2026</CardTitle>
          <CardDescription>Enter your credentials to access your journey</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              <p className="mb-1 font-semibold">Demo Credentials:</p>
              <p>Email: {MOCK_CREDENTIALS.EMAIL}</p>
              <p>Password: {MOCK_CREDENTIALS.PASSWORD}</p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
