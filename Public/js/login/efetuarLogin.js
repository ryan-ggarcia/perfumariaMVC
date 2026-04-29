document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    let btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', efetuarLogin )
    function efetuarLogin(){
        let email = document.getElementById('email')
        let senha = document.getElementById('senha')
        let ok = false
        email.style.borderColor = 'green'
        senha.style.borderColor = 'green'

        if(!email.value || !senha.value){
            Swal.fire({
                title: 'Não foi possível realizar o login.',
                text: 'Preencha todos os campos obrigatórios',
                icon: 'error'
            })
            if(!email.value) email.style.borderColor = 'red'
            if(!email.value.includes("@") && !email.value.includes(".com")) email.style.borderColor = 'red'
            if(!senha.value) senha.style.borderColor = 'red'
        }else{
            ok = true
        }

        if(ok == true){
            fetch('/login/efetuarLogin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    senha:senha.value
                })
            }).then(res => res.json()).then(result =>{
                if(result.ok){
                    Swal.fire({
                        title: 'Login realizado com sucesso.',
                        text: 'Redirecionando para a página inicial',
                        icon: 'success'
                    }).then(() => {
                        window.location.href = '/';
                    });
                }else{
                    Swal.fire({
                        title: 'Não foi possível realizar o login.',
                        text: result.msg,
                        icon: 'error'
                    });
                }
            })
        }


    }
})