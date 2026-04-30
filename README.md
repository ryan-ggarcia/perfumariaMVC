# Al-Nour — Dashboard Administrativo (MVC · EJS · Tailwind · Chart.js)

Painel da perfumaria árabe Al-Nour, com tema escuro luxuoso, gráficos
interativos e estrutura MVC pronta para conectar ao seu backend.

## 📁 Estrutura

```
al-nour-ejs/
├── server.js                       # Bootstrap Express
├── package.json
├── controllers/
│   └── dashboardController.js      # Controller (C do MVC)
├── models/
│   └── dashboardModel.js           # Model — dados mockados
├── routes/
│   └── dashboard.js                # Rotas
├── views/                          # View (V do MVC)
│   ├── dashboard.ejs
│   └── partials/
│       ├── sidebar.ejs
│       └── header.ejs
└── public/
    ├── css/dashboard.css           # CSS customizado
    └── js/dashboard.js             # JS + Chart.js
```

## 🚀 Como rodar

```bash
cd al-nour-ejs
npm install
npm start
# abra http://localhost:3000
```

## 🎨 Paleta

| Token       | Hex       | Uso                              |
|-------------|-----------|----------------------------------|
| `bg`        | `#3a3122` | Fundo geral                      |
| `surface`   | `#524632` | Cards e containers               |
| `primary`   | `#8F7E4F` | Destaques, botões, ícones        |
| `secondary` | `#C3C49E` | Item ativo do menu, áreas suaves |
| `success`   | `#D8FFDD` | Feedbacks positivos              |

## 🔌 Conectando ao backend real

Edite `models/dashboardModel.js` e substitua o objeto mock por queries
ao seu banco (MySQL, Postgres, MongoDB...). O contrato esperado pela
view é:

```js
{
  user:     { name, initials },
  stats:    [{ title, value, delta, positive, icon }],
  charts:   { sales:[...], purchases:[...], categories:[...] },
  products: [{ name, category, price, stock, status }]
}
```

## ✨ Recursos

- Tailwind via CDN com paleta customizada
- Chart.js (linha, barras, doughnut)
- Sidebar responsiva com menu mobile (toggle JS)
- Busca em tempo real filtrando a tabela
- Animações `fade-up`, hover elevado nos cards, skeleton CSS pronto
