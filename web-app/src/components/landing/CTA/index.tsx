import React from 'react';
import { Button } from '@/components/ui/button';

interface CTAProps {
  openRegisterModal: () => void;
}

export function CTA({ openRegisterModal }: CTAProps) {
  return (
    <section className="py-24 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">지금 바로 시작하세요</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          영어 학습의 효율성을 높이고 단어 암기를 쉽게 만들어보세요. 지금 회원가입하고 무료로 시작하세요.
        </p>
        <div onClick={openRegisterModal}>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-7 text-lg">
            무료로 시작하기
          </Button>
        </div>
      </div>
    </section>
  );
} 