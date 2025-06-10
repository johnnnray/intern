import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function AdminLoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            {/* 上部ロゴエリア */}
            <div className="flex h-20 w-full items-end rounded-lg bg-purple-500 p-3 md:h-36">
              <div className="w-32 text-white md:w-36">
                <AcmeLogo />
              </div>
            </div>
    
            {/* ログインフォーム */}
            <Suspense>
              <LoginForm />
            </Suspense>
    
            
            </div>
        </main>
      );
    }
  


    
