class Produto {

    id;
    descricao;
    quantidade;
    precoInicial;
    precoFinal;
    arrayProduto;


    constructor() {
        this.id = 0
        this.descricao = ''
        this.quantidade = 0
        this.unidade = ''
        this.precoInicial = 0
        this.precoFinal = 0
        this.arrayProduto = [];

    }

    atualizarTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerHTML = '';

        fetch('Php/arquivo.php?tipo=ler')
            .then(res => res.json())
            .then(resposta =>
                resposta.forEach(element => {
                    // this.arrayProduto.push(element);

                    let obj = element;


                    let tr = tbody.insertRow()
                    this.id = tr.insertCell()
                    this.produto = tr.insertCell()
                    this.quantidade = tr.insertCell()
                    this.unidade = tr.insertCell()
                    this.precoInicial = tr.insertCell()
                    this.precoFinal = tr.insertCell()
                    let tdacoes = tr.insertCell()

                    tr.classList.add('trInfor')

                    this.id.innerHTML = obj.cod;
                    this.produto.innerHTML = obj.produto;
                    this.quantidade.innerHTML = obj.quantidade;
                    this.unidade.innerHTML = obj.unidade;
                    this.precoInicial.innerHTML = obj.precoInicial;
                    this.precoFinal.innerHTML = obj.precoFinal;


                    this.id.classList.add('center')
                    this.produto.classList.add('tdInfo')
                    this.quantidade.classList.add('center')
                    this.unidade.classList.add('tdInfo')
                    this.precoInicial.classList.add('center')
                    this.precoFinal.classList.add('center')

                    let imgEditar = document.createElement('img')
                    imgEditar.src = 'icone/editar.png'
                    imgEditar.classList.add('imgPadrao')
                    imgEditar.setAttribute("id", "btnEditar")
                    imgEditar.setAttribute("onclick", "funcaoAlterar(event)")
                    let imgExcluir = document.createElement('img')
                    imgExcluir.src = 'icone/lixeira.png'
                    imgExcluir.classList.add('imgPadrao')
                    imgExcluir.setAttribute("id", "btnExcluir")
                    imgExcluir.setAttribute("onclick", "funcaoDeletar(event)")

                    tdacoes.appendChild(imgEditar)
                    tdacoes.appendChild(imgExcluir)
                }))
    }

    coletarDados(tipo) {
        let produto = {}

        produto.cod = document.getElementById('campoID').value
        produto.produto = document.getElementById('campoProd').value
        produto.quantidade = document.getElementById('quantidade').value
        produto.unidade = document.getElementById('unidade').value
        produto.precoInicial = document.getElementById('precoInicial').value
        produto.precoFinal = document.getElementById('precoFinal').value


        if (this.validarCampo(produto)) {
            fetch('Php/arquivo.php?tipo=' + tipo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            })
                .then((res) => {
                    this.atualizarTabela();
                })


        }
    }


    validarCampo(produto) {
        let msg = '';

        if (produto.descricao == '') {
            msg += 'Informe o nome do produto\n'
        }
        if (produto.quantidade == '') {
            msg += 'Informe a quantidade de produto\n'
        }
        if (produto.unidade == '') {
            msg += 'Informe a unidade do produto\n'
        }
        if (produto.precoInicial == '') {
            msg += 'Informe o Preço de Compra do produto\n'
        }
        if (produto.precoFinal == '') {
            msg += 'Informe o preço de venda do produto\n'
        }

        if (msg != '') {

            alert(msg)
            modal.classList.toggle("hide");
            fundoModal.classList.toggle("hide");
            return false
        }
        return true
    }


    limparCampoCadastro() {
        document.getElementById('campoProd').value = ''
        document.getElementById('quantidade').value = ''
        document.getElementById('unidade').value = ''
        document.getElementById('precoInicial').value = ''
        document.getElementById('precoFinal').value = ''
    }

    pesquisar() {
        let campoPesquisaDigitado = document.getElementById('campoPesquisa');
        let dadosTabela = document.querySelectorAll('.trInfor');
        dadosTabela.forEach(element => {
            let inforLista = element.textContent.toLocaleLowerCase().trim()
            let txtCampoPesquisa = campoPesquisaDigitado.value.toLocaleLowerCase().trim()

            if (inforLista.includes(txtCampoPesquisa)) {
                let dadosDaTD = element.children

                for (let i = 0; i < dadosDaTD.length; i++) {
                    let textoTab = dadosDaTD[i].innerText

                    if (textoTab.includes(txtCampoPesquisa)) {
                        let letrasTab = textoTab.split('')
                        let letrasCampPesquisa = txtCampoPesquisa.split('')

                        for (let j = 0; j < letrasTab.length; j++) {
                            for (let x = 0; x < letrasCampPesquisa.length; x++) {
                                if (letrasTab[j] == letrasCampPesquisa[x]) {
                                    letrasTab[j] = `<span>${letrasTab[j]}</span>`
                                }
                            }
                        }
                        textoTab = letrasTab.join("");
                        dadosDaTD[i].innerHTML = textoTab;
                    }
                }
            } else {
                element.remove()
            }
        });
        if (campoPesquisaDigitado.value.trim() == '') {
            return this.atualizarTabela()
        }
    }

    ordenarTabela(categoria, iconeSelecionado) {

        let listaProduto = this.dadosDaTabelaTr()
        let atualizalistaProduto = ''

        switch (iconeSelecionado) {
            case 1:
                if (categoria == "Cód") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.id < b.id) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Produto") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.descricao < b.descricao) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Quantidade") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.quantidade < b.quantidade) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Unidade") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.unidade < b.unidade) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Preço de Compra") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.precoInicial < b.precoInicial) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Preço de Venda") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.precoFinal < b.precoFinal) {
                            return -1;
                        } else {
                            return true;
                        }
                    });
                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                }

            case 2:
                if (categoria == "Cód") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.id > b.id) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Produto") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.descricao > b.descricao) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Quantidade") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.quantidade > b.quantidade) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Unidade") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.unidade > b.unidade) {
                            return -1;
                        } else {
                            return true;
                        }
                    });
                    break;
                } else if (categoria == "Preço de Compra") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.precoInicial > b.precoInicial) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                } else if (categoria == "Preço de Venda") {
                    atualizalistaProduto = listaProduto.sort(function (a, b) {
                        if (a.precoFinal > b.precoFinal) {
                            return -1;
                        } else {
                            return true;
                        }
                    });

                    this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                    break;
                }
            case 3:
                atualizalistaProduto = listaProduto.sort(function (a, b) {
                    if (a.id < b.id) {
                        return -1;
                    } else {
                        return true;
                    }
                });

                this.atualizarTabelaDeOrdenar(atualizalistaProduto)
                break;
            default:
                console.log('nao foi dessa vez');
                break;
        }
    }


    dadosDaTabelaTr() {

        let tr = document.getElementsByClassName('trInfor')
        let listaProduto = []

        Array.from(tr).forEach(element => {
            let td = element.childNodes

            let produto = {}
            produto.id = td[0].innerText
            produto.descricao = td[1].innerText
            produto.quantidade = td[2].innerText
            produto.unidade = td[3].innerText
            let precoInicial = td[4].innerText.replace('R$', '').replace(',', '.');
            produto.precoInicial = parseFloat(precoInicial)
            let precoFinal = td[4].innerText.replace('R$', '').replace(',', '.');
            produto.precoFinal = parseFloat(precoFinal)

            listaProduto.push(produto)
        })
        return listaProduto
    }

    atualizarTabelaDeOrdenar(produto) {
        let tr = document.getElementsByClassName('trInfor')



        for (let i = 0; i < produto.length; i++) {
            let td = tr[i].childNodes;

            td[0].innerText = produto[i].id;
            td[1].innerText = produto[i].descricao;
            td[2].innerText = produto[i].quantidade;
            td[3].innerText = produto[i].unidade;
            td[4].innerText = 'R$ ' + produto[i].precoInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            td[5].innerText = 'R$ ' + produto[i].precoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });;

        }


    }
}




