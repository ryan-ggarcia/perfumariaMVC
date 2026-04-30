/* Model — fonte de dados (mock). Substitua pelas queries reais. */
exports.getDashboardData = async () => ({
  user: { name: 'Yasmin', initials: 'YR' },

  stats: [
    { title: 'Vendas Totais',        value: 'R$ 184.320', delta: '+12.4% este mês', positive: true,  icon: 'shopping-bag' },
    { title: 'Compras Realizadas',   value: 'R$ 92.180',  delta: '+5.2% este mês',  positive: true,  icon: 'shopping-cart' },
    { title: 'Usuários Cadastrados', value: '2.847',      delta: '+184 novos',      positive: true,  icon: 'users' },
    { title: 'Produtos Disponíveis', value: '412',        delta: '8 estoque baixo', positive: false, icon: 'package' }
  ],

  charts: {
    sales: [
      { label: 'Jan', value: 12400 }, { label: 'Fev', value: 15800 },
      { label: 'Mar', value: 14200 }, { label: 'Abr', value: 19500 },
      { label: 'Mai', value: 22100 }, { label: 'Jun', value: 26800 },
      { label: 'Jul', value: 24300 }, { label: 'Ago', value: 29900 }
    ],
    purchases: [
      { label: 'Jan', compras: 8200,  vendas: 12400 },
      { label: 'Fev', compras: 9100,  vendas: 15800 },
      { label: 'Mar', compras: 7800,  vendas: 14200 },
      { label: 'Abr', compras: 10500, vendas: 19500 },
      { label: 'Mai', compras: 11200, vendas: 22100 },
      { label: 'Jun', compras: 12800, vendas: 26800 }
    ],
    categories: [
      { name: 'Amadeirados', value: 38 },
      { name: 'Orientais',   value: 28 },
      { name: 'Doces',       value: 20 },
      { name: 'Especiados',  value: 14 }
    ]
  },

  products: [
    { name: 'Oud Royal Mukhallat', category: 'Amadeirado', price:  890.00, stock: 24, status: 'Disponível'    },
    { name: 'Amber Noir 100ml',    category: 'Oriental',   price:  640.00, stock: 12, status: 'Disponível'    },
    { name: 'Rose Damascena',      category: 'Doce',       price:  520.00, stock:  4, status: 'Estoque baixo' },
    { name: 'Saffron Imperial',    category: 'Especiado',  price: 1240.00, stock:  8, status: 'Disponível'    },
    { name: 'Musk Al-Haramain',    category: 'Oriental',   price:  380.00, stock:  0, status: 'Esgotado'      }
  ]
});
