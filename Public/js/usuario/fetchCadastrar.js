
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById('btnCad')
    btn.addEventListener("click", validar)
})
let msg = ""
const msgErro = document.querySelector(".msg-erro")

function validar() {

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
        }).then(function(res){
            return res.json()
        }).then(function(corpo){
            if(corpo.ok){
                alert(corpo.msg)
            }
            else{
                alert(corpo.msg)
            }
        })
    }

}