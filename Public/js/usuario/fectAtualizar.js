document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()
    let btn = document.querySelectorAll(".btn-update")
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", atualizar)
    }
    function atualizar() {
        let modal = document.querySelector(".modal")
        modal.style.display = "flex"
        let btnClose = document.querySelector(".btn-close")
        let btnSalvar = document.querySelector(".btn-salvar")
        btnClose.addEventListener("click", function () {
            modal.style.display = "none"
        })
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.style.display = "none"
            }
        })
        btnSalvar.addEventListener("click", () => {
            let id = this.dataset.update
            let nome = document.getElementById("nome")
            let email = document.getElementById("email")
            let perfil = document.getElementById("perfil")
            if (!nome.value && !email.value && perfil == "0") {
                nome.style.borderColor = "red"
                email.style.borderColor = "red"
                senha.style.borderColor = "red"
                perfil.style.borderColor = "red"
                Swal.fire({
                    title: "Erro",
                    text: "Preencha todos os campos obrigatorios!",
                    icon: "error"
                })
            } else {
                fetch("/usuario/atualizar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        nome: nome.value,
                        email: email.value,
                        perfil: perfil.value
                    })
                }).then(function (res) {
                    return res.json()
                }).then(function (result) {
                    if (result.ok) {
                        Swal.fire({
                            title: "Atualização bem sucedida!",
                            text: "Todas as alterações foram feitas",
                            icon: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "Erro no Atualizado.",
                            text: "Erro ao realizar o atualização!",
                            icon: "error"
                        })
                    }
                })
            }
        })
    }
})