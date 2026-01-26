import React, { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
}

export const TerminalInput = ({ value, onChange, onSubmit, placeholder = "root@user:~$", className }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Автофокус при завантаженні
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={`relative flex items-center bg-retro-surface/50 border border-retro-border p-4 rounded ${className}`} onClick={() => inputRef.current?.focus()}>
      <span className="text-retro-accent font-mono mr-3 select-none text-sm md:text-base whitespace-nowrap">
        {placeholder}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="w-full bg-transparent border-none outline-none text-retro-text font-mono text-lg caret-retro-primary"
        autoComplete="off"
        spellCheck="false"
      />
      {/* Курсор, що блимає */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-retro-primary animate-blink pointer-events-none opacity-50" />
    </div>
  );
};