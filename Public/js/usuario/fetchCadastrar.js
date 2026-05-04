
document.addEventListener("DOMContentLoaded",function(e){
    e.preventDefault()
    const btn = document.querySelectorAll(".btnGravar")
    for(let i = 0; i < btn.length; i++){
        btn[i].addEventListener("click", cadastrar)
    }
})
function cadastrar(){
    //pegando input
    let nome = document.getElementById("a-nome")
    let email = document.getElementById("a-email")
    let senha = document.getElementById("a-password")
    let perfil = document.getElementById("a-profile")
    let data = document.getElementById("a-dob")
    let ok = true
    //estilos do input
    nome.style.borderColor = "green"
    email.style.borderColor = "green"
    senha.style.borderColor = "green"
    perfil.style.borderColor = "green"
    data.style.borderColor = "green"
    //Validando input

    if(!email.value || !email.value.includes('@') || !email.value.includes('.com')){
        Swal.fire({
            icon: 'error',
            title: "Dados do email incorreto",
            text: 'Verifique se o email doi digitado corretamente',
            timer: 4000
        })
        email.style.borderColor = "red"
        ok = false
    }

    if(!nome.value || !senha.value || !perfil.value || !data.value){
        Swal.fire({
            title:'Não foi possível realizar o cadastro',
            text:"Preencha todos os campos obrigatorios",
            icon: 'error',
            timer: 3000
        })
        if(!nome.value) nome.style.borderColor = "red"
        if(!senha.value) senha.style.borderColor = "red"
        if(!data.value) data.style.borderBlockColor = "red"
        if(perfil.value == "0") perfil.style.borderColor = "red"
        ok = false
    }

    if(!ok) return
    fetch("/usuario/efetuarCadastro",{
        headers:{
            'Content-Type': 'application'
        },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            perfil: perfil.value
        })
    }).then(res => res.json()).then(result =>{
        if(result){
            if(result.ok){
                Swal.fire({
                    icon: 'success',
                    text: 'Cadastro realizado com Sucesso!',
                    timer: 3000
                }).then(
                    window.location.reload
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao realizar o cadastro',
                    text: result.msg,
                    timer: 4000
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado...',
                text: result.msg,
                timer: 4000
            })
        }
    })

}