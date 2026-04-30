/* ===========================================================
   Al-Nour Dashboard — interações e gráficos (Chart.js)
   =========================================================== */
(function () {
  'use strict';

  // ---------- Tema (paleta) ----------
  const palette = {
    primary:   '#8F7E4F',
    secondary: '#C3C49E',
    success:   '#D8FFDD',
    surface:   '#524632',
    muted:     '#a89a78',
    text:      '#efe9d6',
    border:    'rgba(195,196,158,.15)'
  };

  // ---------- Dados vindos do servidor (EJS) ----------
  let data = { sales: [], purchases: [], categories: [] };
  try {
    const raw = document.getElementById('dashboard-data');
    if (raw) data = JSON.parse(raw.textContent);
  } catch (e) { console.warn('Falha ao ler dados do dashboard', e); }

  // ---------- Defaults Chart.js ----------
  if (window.Chart) {
    Chart.defaults.color = palette.muted;
    Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.tooltip.backgroundColor = '#2b2417';
    Chart.defaults.plugins.tooltip.borderColor = palette.border;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.titleColor = palette.text;
    Chart.defaults.plugins.tooltip.bodyColor = palette.text;
  }

  const gridOpts = {
    grid:  { color: palette.border, drawBorder: false },
    ticks: { color: palette.muted }
  };

  // ---------- Vendas (linha/área) ----------
  const salesEl = document.getElementById('salesChart');
  if (salesEl && window.Chart && data.sales.length) {
    const ctx = salesEl.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 260);
    grad.addColorStop(0, 'rgba(143,126,79,.55)');
    grad.addColorStop(1, 'rgba(143,126,79,0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.sales.map(d => d.label),
        datasets: [{
          label: 'Vendas (R$)',
          data: data.sales.map(d => d.value),
          borderColor: palette.primary,
          backgroundColor: grad,
          borderWidth: 2.5,
          fill: true,
          tension: .35,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: palette.primary
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: gridOpts, y: gridOpts }
      }
    });
  }

  // ---------- Compras vs Vendas (barras) ----------
  const purchasesEl = document.getElementById('purchasesChart');
  if (purchasesEl && window.Chart && data.purchases.length) {
    new Chart(purchasesEl, {
      type: 'bar',
      data: {
        labels: data.purchases.map(d => d.label),
        datasets: [
          {
            label: 'Compras',
            data: data.purchases.map(d => d.compras),
            backgroundColor: '#8a6a3f',
            borderRadius: 6, borderSkipped: false
          },
          {
            label: 'Vendas',
            data: data.purchases.map(d => d.vendas),
            backgroundColor: palette.primary,
            borderRadius: 6, borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: gridOpts, y: gridOpts }
      }
    });
  }

  // ---------- Categorias de perfumes (pizza/doughnut) ----------
  const catEl = document.getElementById('categoryChart');
  if (catEl && window.Chart && data.categories.length) {
    new Chart(catEl, {
      type: 'doughnut',
      data: {
        labels: data.categories.map(d => d.name),
        datasets: [{
          data: data.categories.map(d => d.value),
          backgroundColor: ['#a98a55', '#C3C49E', '#D8FFDD', '#7a5a32'],
          borderColor: palette.surface,
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '62%',
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  // ---------- Sidebar mobile ----------
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('menu-toggle');
  if (sidebar && toggle) {
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    const close = () => { sidebar.classList.remove('open'); backdrop.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
    });
    backdrop.addEventListener('click', close);
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) close(); });
  }

  // ---------- Busca (filtra a tabela em tempo real) ----------
  const search = document.getElementById('search-input');
  if (search) {
    search.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('table tbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
})();
