document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()
    const btn = document.querySelectorAll(".btn-delete")
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", deletar)
    }

    function deletar() {
        const id = this.dataset.id
        Swal.fire({
            title: "Você deseja excluir essa coluna ?",
            text: "Uma fez deletado não pode ser desfeito !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, desejo excluir!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("/produto/efetuarDelecao", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id }),

                }).then(function (res) {
                    return res.json()
                }).then(function (result) {
                    if (result.ok) {
                        Swal.fire({
                            title: "Produto excluido !",
                            text: "A página será atualizada automaticamente.",
                            icon: "success"
                        }).then(function () {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            title: "Não foi possível fazer a exclução!",
                            text: "Erro ao ecluir a coluna.",
                            icon: "error"
                        });
                    }
                })

            }

        });
    }
})