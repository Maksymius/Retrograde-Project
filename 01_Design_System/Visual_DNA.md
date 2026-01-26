# Visual DNA - Retrograde Terminal

## 🎨 Концепція
**"Retro-Futuristic Terminal"** - поєднання ностальгії 80-х з сучасними UI трендами.

## 🌈 Кольорова палітра

### Primary Colors
- **Terminal Green:** `#00FF41` - основний акцент, текст команд
- **Matrix Green:** `#008F11` - вторинний зелений
- **Deep Black:** `#0D1117` - фон терміналу
- **Cyber Blue:** `#00D4FF` - акценти, посилання

### Secondary Colors  
- **Neon Purple:** `#B026FF` - важливі елементи
- **Warning Orange:** `#FF6B35` - попередження, помилки
- **Success Green:** `#39FF14` - успішні операції
- **Ghost White:** `#F0F6FC` - основний текст

### Neutral Colors
- **Dark Gray:** `#21262D` - картки, панелі
- **Medium Gray:** `#30363D` - бордери
- **Light Gray:** `#8B949E` - вторинний текст

## 🔤 Типографія

### Fonts
- **Monospace (Код/Термінал):** `'JetBrains Mono', 'Fira Code', monospace`
- **Headers:** `'Inter', 'SF Pro Display', sans-serif`
- **Body:** `'Inter', system-ui, sans-serif`

### Font Sizes (Tailwind)
- **Terminal Text:** `text-sm` (14px)
- **Headers:** `text-2xl` до `text-4xl`
- **Body:** `text-base` (16px)
- **Small:** `text-xs` (12px)

## ✨ Анімації та Ефекти

### Terminal Effects
- **Typing Animation:** Імітація друку в терміналі
- **Cursor Blink:** Мигаючий курсор `|`
- **Glitch Effect:** Короткі "збої" при завантаженні
- **Scan Lines:** Тонкі горизонтальні лінії поверх контенту

### Transitions
- **Fade In:** `transition-opacity duration-300`
- **Slide Up:** `transform translate-y-4 opacity-0 → translate-y-0 opacity-100`
- **Glow Effect:** `box-shadow` з neon кольорами

## 🎯 UI Компоненти

### Terminal Input
```css
background: rgba(13, 17, 23, 0.8)
border: 1px solid #00FF41
font-family: 'JetBrains Mono'
color: #00FF41
placeholder: "root@retrograde:~$ "
```

### Buttons
- **Primary:** Зелений з glow ефектом
- **Secondary:** Прозорий з зеленим бордером
- **Danger:** Помаранчевий з червоним відтінком

### Cards/Panels
- **Background:** `#21262D` з легкою прозорістю
- **Border:** `#30363D` або neon glow
- **Shadow:** Темна з легким зеленим відблиском

## 📱 Responsive Design
- **Mobile First:** Починаємо з мобільної версії
- **Breakpoints:** Tailwind стандартні (sm, md, lg, xl)
- **Terminal адаптація:** На мобільних менший шрифт, спрощені ефекти