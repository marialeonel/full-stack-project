function validarValorBusca() {
    let nome = document.getElementById('input-busca').value;
    let mensagem = document.getElementById('mensagem-busca');
    let button = document.getElementById('search-button');

    if(nome.startsWith(' ') || nome.endsWith(' ')) {
        mensagem.textContent = 'Remova espaços em branco no início e no final do nome.';
        mensagem.style.color = 'red';
        button.disabled;
    } else {
        mensagem.textContent = '';
    }
    
}