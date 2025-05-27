// 
document.addEventListener('DOMContentLoaded', () => {
    const addBasketButtons = document.querySelectorAll('.product-add-basket button');

    addBasketButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalIcon = button.querySelector('i');
            const originalIconClass = originalIcon.className;

            // Change icon to 'cart-check-fill'
            originalIcon.className = 'bi bi-cart-check-fill';
            
            // Optional: Add a class for CSS animation (e.g., a subtle shake or bounce)
            button.classList.add('added-to-cart-animation');

            setTimeout(() => {
                // Revert icon to original
                originalIcon.className = originalIconClass;
                // Remove animation class
                button.classList.remove('added-to-cart-animation');
            }, 1000); // Icon changes for 1 second
        });
    });
});

// Script para paginação dos produtos
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("product-container");
  const products = Array.from(container.querySelectorAll(".product-card"));
  const pagination = document.getElementById("pagination");
  const itemsPerPage = 12;
  let currentPage = 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    products.forEach((product, index) => {
      product.style.display = index >= start && index < end ? "flex" : "none";
    });

    renderPagination(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Volta para o topo da página
  }

  function renderPagination(current) {
    pagination.innerHTML = ""; // Limpa a paginação

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

    // Botão "Anterior"
    pagination.appendChild(createButton("<", currentPage - 1, false, currentPage === 1));

    // Lógica dos botões de página
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

    // Botão "Próximo"
    pagination.appendChild(createButton(">", currentPage + 1, false, currentPage === totalPages));
  }

  // Renderiza a primeira página ao carregar
  renderPage(currentPage);
});