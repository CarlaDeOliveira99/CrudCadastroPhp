<?php
$caminho = "../dadosDaTabela/dados.txt";
$arquivo = '';
$dados = '';
$conteudo = '';
$tipo = false;
$jsonJS =  $conteudoJS = file_get_contents('php://input');

if (isset($_GET['tipo'])) {
    $tipo = $_GET['tipo'];
}

$produto = '';
$quantidade = '';
$unidade = '';
$precoInicial = 0;
$precoFinal = 0;




if ($tipo == 'ler') {
    ler($caminho);
} else if ($tipo == 'cadastrar') {
    coletarDados($produto, $quantidade, $unidade, $precoInicial, $precoFinal, $caminho, $jsonJS);
} else if ($tipo == 'deletar') {
    deletar($caminho);
} else if ($tipo == 'alterar') {
    alterar($caminho, $jsonJS);
}


// gerar indice
function id($caminho)
{
    if (!file_exists($caminho)) {
        return 0;
    }

    $conteudo = file_get_contents($caminho);
    $array = json_decode($conteudo, true);
    
    $ultimoElemento = array_pop($array);

    return ++$ultimoElemento['cod'];

}



function coletarDados($produto, $quantidade, $unidade, $precoInicial, $precoFinal, $caminho, $jsonJS)
{
    $jsonJSArray = json_decode($jsonJS, true);

    $id = id($caminho);

    $dados = array(
        "cod" => $id,
        "produto" => $jsonJSArray['produto'],
        "quantidade" => $jsonJSArray['quantidade'],
        "unidade" => $jsonJSArray['unidade'],
        "precoInicial" => $jsonJSArray['precoInicial'],
        "precoFinal" => $jsonJSArray['precoFinal']
    );

    arquivo($dados, $caminho);
}

// crair a pasta e escrever o texto
function arquivo($dados, $caminho)
{
    $dados_existentes = [];

    if (file_exists($caminho)) {
        // Obtém os dados existentes
        $dados_existentes = json_decode(file_get_contents($caminho), true);
    }
    
    $dados_existentes[] = $dados;

    file_put_contents($caminho, json_encode($dados_existentes));
}


function ler($caminho)
{
    header('Content-Type: application/json');
    echo file_get_contents($caminho);
}

function deletar($caminho)
{   
    $idDeletar = $_GET['idRegistro'];
    $listaDados = json_decode(file_get_contents($caminho), true);
    
    
    $idxRemover = -1;

    foreach ($listaDados as $idx => $registro) {
        if ($registro['cod'] == $idDeletar) {
            $idxRemover = $idx;
            break;
        }
    }
    
    if ($idxRemover != -1) {
        unset($listaDados[$idxRemover]);
        file_put_contents($caminho, json_encode(array_values($listaDados)));
    }

}


function alterar($caminho, $jsonJsString)
{
    $dadosAlterar = json_decode($jsonJsString, true);
    $listaDados = json_decode(file_get_contents($caminho), true);

    $idxAlterar = -1;

    foreach ($listaDados as $idx => $registro) {
        if ($registro['cod'] == $dadosAlterar['cod']) {
            $idxAlterar = $idx;
            break;
        }
    }
    if ($idxAlterar != -1) {
        $listaDados[$idxAlterar] = $dadosAlterar;
        file_put_contents($caminho, json_encode(array_values($listaDados)));
    }
}


