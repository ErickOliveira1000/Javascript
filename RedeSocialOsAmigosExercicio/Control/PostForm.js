var usuario = []; // Array para guardar o nome do usuário
var n = 0;
var m = -1;

// Função para buscar uma imagem aleatória de gato
async function fetchCatImage() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        return data[0].url; // Retorna o URL da imagem de gato
    } catch (error) {
        console.error('Erro ao buscar a imagem do gato:', error);
        return 'img/fallback-cat.jpg'; // Caminho para uma imagem de fallback
    }
}

if (localStorage.cadastroDeNovoUsuario) { // Verifica se já existe dados de usuário no localStorage
    usuario = JSON.parse(localStorage.getItem('cadastroDeNovoUsuario'));
} else { // Se não houver usuário cadastrado, cria uma div com um formulário para salvar o usuário
    const div = document.getElementById('d');
    const divCadastro = document.createElement('div');
    divCadastro.classList.add('dadosDoUsuario');
    divCadastro.innerHTML = `
    <div class="dadosDoUsuario">
        <strong>Cadastre-se</strong>
        <div class="avisoDeCadastro">
            <input id="texto" type="text" class="nomeDeUsuario" placeholder="Nome de usuário">
        </div>
        <button class="salvarUsuario" id="salvarUsuario">Salvar</button>
    </div>
    `;
    div.append(divCadastro);
    document.getElementById('publicar').disabled = true; // Mantém o botão Publicar desabilitado
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoSalvar = document.getElementById('salvarUsuario');
    const botaoSair = document.getElementById('sair');

    if (botaoSalvar) {
        botaoSalvar.addEventListener('click', () => {
            salvaNovoUsuario();
            location.reload();
        });
    }

    if (botaoSair) {
        botaoSair.addEventListener('click', () => {
            localStorage.clear('cadastroDeNovoUsuario');
            location.reload();
        });
    } 
    
});



function salvaNovoUsuario() { // Função para salvar o usuário
    const inputTexto = document.getElementById('texto').value;

    if (inputTexto === '') { // Verifica se o input está vazio e emite um alerta
        alert('Digite um nome de usuário');
    } else if (inputTexto.length < 5) { // Verifica se o nome digitado é pequeno e emite um alerta
        alert('Nome de Usuário precisa ter no mínimo 5 caracteres!');
    } else {
        let novoUsuario = inputTexto;

        if (localStorage.cadastroDeNovoUsuario) {
            usuario = JSON.parse(localStorage.getItem('cadastroDeNovoUsuario'));
        }

        if (novoUsuario !== '') {
            usuario.unshift(novoUsuario);
            document.getElementById('texto').value = '';
            localStorage.setItem('cadastroDeNovoUsuario', JSON.stringify(usuario));
        }
    }
}

function atualizaUsuario() { // Recupera os dados do localStorage e adiciona na página
    const novoStrong = document.getElementById('nomeDeUsuarioAtual');
    if (novoStrong) {
        novoStrong.innerHTML = '';
        if (localStorage.cadastroDeNovoUsuario) {
            usuario = JSON.parse(localStorage.getItem('cadastroDeNovoUsuario'));
            novoStrong.append(`${usuario[0]}`); // Exibe o primeiro nome salvo no array
        }
    }
}

atualizaUsuario(); // Chama a função para atualizar o usuário

export class FormPost { // Cria um novo Post
    constructor(idForm, idTextarea, idUlPost) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.ulPost = document.getElementById(idUlPost);
        this.addSubmit();
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    formValidade(value) {
        return !(value === '' || value == null || value === undefined || value.length < 3);
    }

    dataAtual(){
        const diaAtual = new Date().getDate()
        const mesAtual = new Date().getMonth()
        const anoAtual = new Date().getFullYear()
        return `${diaAtual}/${mesAtual+1}/${anoAtual}`
    }

    getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return `${hour}h ${minutes}min`;
    }

    addSubmit() {
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (this.formValidade(this.textarea.value)) {
                const data = this.dataAtual();
                const time = this.getTime();
                const newPost = document.createElement('li');
                const catImageUrl = await fetchCatImage();
                newPost.classList.add('post');
                newPost.classList.add(`criado${n}`);
                newPost.innerHTML = `
            <div class="infoUserPost">
                <div class="imgUserPost"></div>
                <div class="nameAndHour">
                    <strong>${usuario[0]}</strong>
                    <p>${data}  ${time}</p>
                </div>
            </div>
            <div class="postUsuario">
                <p>
                    ${this.textarea.value}
                </p>
                <img src="${catImageUrl}" alt="Imagem de gatinho fofo" width="200px" />
            </div>

            <div class="actionBtnPost">
                <button type="button" class="filesPost like" id="curtir${n}"><img src="img/coracao.png" alt="Curtir" width="30px">Curtir <span class="likeCount" id="likeCount${n}">0</span> <!-- Contador de curtidas --></button>
                <button type="button" class="filesPost coment"><img src="img/balao-de-fala.png" alt="Comentar" width="30px">Comentar</button>
                <button type="button" class="filesPost share"><img src="img/compartilhar.png" alt="Compartilhar" width="30px">Compartilhar</button>
            </div>
            `;
                var classCriada = document.querySelector(`#posts .criado${m}`);
                this.ulPost.insertBefore(newPost, classCriada);

                // Adicionar evento de curtida
                const likeButton = document.getElementById(`curtir${n}`);
                const likeCount = document.getElementById(`likeCount${n}`);
                let likes = 0;

                likeButton.addEventListener('click', () => {
                    likes++;
                    likeCount.textContent = likes;
                });

                n++;
                m++;
                this.textarea.value = '';
            } else {
                alert('Verifique o campo digitado');
            }
        };

        this.onSubmit(handleSubmit);
    }
}

const postForm = new FormPost('formPost', 'textarea', 'posts');
atualizaUsuario();
