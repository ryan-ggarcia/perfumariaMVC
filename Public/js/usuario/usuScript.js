const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('userForm');
const errorsBox = document.getElementById('modalErrors');
const tableBody = document.getElementById('userTableBody');
const userCount = document.getElementById('userCount');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastDesc = document.getElementById('toastDesc');

const profileLabels = {
  administrator: 'Administrador',
  user: 'Usuário',
  employee: 'Funcionário',
  supplier: 'Fornecedor',
};

function openModal() { modal.classList.remove('hidden'); }
function closeModal() {
  modal.classList.add('hidden');
  form.reset();
  errorsBox.classList.add('hidden');
  errorsBox.innerHTML = '';
}
function showToast(title, desc) {
  toastTitle.textContent = title;
  toastDesc.textContent = desc;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}
function fmtDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorsBox.classList.add('hidden');
  errorsBox.innerHTML = '';

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!json.ok) {
      errorsBox.classList.remove('hidden');
      errorsBox.innerHTML = json.errors.map(e => `<div>• ${e}</div>`).join('');
      return;
    }
    const u = json.user;
    const row = document.createElement('tr');
    row.className = 'border-b border-border/50 hover:bg-surface/40 transition';
    row.innerHTML = `
      <td class="px-6 py-4 font-medium">${u.email}</td>
      <td class="px-6 py-4"><span class="inline-flex px-2.5 py-1 rounded-full text-xs border profile-${u.profileType}">${profileLabels[u.profileType]}</span></td>
      <td class="px-6 py-4 text-muted-foreground">${fmtDate(u.dob)}</td>
      <td class="px-6 py-4 text-muted-foreground">${fmtDate(u.createdAt)}</td>
    `;
    tableBody.prepend(row);
    userCount.textContent = `${tableBody.children.length} registros`;
    showToast('Usuário cadastrado', `${u.email} foi adicionado como ${json.label}.`);
    closeModal();
  } catch (err) {
    errorsBox.classList.remove('hidden');
    errorsBox.innerHTML = '<div>• Erro de comunicação com o servidor</div>';
  }
});
