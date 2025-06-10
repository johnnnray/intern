'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button'; 
    
export default function LoginPage() {
    const router = useRouter();
    
    return (
    <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* 上部ロゴエリア */}
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
            <AcmeLogo />
            </div>
        </div>
    
        {/* ログインフォーム */}
        <Suspense>
            <LoginForm />
        </Suspense>
    
        {/* 管理者ログイン誘導ボタン */}
        <div className="mt-4 text-center">
              <p className="mb-2 text-sm text-gray-600">管理者ですか？</p>
              <Button type="button" onClick={() => router.push('/admin/login')}>
                管理者ログインページへ
              </Button>
            </div>
          </div>
        </main>
      );
    }