

function showLoggedUser() {
    var userData = sessionStorage.getItem('userData');
    userData = JSON.parse(userData);

    document.getElementById('nome').value = userData.nome;
    document.getElementById('idade').value = userData.idade;
    document.getElementById('endereco').value = userData.endereco;
    document.getElementById('email').value = userData.email;
    document.getElementById('senha').value = userData.senha;
    document.getElementById('outros').value = userData.outros;
    document.getElementById('interesses').value = userData.interesses;
    document.getElementById('sentimentos').value = userData.sentimentos;
    document.getElementById('valores').value = userData.valores; 
  
    document.getElementById('button-validador').addEventListener('click', function() {
        if (validar_geral() == true) {
            updateUser(userData.id);
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
    })
  }
  


