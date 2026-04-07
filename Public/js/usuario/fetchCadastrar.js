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
                return res.json()
            }).then(function (result) {
                if (result.ok) {
                    Swal.fire({
                        title: "Cadastro Realizada!",
                        text: "Cadastro realizada com sucesso.",
                        icon: "success"
                    })
                    window.location.href = "/usuario/listar"
                } else {
                    Swal.fire({
                        title: "Erro no cadastro.",
                        text: "Erro ao realizar o cadastro!",
                        icon: "error"
                    })
                }
            })
            .catch(function (err) {
                console.error(err);
                Swal.fire({
                    title: "Erro...",
                    text: "Verifique se o email digitado não foi duplicado!",
                    icon: "error"
                })
            })
    }

}