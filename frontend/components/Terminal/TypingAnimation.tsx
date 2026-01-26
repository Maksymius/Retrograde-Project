import { useState, useEffect, useRef } from 'react';

export const TypingAnimation = ({ 
  text, 
  speed = 50, 
  onComplete 
}: { 
  text: string; 
  speed?: number; 
  onComplete?: () => void 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  
  // Зберігаємо onComplete в ref, щоб він не тригерив перезапуск ефекту
  const onCompleteRef = useRef(onComplete);

  // Оновлюємо ref, якщо функція змінилась, але не перезапускаємо анімацію
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    index.current = 0;
    setDisplayedText('');

    const timer = setInterval(() => {
      // Якщо дійшли до кінця тексту
      if (index.current >= text.length) {
        clearInterval(timer);
        // Викликаємо функцію з ref
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }

      // Додаємо наступну літеру
      const nextChar = text.charAt(index.current);
      setDisplayedText((prev) => prev + nextChar);
      index.current++;
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]); // Прибрали onComplete з залежностей!

  return <span>{displayedText}</span>;
};