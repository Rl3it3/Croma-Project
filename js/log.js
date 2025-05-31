// IMPORTS DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBA-zpE5DSPsIl4qFsMp0Hpm_zozCJqf7o",
  authDomain: "cromaproject-3a10c.firebaseapp.com",
  projectId: "cromaproject-3a10c",
  storageBucket: "cromaproject-3a10c.firebasestorage.app",
  messagingSenderId: "195048535864",
  appId: "1:195048535864:web:262d927040266bef9973cd",
  measurementId: "G-CBERGLY1GY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const userOptionsBox = document.getElementById('user-options-message');
    const userOptionsToggle = document.getElementById('user-options-toggle');
    const cartBox = document.getElementById('cart-message');

    // Abrir/fechar opções de usuário
    userOptionsToggle.onclick = e => {
        e.preventDefault();
        userOptionsBox.classList.toggle('show');
        cartBox.classList.remove('show');
    };

    userOptionsBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Lógica de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuário está login
            userOptionsBox.innerHTML = `
                <a href="#" id="logout-button" class="user-option-link">Terminar Sessão</a>
            `;
            const logoutButton = document.getElementById('logout-button');
            if (logoutButton) {
                logoutButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    signOut(auth).then(() => {
                        console.log("Usuário desconectado");
                        window.location.href = "index.html";
                    }).catch((error) => {
                        console.error("Erro ao terminar sessão:", error);
                    });
                });
            }
        } else {
            // Usuário não está login
            userOptionsBox.innerHTML = `
                <a href="Login.html" class="user-option-link">Iniciar Sessão</a>
                <a href="Signup.html" class="user-option-link">Criar Conta</a>
            `;
        }
    });
});