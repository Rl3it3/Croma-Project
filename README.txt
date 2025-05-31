## Croma | Loja Oficial

Este projeto, "Croma", é uma aplicação de loja online oficial para fins universitários.

### Tecnologias Utilizadas

**Frontend:**
* **HTML**: Estrutura das páginas web.
* **CSS**: Estilização das páginas web, incluindo uma abordagem de design responsivo.
* **JavaScript**: Scripts client side para elementos interativos, gestão do carrinho e tratamento da autenticação de utilizadores.
* **Google Fonts (Poppins)**: Fonte personalizada para uma estética moderna.
* **Bootstrap Icons**: Biblioteca de ícones para vários elementos da interface de utilizador.

**Backend / Autenticação / Base de Dados / Armazenamento:**
* **Firebase**:
    * **Firebase Authentication**: Utilizado para autenticação de utilizadores, incluindo email/palavra-passe e início de sessão com o Google.
    * **Firebase Analytics**: Para analisar o desenvolvimento e comportamento do utilizador.
    * O objeto `firebaseConfig` indica a utilização de `apiKey`, `authDomain`, `projectId`, `storageBucket` e `messagingSenderId`.

### Link para Acesso Web ou GIt

**Acesso Web:**
* https://cromaproject-3a10c.web.app/

**Acesso GIThub:**

* https://github.com/Rl3it3/Croma-Project

### Features Previstas vs. Features Efetivamente Implementadas

**Features Previstas (Assumidas com base nos ficheiros fornecidos):**
* **Página Principal (Homepage)**: Uma página de entrada principal para a loja.
* **Página de Listagem de Produtos**: Uma página dedicada para exibir vários produtos.
* **Filtragem e Ordenação de Produtos**: Capacidade de ordenar produtos por preço (crescente/decrescente) e filtrar por categoria (Novidades, Suplementos, Snacks, Refeições, Equipamentos).
* **Pesquisa de Produtos**: Uma barra de pesquisa para encontrar produtos específicos.
* **Autenticação de Utilizadores**:
    * Funcionalidade de Iniciar Sessão.
    * Funcionalidade de Criar Conta.
    * Funcionalidade de redefinição de palavra-passe.
    * Opção de Iniciar Sessão com o Google.
* **Carrinho de Compras**:
    * Adicionar produtos ao cesto.
    * Exibir itens no carrinho.
    * Mostrar o preço total do carrinho.
    * Remover itens do carrinho.
    * Confirmar o carrinho.
* **Melhorias na Interface do Utilizador**:
    * Exibição dinâmica do conteúdo do carrinho.
    * Alertas para adicionar/remover itens do carrinho.
    * Dropdown para opções de utilizador (Iniciar Sessão/Criar Conta) ao clicar no ícone do utilizador.

**Features Efetivamente Implementadas:**
* **Página Principal (index.html)**: Presente como o ponto de entrada principal porem necessita de ser acabada.
* **Página de Listagem de Produtos (Products.html)**: Totalmente implementada com cartões de produto.
* **Filtragem e Ordenação de Produtos**: Implementada com funções JavaScript (`filterByPriceCres()`, `filterByPriceDecres()`, `filterNews()`, etc.) e uma opção "Limpar Filtro".
* **Pesquisa de Produtos**: A barra de pesquisa está presente no cabeçalho de várias páginas, embora a sua lógica de pesquisa de backend não esteja implementada.
* **Autenticação de Utilizadores**:
    * **Iniciar Sessão (Login.html)**: Fornece início de sessão por email/palavra-passe e início de sessão com o Google.
    * **Criar Conta (Signup.html)**: Permite aos utilizadores criar contas com email/palavra-passe e registo com o Google.
    * **Redefinição de Palavra-Passe**: Uma função para `sendPasswordResetEmail` está disponível em `login.js`, indicando a implementar esta funcionalidade.
    * **Iniciar Sessão/Registar com o Google**: Ambos `login.js` e `signup.js` incluem `GoogleAuthProvider` e `signInWithPopup`.
* **Carrinho de Compras**:
    * **Adicionar ao Carrinho**: Funcionalidade para adicionar produtos da página `Products.html` ao carrinho.
    * **Exibição do Carrinho**: Um contentor `cart-message` mostra dinamicamente os itens adicionados, quantidades e o total.
    * **Remover do Carrinho**: Os utilizadores podem remover itens do carrinho.
    * **Confirmação do Carrinho**: Um botão "Confirmar Carrinho" está presente; a sua funcionalidade de backend completa para checkout não está acabada.
* **Melhorias na Interface do Utilizador**:
    * A exibição dinâmica do carrinho e os alertas (sucesso/remover) estão implementados.
    * O dropdown de opções de utilizador (Iniciar Sessão/Criar Conta) ao clicar no ícone do utilizador está implementado.