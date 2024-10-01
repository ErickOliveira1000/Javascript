var usuarios = []


addEventListener('click', () => {
    if(document.getElementById('texto').value === ''){   //Verifica se o input está vazio
          
    } else{   
    
        if (localStorage.cadastroDeUsuario) {
            usuarios = JSON.parse(localStorage.getItem('cadastroDeUsuario'));
        }
    
        let novoUsuario = document.getElementById('texto').value;
        if(novoUsuario === ''){    
        } else{
            usuarios.unshift(novoUsuario);
            document.getElementById('texto').value = '';
            localStorage.cadastroDeUsuario = JSON.stringify(usuarios);
        }   
    }
    atualizaStatus()  //Chama a função apos cadastrar o novo usuario
})

function atualizaStatus() {        // Recupera os dados do localStorage e adiciona na página
    let resultDiv = document.getElementById('d');
    resultDiv.innerHTML = '';
    if (localStorage.cadastroDeUsuario){
        usuarios = JSON.parse(localStorage.getItem('cadastroDeUsuario'));    
        if (usuarios.length === 1) {
            resultDiv.append(`${usuarios} curtiu essa página.`);
        } else if (usuarios.length === 2){
            resultDiv.append(`${usuarios[0]} e  ${usuarios[1]} curtiram essa página.`);
        } else if (usuarios.length === 3){
            resultDiv.append(`${usuarios[0]},  ${usuarios[1]} e mais ${usuarios.length - 2} pessoa, curtiram essa página.`);
        } else if (usuarios.length > 3){
            resultDiv.append(`${usuarios[0]},  ${usuarios[1]} e outras ${usuarios.length - 2} pessoas, curtiram essa página.`);
        }           
    } else{
        resultDiv.append('Ninguém curtiu a página');
    }
}

atualizaStatus()