/// Carrinho
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  const cartBox = document.getElementById('cart-message');
  const cartItems = document.getElementById('cart-items');
  const cartIcon = document.querySelector('.cart-icon');
  const confirmBtn = document.getElementById('confirm-cart-btn');
  const emptyMsg = document.getElementById('empty-cart-msg');
  const totalEl = document.getElementById('cart-total');

  const userOptionsBox = document.getElementById('user-options-message');
  const userOptionsToggle = document.getElementById('user-options-toggle');

  // Abrir/fechar carrinho
  cartIcon.onclick = e => {
    e.preventDefault();
    cartBox.classList.toggle('show');
    userOptionsBox.classList.remove('show');
  };

  document.addEventListener('click', (e) => {

    if (!cartBox.contains(e.target) && !cartIcon.contains(e.target)) {
      cartBox.classList.remove('show');
    }

    if (!userOptionsBox.contains(e.target) && !userOptionsToggle.contains(e.target)) {
        userOptionsBox.classList.remove('show');
    }
  });

  cartBox.addEventListener('click', (e) => {
    e.stopPropagation(); 
  });

  // Adicionar ao carrinho
  document.querySelectorAll('.product-add-basket button').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-title').textContent;
      const img = card.querySelector('img').src;
      const priceText = card.querySelector('.product-price').textContent;
      const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
      const key = `${name}__${img}`;

      cart[key] = cart[key] ?
        { ...cart[key],
          qty: cart[key].qty + 1
        } :
        {
          name,
          img,
          price,
          qty: 1
        };

      localStorage.setItem('cart', JSON.stringify(cart));
      showSuccessAlert("Produto adicionado ao carrinho.");
      renderCart();
    };
  });

  // Renderizar carrinho
  function renderCart() {
    cartItems.innerHTML = '';
    const entries = Object.entries(cart);
    let total = 0;

    entries.forEach(([key, item]) => {
      total += item.price * item.qty;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-bottom">
            <span class="cart-item-qty">Quantidade: ${item.qty}</span>
            <button class="remove-item"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      `;

      div.querySelector('.remove-item').onclick = () => {
        delete cart[key];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        showRemoveAlert("Produto(s) removido(s) do carrinho.");
      };

      cartItems.appendChild(div);
    });

    const hasItems = entries.length > 0;
    confirmBtn.classList.toggle('hidden', !hasItems);
    emptyMsg.style.display = hasItems ? 'none' : 'block';
    totalEl.textContent = `Total: ${total.toFixed(2).replace('.', ',')}€`;
    totalEl.style.display = hasItems ? 'block' : 'none';
  }

  // Notificação de adicionar
  function showSuccessAlert(message) {
    const container = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert success';
    alert.innerHTML = `<p class="text">${message}</p>`;
    container.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  // Notificação de remover
  function showRemoveAlert(message) {
    const container = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = 'alert remove';
    alert.innerHTML = `<p class="text">${message}</p>`;
    container.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  renderCart(); // Renderiza o carrinho ao carregar a página
});











//Animação botão do carrinho
document.addEventListener('DOMContentLoaded', () => {
    const addBasketButtons = document.querySelectorAll('.product-add-basket button');

    addBasketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalIcon = button.querySelector('i');
            const originalIconClass = originalIcon.className;

            originalIcon.className = 'bi bi-cart-check-fill';
            button.classList.add('added-to-cart-animation');

            setTimeout(() => {
                originalIcon.className = originalIconClass;
                button.classList.remove('added-to-cart-animation');
            }, 1000);
        });
    });
});



// Paginas
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("product-container");

  const originalProducts = Array.from(container.querySelectorAll(".product-card"));
  let products = [...originalProducts]; 

  const pagination = document.getElementById("pagination");
  const itemsPerPage = 12;
  let currentPage = 1;
  let totalPages = Math.ceil(products.length / itemsPerPage);

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    container.innerHTML = "";

    for (let i = start; i < end && i < products.length; i++) {
        container.appendChild(products[i]);
    }

    renderPagination(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPagination(current) {
    pagination.innerHTML = "";

    const createButton = (text, page, isActive = false, isDisabled = false) => {
      const btn = document.createElement("button");
      btn.textContent = text;
      if (isActive) btn.classList.add("active");
      if (isDisabled) btn.classList.add("disabled");
      if (!isDisabled) {
        btn.addEventListener("click", () => {
          currentPage = page;
          renderPage(page);
        });
      }
      return btn;
    };

    pagination.appendChild(createButton("<", currentPage - 1, false, currentPage === 1));

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createButton(i, i, i === current));
      }
    } else {
      pagination.appendChild(createButton(1, 1, current === 1));
      if (current > 3) pagination.appendChild(createButton("...", null, false, true));

      const startPage = Math.max(2, current - 1);
      const endPage = Math.min(totalPages - 1, current + 1);

      for (let i = startPage; i <= endPage; i++) {
        pagination.appendChild(createButton(i, i, i === current));
      }

      if (current < totalPages - 2) pagination.appendChild(createButton("...", null, false, true));
      pagination.appendChild(createButton(totalPages, totalPages, current === totalPages));
    }

    pagination.appendChild(createButton(">", currentPage + 1, false, currentPage === totalPages));
  }



  /*###################*/
  /*### Categorias ####*/
  /*###################*/

  // Novidades
  window.filterNews = function() {
    products = originalProducts.filter(product => product.querySelector('.product-new'));
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  // Suplementos
  window.filterSup = function() {
    products = originalProducts.filter(product => {
      const imgSrc = product.querySelector('.product-background').src;
      return imgSrc.includes('img/Supplement/');
    });
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  // Snacks
  window.filterSnack = function() {
    products = originalProducts.filter(product => {
      const imgSrc = product.querySelector('.product-background').src;
      return imgSrc.includes('img/Snacks/');
    });
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  // Refeições
  window.filterRef = function() {
    products = originalProducts.filter(product => {
      const imgSrc = product.querySelector('.product-background').src;
      return imgSrc.includes('img/Meals/');
    });
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  // Equipamentos
  window.filterEquip = function() {
    products = originalProducts.filter(product => {
      const imgSrc = product.querySelector('.product-background').src;
      return imgSrc.includes('img/Gym/');
    });
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  // Limpar Filtro
  window.clearFilter = function() {
    products = [...originalProducts];
    totalPages = Math.ceil(products.length / itemsPerPage);
    currentPage = 1;
    renderPage(currentPage);
  }

  /*###############*/
  /*### Preços ####*/
  /*###############*/

  // Crescente
  window.filterByPriceCres = function() {
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('€', '').replace(',', '.'));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('€', '').replace(',', '.'));
        return priceA - priceB;
    });
    currentPage = 1;
    renderPage(currentPage);
  }

  // Decrescente
  window.filterByPriceDecres = function() {
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('€', '').replace(',', '.'));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('€', '').replace(',', '.'));
        return priceB - priceA;
    });
    currentPage = 1;
    renderPage(currentPage);
  }

  renderPage(currentPage)
});







