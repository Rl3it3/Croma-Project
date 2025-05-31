// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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

// INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// AUTENTICAÇÃO
const auth = getAuth(app);
auth.languageCode = 'pt';

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert', type);
    alertBox.textContent = message;
    alertContainer.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

// EVENTO DE CRIAÇÃO DE CONTA
const submitsignup = document.getElementById('submitsignup');
submitsignup.addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.getElementById('emailsignup').value;
  const password = document.getElementById('passwordsignup').value;
  const confirmpassword = document.getElementById('confirmpasswordsignup').value;
  const termsCheckbox = document.querySelector('.signup-agreement input[type="checkbox"]');

  const formInputs = document.querySelectorAll('.signup-container input:not(.search-input)');
  let allValid = true;

  formInputs.forEach(input => {
      if (!input.value.trim()) {
          allValid = false;
          input.style.border = "1px solid red";
      } else {
          input.style.border = "1px solid #28a745";
      }
  });

  if (!allValid) {
      showAlert('Por favor, preencha todos os campos corretamente.', 'remove');
      return;
  } else if (password != confirmpassword) {
      showAlert('As passwords não coincidem. Por favor, verifique.', 'remove');
      return;
  } else if (!termsCheckbox.checked) {
    showAlert('Você deve aceitar os Termos e Condições para criar uma conta.', 'remove');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      window.location.href = "index.html";
      showAlert('Conta criada com sucesso!', 'success'); // Success notificação
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      if (errorCode == 'auth/weak-password') {
        showAlert("A password deve ter pelo menos 6 caracteres", "remove");
        return;
      } else {
        showAlert(errorMessage, "remove");
      }
    });
});