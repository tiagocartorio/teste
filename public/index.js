document.addEventListener('DOMContentLoaded', function() {
    var loginModal = document.getElementById("loginModal");
    var registerModal = document.getElementById("registerModal");
    var loginBtn = document.getElementById("loginBtn");
    var registerLink = document.getElementById("registerLink"); // Adicionado o link de registro
    var span = document.getElementsByClassName("close");

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    registerLink.onclick = function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        registerModal.style.display = "block";
        loginModal.style.display = "none"; // Fecha o modal de login ao abrir o de registro
    }

    for (var i = 0; i < span.length; i++) {
        span[i].onclick = function() {
            loginModal.style.display = "none";
            registerModal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        } else if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
    }
});
