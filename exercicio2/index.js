/* Definir um array de objetos, cujas chaves serão id, título, autor, quantidade.
Cada item representa um livro disponível na livraria */

const estoque = [
    {id: 2035, titulo: 'Harry Potter', autor: 'Maria Silva', quantidade: 12},
    {id: 3547, titulo: 'Senhor dos Anéis', autor: 'José Souza', quantidade: 15},
    {id: 4426, titulo: 'O Livro da Fadas', autor: 'Mario Santos', quantidade: 20},
    {id: 9139, titulo: 'O Programador Pragmático', autor: 'João Lima', quantidade: 7}
];

/* Criar função para adicionar um livro ao estoque. Esta função recebe como id, título, autor e quantidade. */

const adicionarLivro = (id, titulo, autor, quantidade) => {
    estoque.push({
        id,
        titulo,
        autor,
        quantidade
    });
}

adicionarLivro(3437, 'Código Limpo', 'Tio Bob', 18);
console.log(estoque)


/* Criar função para remover um item do estoque. Esta função recebe como parâmetro o id */

const removeLivro = (idDoLivro) => {
    const existeIdNoEstoque = !! estoque.find(livro => livro.id === idDoLivro)
    if(existeIdNoEstoque) {
        for(let indice = 0; indice < estoque.length; indice++) {
            if(estoque[indice].id === idDoLivro) {
                console.log(`O livro de id ${idDoLivro} foi removido`);
                estoque.splice(indice, 1);
                break;
            } 
        }           
    }
    else {
        console.log(`O livro de id ${idDoLivro} não foi encontrado`)
    }
}

removeLivro(4426);
console.log(estoque);

/* Criar uma função para atualizar a quantidade de um livro do estoque. Este id, novaQuantidade. */
const atualizaQuantidade = (idDoLivro, novaQuantidade) => {
    const existeIdNoEstoque = !! estoque.find(livro => livro.id === idDoLivro)
    if(existeIdNoEstoque) {
        for (let livro of estoque) {
            if(livro.id === idDoLivro) {
                livro.quantidade = novaQuantidade;
                console.log(`A quantidade do livro ${livro.titulo} foi atualizada para ${novaQuantidade}`);
                break;
            }
        }
    }
    else {
        console.log(`O id ${idDoLivro} não foi localizado no estoque`)
    }
}

atualizaQuantidade(2035, 1200);
console.log(estoque);


/* Criar uma função que lista os livros que estão no array */

const listarLivros = () => {
    if(estoque.length === 0) {
        console.log('O estoque está vazio')
    } else {
        console.log(`O estoque possui ${estoque.length} títulos.`)
        for (let livro of estoque) {
            console.log(`
            ID: ${livro.id}
            Livro: ${livro.titulo}
            Autor: ${livro.autor}
            Quantidade: ${livro.quantidade}
            `)
        }
    }
}

listarLivros();

adicionarLivro(1972, 'Marketing Digital', 'Mauro Pereira', 4600);
adicionarLivro(8537, 'Refatoração', 'Erick Oliveira', 8135);
adicionarLivro(7225, 'A Bíblia do Java', 'Zé da Silva', 2000);

listarLivros();

const listaLivrosNovos = [
    {id: 5589, titulo: '1984', autor: 'Aline Vieira', quantidade: 1500},
    {id: 8537, titulo: 'Marketing Digital', autor: 'Mauro Pereira', quantidade: 4600},
    {id: 1972, titulo: 'Refatoração', autor: 'Erick Oliveira', quantidade: 8135},
    {id: 7225, titulo: 'A Bíblia do Java', autor: 'Zé da Silva', quantidade: 2000},
    {id: 7224, titulo: 'A Bíblia do JavaScript', autor: 'Zé da Silva', quantidade: 1500},
]

const adicionaDaLista = (listaNovos) => {
    for (let livro of listaNovos) {
        const { id, titulo, autor, quantidade} = livro
        adicionarLivro(id, titulo, autor, quantidade)
    }
    console.log(`${listaNovos.length} livros adicionados`);
}

adicionaDaLista(listaLivrosNovos);
console.log(estoque);

const executaEMostraLista = (acao, mostraLista) => {
    console.log('Vou executar')
    acao();
    console.log('Executei')
    mostraLista();

}

executaEMostraLista(() => adicionarLivro(3437, 'Código Limpo', 'Tio Bob', 18), listarLivros)