document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById('btnCad')
    if (btn) btn.addEventListener("click", validar)
})
let msg = ""
const msgErro = document.querySelector(".msg-erro")

function validar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault()

    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let senha = document.getElementById('senha')
    let perfil = document.getElementById('perfil')
    if (nome.value == "" && email.value == "" && senha.value == "" && perfil.value == "0") {
        msg = "Erro... As informações inceridas estão incorretas!"
        nome.style.borderColor = "red"
        email.style.borderColor = "red"
        senha.style.borderColor = "red"
        perfil.style.borderColor = "red"

        alert(msg)
    }
    else {
        fetch("/usuario/efetuarCadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                perfil: perfil.value
            })
        })
        .then(function (res) {
            // Se o back-end retornar JSON, parse; caso contrário, apenas propagar o status
            const contentType = res.headers.get('content-type') || ''
            if (contentType.includes('application/json')) {
                return res.json().then(json => ({ ok: res.ok, body: json }))
            }
            return { ok: res.ok, body: null }
        }).then(function (result) {
            if (result.ok) {
                Swal.fire({
                    title: "Cadastro realizado!",
                    text: "Cadastro realizado com sucesso.",
                    icon: "success"
                }).then(() => { window.location.href = "/usuario/listar" })
            }
            else {
                console.error('Cadastro falhou:', result.body)
                Swal.fire({
                    title: "Erro...!",
                    text: "Erro ao cadastrar usuário.",
                    icon: "error"
                })
            }
        })
        .catch(function (err) {
            console.error(err);
            Swal.fire({
                title: "Erro...",
                text: "Conexão do banco de dados perdida!",
                icon: "error"
            })
        })
    }

}