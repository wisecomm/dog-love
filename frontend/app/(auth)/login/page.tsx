'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authService } from '@/lib/auth/auth-service';
import { sessionManager } from '@/lib/auth/session-manager';
import { loginSchema, type LoginFormValues } from './schema';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

export function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const savedId = typeof window !== 'undefined' ? sessionManager.getSavedId() : null;
    const [saveId, setSaveId] = useState(!!savedId);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userId: savedId ?? '',
            userPwd: '',
        },
    });

    async function onSubmit(values: LoginFormValues) {
        setError('');

        if (saveId) {
            sessionManager.setSavedId(values.userId);
        } else {
            sessionManager.clearSavedId();
        }

        const result = await authService.login(values);

        if (result.code === '200') {
            router.push('/');
        } else {
            setError(result.message);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>로그인</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>아이디</FormLabel>
                                    <FormControl>
                                        <Input placeholder="아이디를 입력하세요" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userPwd"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>비밀번호</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="saveId"
                                checked={saveId}
                                onCheckedChange={(checked) => setSaveId(checked === true)}
                            />
                            <label htmlFor="saveId" className="text-sm">
                                아이디 저장
                            </label>
                        </div>
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? '로그인 중...' : '로그인'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default LoginPage;
