<?php

// class Arquivo
// {
//     private $caminho;
//     private $arquivo;

//     public function __construct()
//     {
//         $this->caminho = "../dadosDaTabela/dados.txt";
//         $this->arquivo = '';
//     }

//     public function verificarArquivo()
//     {
//         if (file_exists($this->caminho)) {
//             echo "<p>O arquivo  $this->caminho existe</p>";
//             $this->criarArquivo();
//             $this->ler();  
//         } else {
//             echo "<p>O arquivo  $this->caminho não existe</p>";
//             $this->criarArquivo();
//             $this->ler();  
//         }
//     }

//     public function criarArquivo()
//     {
//         $this->arquivo = fopen($this->caminho, 'a');
//         $this->escrever();
//         fclose($this->arquivo);
//     }

//     public function escrever()
//     {
//         $teste = array( "+",'+',2);

//         foreach ($teste as $key) {
//             fwrite($this->arquivo, $key . PHP_EOL);
//         }

//     }

//     public function ler()
//     {
//         $conteudo = file_get_contents($this->caminho);
//         echo "<p>$conteudo</p>";
//         return $conteudo;
//     }



//     public function deletar()
//     {
//         $linha = 1;
//         $conteudo = file($this->caminho);

//         unset($conteudo[$linha]);

       
//         file_put_contents($this->caminho, $conteudo);
//     }




//     public function alterar()
//     {

//         $linha = 0;
//         $novoTexto = "boa";

//         $conteudo = file($this->caminho);


//         $conteudo[$linha] = $novoTexto . PHP_EOL;


//         file_put_contents($this->caminho, $conteudo);
//     }
// }
?>

<?php 
// $conteudo = file_get_contents('php://input'); // Pega o corpo da requisição
// $meuArray = json_decode($conteudo, true); // Decodifica a string JSON para um array

// $conteudo = json_decode(file_get_contents('php://input'), true);
// // $conteudo = file_get_contents('php://input');
// file_put_contents($caminho, print_r($conteudo, true));


// $produto = json_decode(file_get_contents('php://input'), true);

// // Verifica se o arquivo existe
// if(file_exists($caminho)) {
//     // Obtém os dados existentes
//     $dados_existentes = json_decode(file_get_contents($caminho), true);
//     echo  $dados_existentes;
// } else {
//     // Se o arquivo não existir, inicializa uma array vazia
//     $dados_existentes = [];
//     echo  $dados_existentes;
// }

// // Adiciona o novo produto aos dados existentes
// array_push($dados_existentes, $produto);
// echo "array";
// echo  $dados_existentes;
// echo  $produto;

// // Salva os dados no arquivo
// file_put_contents($caminho, json_encode($dados_existentes));


// fwrite($arquivo, print_r($dados, true));

// fclose($arquivo); -->

?>

<?php 

$caminho = "../dadosDaTabela/dados.txt";
$arquivo = '';

arquivo($caminho);

function arquivo($caminho)
{
    $produto = json_decode(file_get_contents('php://input'), true);
    // Verifica se o arquivo existe
    if (file_exists($caminho)) {
        // Obtém os dados existentes
        $dados_existentes = json_decode(file_get_contents($caminho), true);
    } else {
        // Se o arquivo não existir, inicializa uma array vazia
        $dados_existentes = [];
    }

    // Adiciona o novo produto aos dados existentes
    array_push($dados_existentes, $produto);

    // Salva os dados no arquivo
    file_put_contents($caminho, json_encode($dados_existentes));


    $arquivo = $caminho;
    $conteudo = file_get_contents($arquivo);

    echo $conteudo;
}

// echo 'ID: ' . $dados['id'] . '<br>';
// echo 'Produto: ' . $dados['produto'] . '<br>';
// echo 'Preço: ' . $dados['preco'] . '<br>';
?>
