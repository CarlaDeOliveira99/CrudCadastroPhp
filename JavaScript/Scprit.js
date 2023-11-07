
var classProduto = new Produto();

window.addEventListener('load', function () {


    classProduto.atualizarTabela();

    this.document.getElementById('btnModalCadastrar').addEventListener('click', function () {

        let tipo = "cadastrar"
        classProduto.coletarDados(tipo);
    })


    this.document.getElementById('btnAdicionar').addEventListener('click', function () {
        document.getElementById('btnModalCadastrar').style.display = 'inline'
        document.getElementById('alterar').style.display = 'none'
        classProduto.limparCampoCadastro();
    })


})


function funcaoDeletar(event) {

    let itemClicado = event.target

    let objeto = itemClicado.parentElement.parentElement.childNodes

    let id = objeto[0].innerText

    fetch('Php/arquivo.php?tipo=deletar&idRegistro=' + id, {
        method: 'DELETE'
    })
        .then((res) => {
            classProduto.atualizarTabela();
        })
}


function funcaoAlterar(event) {

    document.getElementById('btnModalCadastrar').style.display = 'none'
    document.getElementById('alterar').style.display = 'inline'

    modal.classList.toggle("hide");
    fundoModal.classList.toggle("hide");

    let itemClicado = event.target

    let objeto = itemClicado.parentElement.parentElement.childNodes

    let id = objeto[0].innerText

    fetch('Php/arquivo.php?tipo=ler')
        .then(res => res.json())
        .then(resposta =>
            resposta.forEach(element => {
                if (id == element.cod) {
                    document.getElementById('campoID').value = element.cod
                    document.getElementById('campoProd').value = element.produto
                    document.getElementById('quantidade').value = element.quantidade
                    document.getElementById('unidade').value = element.unidade
                    document.getElementById('precoInicial').value = element.precoInicial
                    document.getElementById('precoFinal').value = element.precoFinal
                }
            }))

}


document.getElementById('alterar').addEventListener('click', function () {

    let tipo = "alterar"

    classProduto.coletarDados(tipo)
})


this.document.getElementById('campoPesquisa').addEventListener('keyup', function () {
    classProduto.pesquisar()
})



