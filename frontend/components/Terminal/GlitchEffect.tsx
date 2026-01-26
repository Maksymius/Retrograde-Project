import { ReactNode } from 'react';

export const GlitchEffect = ({ children, trigger, intensity = 'medium' }: { children: ReactNode; trigger: boolean; intensity?: string }) => {
  if (!trigger) return <>{children}</>;

  return (
    <div className="relative animate-pulse">
      <div className="absolute top-0 left-0 w-full h-full opacity-50 translate-x-[2px] text-red-500 overflow-hidden" style={{ clipPath: 'inset(20% 0 80% 0)' }}>
        {children}
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-50 -translate-x-[2px] text-blue-500 overflow-hidden" style={{ clipPath: 'inset(60% 0 10% 0)' }}>
        {children}
      </div>
      {children}
    </div>
  );
};