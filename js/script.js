// Carrinho
document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector('.cart-icon');
    const cartMessage = document.getElementById('cart-message');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const cart = {};

    cartIcon.addEventListener('click', function (e) {
        e.preventDefault();
        cartMessage.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
        if (!cartMessage.contains(e.target) && !cartIcon.contains(e.target)) {
            cartMessage.classList.remove('show');
        }
    });

    const addButtons = document.querySelectorAll('.product-add-basket button');

    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const imgSrc = card.querySelector('img').src;

            // Usa chave única combinando nome + imagem
            const productKey = `${title}__${imgSrc}`;

            if (cart[productKey]) {
                cart[productKey].qty += 1;
            } else {
                cart[productKey] = {
                    name: title,
                    img: imgSrc,
                    qty: 1
                };
            }

            updateCartUI();
        });
    });

    function updateCartUI() {
      const confirmBtn = document.getElementById('confirm-cart-btn');
      cartItemsContainer.innerHTML = '';
      const entries = Object.entries(cart);

      if (entries.length === 0) {
          emptyMsg.style.display = 'block';
          confirmBtn.classList.add('hidden');
          return;
      }

      emptyMsg.style.display = 'none';

      entries.forEach(([key, data]) => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item');

          itemDiv.innerHTML = `
              <img src="${data.img}" alt="${data.name}">
              <div class="cart-item-details">
                  <div class="cart-item-top">
                      <span class="cart-item-name">${data.name}</span>
                  </div>
                  <div class="cart-item-bottom">
                      <div class="cart-item-qty">Quantidade: ${data.qty}</div>
                      <button class="remove-item" title="Remover"><i class="bi bi-trash3"></i></button>
                  </div>
              </div>
          `;

          itemDiv.querySelector('.remove-item').addEventListener('click', () => {
              delete cart[key];
              updateCartUI(); // <- isso vai atualizar tudo, inclusive o botão
          });

          cartItemsContainer.appendChild(itemDiv);
      });

      // Verifica se ainda há itens no carrinho para mostrar ou esconder o botão
      if (entries.length > 0) {
          confirmBtn.classList.remove('hidden');
      } else {
          confirmBtn.classList.add('hidden');
      }
  }


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