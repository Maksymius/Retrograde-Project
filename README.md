# Retrograde Project

Hybrid Monorepo - єдиний центр правди для коду та документації.

## Структура проєкту

```
📂 Retrograde_Project
├── 📂 00_Management      # 🧠 PM (Roadmap, Sprints)
├── 📂 01_Design_System   # 🎨 Дизайн (Visual DNA)
├── 📂 02_Engineering     # ⚙️ Архітектура (Specs, Prompts)
├── 📂 backend           # 🐍 Python код
├── 📂 frontend          # ⚛️ Next.js код
└── README.md            # Головний вхід
```

## Налаштування Obsidian

Щоб Obsidian працював швидко, додай в **Settings → Files & Links → Excluded files**:

```
frontend/node_modules
frontend/.next
backend/venv
backend/__pycache__
.git
.idea
.vscode
.DS_Store
```

## Початок роботи

1. Відкрий папку в VS Code для розробки
2. Відкрий папку в Obsidian для документації
3. Налаштуй excluded files в Obsidian
4. Почни з `00_Management/Roadmap.md`

## Git

```bash
git init
git add .
git commit -m "Initial project structure"
```