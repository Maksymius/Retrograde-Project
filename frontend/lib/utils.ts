import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Terminal typing effect utility
export function typeWriter(text: string, speed: number = 50): Promise<void> {
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

// Format date for terminal display
export function formatTerminalDate(date: Date): string {
  return date.toLocaleString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');
}