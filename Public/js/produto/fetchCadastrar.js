document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnCad")
    btn.addEventListener("click", cadastrar)

    function cadastrar() {
        const nome = document.getElementById("nome")
        const marca = document.getElementById("marca")
        const quant = document.getElementById("quant")
        const preco = document.getElementById("preco")
        const image = document.getElementById("image")
        const status = document.getElementById("status")
        const desc = document.getElementById("desc")

        nome.style.borderColor = "green"
        marca.style.borderColor = "green"
        quant.style.borderColor = "green"
        preco.style.borderColor = "green"
        image.style.borderColor = "green"
        status.style.borderColor = "green"
        desc.style.borderColor = "green"

        if (!nome.value || !marca.value || !quant.value || !preco.value || (!image.files || !image.files[0]) || status.value === "0" || !desc.value) {
            Swal.fire({
                title: 'Não foi possível realizar o cadastro.',
                text: 'Preencha todos os campos obrigatórios',
                icon: 'error'
            })
            if (!nome.value) nome.style.borderColor = "red"
            if (!marca.value) marca.style.borderColor = "red"
            if (!quant.value) quant.style.borderColor = "red"
            if (!preco.value) preco.style.borderColor = "red"
            if (!image.files || !image.files[0]) image.style.borderColor = "red"
            if (status.value === "0") status.style.borderColor = "red"
            if (!desc.value) desc.style.borderColor = "red"
        }
        else {
            // Use FormData for file upload (multer expects multipart/form-data)
            const formData = new FormData()
            formData.append('nome', nome.value)
            formData.append('marca', marca.value)
            formData.append('quant', parseInt(quant.value))
            formData.append('preco', parseFloat(preco.value))
            formData.append('status', status.value)
            formData.append('desc', desc.value)
            // append file input (field name must match multer config)
            if (image.files && image.files[0]) {
                formData.append('image', image.files[0])
            }

            fetch('/produto/efetuarCadastro', {
                method: 'POST',
                body: formData // do NOT set Content-Type; browser will set multipart boundary
            })
            .then(function(res){
                return res.json()
            }).then(function(result){
                if(result.ok){
                    Swal.fire({
                        title: 'Produto cadastrado com sucesso!',
                        icon: 'success'
                    }).then(function(){
                        window.location.href = '/produto/listar'
                    })
                }else{
                    Swal.fire({
                        title: 'Não foi possível realizar o cadastro.',
                        text: 'Ocorreu um erro ao cadastrar o produto, por favor tente novamente.',
                        icon: 'error'
                    })
                }
            }).catch(function(err){
                console.error(err)
                Swal.fire({
                    title: 'Erro',
                    text: 'Problema na conexão ou no envio do arquivo.',
                    icon: 'error'
                })
            })
        }
    }
})