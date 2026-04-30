document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById('btnCad')
    if (btn) btn.addEventListener("click", validar)
})
const msgErro = document.querySelector(".msg-erro")

function validar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()
    let ok = true
    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let senha = document.getElementById('senha')
    let Csenha = document.getElementById('Csenha')
    let perfil = document.getElementById('perfil')

    // reset styles
    nome.style.borderColor = 'green'
    email.style.borderColor = 'green'
    senha.style.borderColor = 'green'
    Csenha.style.borderColor = 'green'
    perfil.style.borderColor = 'green'

    // check required fields
    if (!nome.value || !email.value || !senha.value || !Csenha.value || perfil.value === '0') {
        Swal.fire({
            title: 'Não foi possível realizar o cadastro.',
            text: 'Preencha todos os campos obrigatórios',
            icon: 'error'
        })
        if (!nome.value) nome.style.borderColor = 'red'
        if (!email.value) email.style.borderColor = 'red'
        if (!senha.value) senha.style.borderColor = 'red'
        if (!Csenha.value) Csenha.style.borderColor = 'red'
        if (perfil.value === '0') perfil.style.borderColor = 'red'
        ok = false
    }

    // check password match (always validate this)
    if (senha.value && Csenha.value && senha.value !== Csenha.value) {
        senha.style.borderColor = 'red'
        Csenha.style.borderColor = 'red'
        Swal.fire({
            title: 'Não foi possível realizar o cadastro.',
            text: 'As senhas não conferem, por favor verifique!',
            icon: 'error'
        })
        ok = false
    }

    if (!ok) return

    // enviar quando tudo OK
    fetch('/usuario/efetuarCadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            perfil: perfil.value
        })
    })
    .then(function (res) { return res.json() })
    .then(function (result) {
        if (result.ok) {
            Swal.fire({ title: 'Cadastro Realizada!', text: 'Cadastro realizado com sucesso.', icon: 'success' })
                .then(() => { window.location.href = '/usuario/listar' })
        } else {
            Swal.fire({ title: 'Erro no cadastro.', text: 'Erro ao realizar o cadastro!', icon: 'error' })
        }
    })
    .catch(function (err) {
        console.error(err);
        Swal.fire({ title: 'Erro...', text: 'Verifique se o email digitado não foi duplicado!', icon: 'error' })
    })
}