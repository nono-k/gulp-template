# gulp template

## useing

```
npm install
npm run dev
```

## 🚀 Project Structure

```text
/
├── src/
│   ├── pages
│   │   ├── about
│   │   └── index.pug
│   ├── public
│   │   └── images
│   ├── pug
│   │   ├── base
│   │   ├── components
│   │   ├── data
│   │   └── mixin.pug
│   ├── scripts
│   │   ├── _modules
│   │   ├── _pages
│   │   ├── scripts.js
│   │   └── vendor.js
│   └── styles
│       ├── _mixin.scss
│       ├── base
│       ├── components
│       ├── project
│       ├── setting
│       ├── styles.scss
│       └── utility
├── gulpfile.js
└── package.json
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000~`      |
| `npm run build`           | Build your production site to `./dist/`          |