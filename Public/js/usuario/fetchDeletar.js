document.addEventListener("DOMContentLoaded", function () {
    // let btn = document.querySelectorAll(".btn-delete")
    // for (let i = 0; i < btn.length; i++) {
    //     btn[i].addEventListener("click", deletar)
    // }
    // function deletar(e) {
    //     e.preventDefault();
    //     let id = this.dataset.id // pegando o data-set
    //     Swal.fire({
    //         title: "Você deseja Deletar a coluna?",
    //         text: "Ao realizar a deleção não sera possível realizar a restalração",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Sim, quero deletar !"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch("/usuario/deletar", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ id: id }),
    //             })
    //                 .then(function (res) {
    //                     return res.json()
    //                 }).then(function (corpo) {
    //                     if (corpo.ok) {
    //                         Swal.fire({
    //                             title: "Deleção Realizada!",
    //                             text: "Deleção realizada com sucesso.",
    //                             icon: "success"
    //                     })
    //                     window.location.reload()
    //                 }else{
    //                     Swal.fire({
    //                     title: "Erro...",
    //                     text: "Erro ao realizar a deleção!",
    //                     icon: "error"
    //                 })
    //                 }
    //             })
    //             .catch(function (err) {
    //                 console.error(err);
    //                 Swal.fire({
    //                     title: "Erro...",
    //                     text: "Conexão do banco de dados perdida!",
    //                     icon: "error"
    //                 })
    //             })
    //         }
    //     });
    // }
})