const mudaTitulo = (novoTitulo) => {
    const titulo = document.getElementById('titulo-principal')
    titulo.innerText = novoTitulo
}

setTimeout(() => mudaTitulo('Oba! Alterei o título'),2000)

const listaDeLi = document.getElementsByTagName('li')

const listaDeCores = ['#d60000', '#05f7ab']

const listaDeParagrafos = document.getElementsByTagName('p')

const botao = document.getElementsByTagName('button')[0]


setTimeout(() => {
    for(let paragrafo of listaDeParagrafos) {
        paragrafo.classList = 'paragrafo'
    }
    
    for(let li in listaDeLi) {
        listaDeLi[li].style.color = listaDeCores[li]
    }

}, 3000)

setTimeout(() => {
    botao.innerText = 'Clique com o novo texto'
    botao.style.fontSize = '40px'

}, 5000)
