(() => {
    const botaoCarregar = document.getElementById('carrega-devs');
    const inputNome = document.getElementById('nome-dev');
    const botaoGuarda = document.getElementById('guarda');

    async function carregaDevs () {
        const devData = await fetch('https://api.github.com/users')
        const listaDevs = await devData.json();
        return listaDevs;
    }

    async function carregaDevPorUser (user) {
        const devData = await fetch(`https://api.github.com/users/${user}`);
        const dev = await devData.json();
        return dev;
    }

    function mostraListaDevs(listaDevs) {
        for(let dev of listaDevs) {
            const blocoDev = document.createElement('p');
            blocoDev.innerText = dev.login;
            document.body.appendChild(blocoDev);
        }
        
    }

    botaoCarregar.addEventListener('click', () => {
        carregaDevs().then((res) => mostraListaDevs(res))
    })

    inputNome.addEventListener('keyup', (e) =>  {
        localStorage.setItem('devProcurado', e.target.value)
        carregaDevPorUser(e.target.value).then(res => console.log(res))
        if(carregaDevPorUser(e.target.value)){
            console.log('Usuario válido')
        } else{
            console.log('Usuário não encontrado')
        }
        
    })

    botaoGuarda.addEventListener('click', () => {
        const devProcurado = localStorage.getItem('devProcurado')
        carregaDevPorUser(devProcurado).then(res => localStorage.setItem('devProcurado', JSON.stringify(res)))

        const dadosAtuais = JSON.parse(localStorage.getItem('devProcurado'))
        console.log(dadosAtuais)
    })

    botaoCarregar.addEventListener('click', () => {
        carregaDevs().then(response => console.log(response.status)) 
    })

    // botaoCarregar.addEventListener('click', () => {
    //     carregaDevs().then(response => console.log(response.status)) 
    // })

   

    
    
})() 