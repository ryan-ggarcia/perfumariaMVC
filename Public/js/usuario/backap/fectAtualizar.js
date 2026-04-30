document.addEventListener("DOMContentLoaded", function () {
    const updateButtons = document.querySelectorAll('.btn-update')
    const modal = document.querySelector('.modal')
    const btnClose = document.querySelector('.btn-close')
    const btnSalvar = document.querySelector('.btn-salvar')

    function openModalWithData(button) {
        const id = button.dataset.updateId
        if (!id) {
            console.error('Nenhum id encontrado no botão de update')
            return
        }

        // Buscar os dados do usuário no servidor usando a rota /usuario/obter/:id
        fetch(`/usuario/obter/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao obter dados do servidor')
                return res.json()
            })
            .then(data => {
                if (!data.ok || !data.usuario) {
                    Swal.fire({ title: 'Erro', text: 'Usuário não encontrado', icon: 'error' })
                    return
                }
                const usuario = data.usuario
                document.getElementById('usu_id_hidden').value = usuario.usu_id || ''
                document.getElementById('nome').value = usuario.usu_nome || ''
                document.getElementById('email').value = usuario.usu_email || ''
                document.getElementById('perfil').value = usuario.usu_perfil || '0'

                modal.style.display = 'flex'
            })
            .catch(err => {
                console.error(err)
                Swal.fire({ title: 'Erro', text: 'Não foi possível carregar os dados do usuário.', icon: 'error' })
            })
    }

    updateButtons.forEach(btn => btn.addEventListener('click', function () { openModalWithData(this) }))

    btnClose.addEventListener('click', () => { modal.style.display = 'none' })
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none' })

    btnSalvar.addEventListener('click', () => {
        const id = document.getElementById('usu_id_hidden').value
        const nome = document.getElementById('nome').value.trim()
        const email = document.getElementById('email').value.trim()
        const perfil = document.getElementById('perfil').value

        if (!nome || !email || perfil === '0') {
            Swal.fire({ title: 'Erro', text: 'Preencha todos os campos obrigatórios!', icon: 'error' })
            return
        }

        fetch('/usuario/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nome, email, perfil })
        }).then(res => res.json())
          .then(result => {
              if (result.ok) {
                  Swal.fire({ title: 'Atualização bem sucedida!', text: 'Todas as alterações foram feitas', icon: 'success' })
                    .then(() => {
                      modal.style.display = 'none'
                      window.location.reload()
                    })
              } else {
                  Swal.fire({ title: 'Erro no Atualizado.', text: 'Erro ao realizar o atualização!', icon: 'error' })
              }
          }).catch(err => {
              console.error(err)
              Swal.fire({ title: 'Erro', text: 'Problema na conexão', icon: 'error' })
          })
    })
})