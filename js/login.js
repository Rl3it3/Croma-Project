import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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
const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

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

//----------------------------------------Login google ------------------------//

const google_login = document.querySelector(".bi.bi-google");
google_login.addEventListener("click", function() {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href="index.html"
    showAlert("Login com Google realizado com sucesso", "success");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
})

});

//------------------------Login senha-----------------------------------//

const submitsignup = document.getElementById('submit');
submitsignup.addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const emailvalue = email.value;
  const passwordvalue = password.value;

  const formInputs = [email, password];
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
      showAlert('Por favor, preencha todos os campos corretamente', 'remove');
      return;
  }


  signInWithEmailAndPassword(auth, emailvalue, passwordvalue)
    .then((userCredential) => {
    const user = userCredential.user;
    showAlert("inicio de sessão com sucesso", "success");

    window.location.href="index.html"
  })
    .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;

  if (errorCode == 'auth/invalid-email') {
      showAlert("Email inválido, verifique o formato do email", "remove");
      return;
    } else if (errorCode == 'auth/invalid-credential') {
      showAlert("Credenciais inválidas, verifique seu email e senha", "remove");
    } else {
      showAlert(errorMessage, "remove");
    }
});

});

//------------------ password reset ---------------//

const reset = document.getElementById("reset");
reset.addEventListener("click", function(event){
  event.preventDefault()

  const email = document.getElementById("email").value;

  sendPasswordResetEmail(auth, email)
  .then(() => {
    showAlert('Email de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada', 'success');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode == 'auth/missing-email') {
      showAlert("Por favor, digite o seu email para recuperar a password", "remove");
      return;
    } else if (errorCode == 'auth/invalid-email') {
      showAlert("Email inválido, verifique o formato do email", "remove");
      return;
    } else if (errorCode == 'auth/user-not-found') {
      showAlert("Usuário não encontrado com esse email", "remove");
      return;
    } else {
      showAlert(errorMessage, "remove");
    }
  });

})