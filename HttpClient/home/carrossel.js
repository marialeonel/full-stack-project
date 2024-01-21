let imagem_slider = document.querySelectorAll('.slider');
let button_antes = document.getElementById('button-antes');
let button_depois = document.getElementById('button-depois');

let posicao_atual = 0

function esconder_slider(){
    imagem_slider.forEach(item => item.classList.remove('ativo'));
}

function mostrar_slider(){
    imagem_slider[posicao_atual].classList.add('ativo');
}

function avancar_slider() {
    esconder_slider();
    if(posicao_atual == imagem_slider.length - 1) {
        posicao_atual = 0;
    } else {
        posicao_atual++;
    }

    mostrar_slider();
}

function voltar_slider() {
    esconder_slider();
    if(posicao_atual == 0) {
        posicao_atual = imagem_slider.length - 1;
    } else {
        posicao_atual--;
    }

    mostrar_slider();
}
