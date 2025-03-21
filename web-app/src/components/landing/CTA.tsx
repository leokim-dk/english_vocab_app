import React from 'react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section id="cta" className="py-24 bg-blue-600 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">지금 바로 시작하세요</h2>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          영어 학습의 효율성을 높이고 단어 암기를 쉽게 만들어보세요. 지금 앱을 다운로드하고 무료로 시작하세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            variant="outline" 
            onClick={() => window.open('https://apps.apple.com/app/id_here', '_blank')}
            className="w-64 h-16 bg-black text-white hover:bg-gray-900 border-2 border-black hover:border-gray-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium">다운로드</span>
              <span className="text-lg font-bold">App Store</span>
            </div>
          </Button>
          <Button 
            onClick={() => window.open('https://play.google.com/store/apps/details?id=id_here', '_blank')}
            className="w-64 h-16 bg-white text-gray-900 hover:bg-gray-900 hover:text-white border-2 border-gray-200 hover:border-gray-900 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium">다운로드</span>
              <span className="text-lg font-bold">Play Store</span>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
} 