$(document).ready(function() {
  // Cart functionality
  let cart = [];

  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
    updateCartCounter();
    renderCartItems();
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
  }

  // Update cart counter display
  function updateCartCounter() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    $('.cart').attr('data-count', cartCount);

    // Update the content of the ::after pseudo-element
    if (cartCount > 0) {
      $('.cart').attr('data-count', cartCount);
    } else {
      $('.cart').attr('data-count', '0');
    }
  }

  // Calculate total price
  function calculateTotal() {
    return cart.reduce((total, item) => {
      // Extract the numeric part from the price string (e.g., "12 000 uah" -> 12000)
      const priceStr = item.price.replace(/[^\d\s]/g, '').trim();
      const price = parseFloat(priceStr.replace(/\s+/g, ''));
      return total + (price * item.quantity);
    }, 0);
  }

  // Render cart items in the modal
  function renderCartItems() {
    const $cartItems = $('#cartItems');
    $cartItems.empty();

    if (cart.length === 0) {
      $cartItems.html('<p class="empty-cart-message">Ваш кошик порожній</p>');
      $('#cartTotal').text('0 uah');
      return;
    }

    cart.forEach((item, index) => {
      const $cartItem = $(`
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99">
              <button class="quantity-btn increase">+</button>
            </div>
          </div>
          <button class="remove-item">&times;</button>
        </div>
      `);

      $cartItems.append($cartItem);
    });

    // Update total
    const total = calculateTotal();
    $('#cartTotal').text(total.toLocaleString() + ' uah');
  }

  // Add item to cart
  function addToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem =>
      cartItem.name === item.name
    );

    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    saveCart();
    renderCartItems();
  }

  // Remove item from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
  }

  // Update item quantity
  function updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    if (quantity > 99) quantity = 99;

    cart[index].quantity = quantity;
    saveCart();
    renderCartItems();
  }

  // Clear cart
  function clearCart() {
    cart = [];
    saveCart();
    renderCartItems();
  }

  // Add to cart button click handler
  $(document).on('click', '.recomendation__button', function() {
    const $card = $(this).closest('.cat-card, .recomendation__item, .product-detail-container');

    let name, price, image;

    if ($card.hasClass('product-detail-container')) {
      // Product modal
      name = $('#productName').text();
      price = $('#productPrice').text();
      image = $('#productImage').attr('src');
    } else {
      // Product card
      name = $card.find('.recomendation__name').text();
      price = $card.find('.recomendation__price').text();
      image = $card.find('img').attr('src');
    }

    addToCart({ name, price, image });

    // Visual feedback
    $(this).text('Додано!');
    setTimeout(() => {
      $(this).text('Додати у кошик');
    }, 1000);
  });

  // Cart icon click handler
  $('#cartIcon').on('click', function(e) {
    e.preventDefault();
    $('#cartModal').css('display', 'block');
  });

  // Close modal when clicking on X
  $(document).on('click', '.close', function() {
    $(this).closest('.modal').css('display', 'none');
  });

  // Close modal when clicking outside
  $(window).on('click', function(event) {
    if ($(event.target).hasClass('modal')) {
      $('.modal').css('display', 'none');
    }
  });

  // Quantity change handlers
  $(document).on('click', '.quantity-btn.decrease', function() {
    const $item = $(this).closest('.cart-item');
    const index = $item.data('index');
    const currentQuantity = cart[index].quantity;
    updateQuantity(index, currentQuantity - 1);
  });

  $(document).on('click', '.quantity-btn.increase', function() {
    const $item = $(this).closest('.cart-item');
    const index = $item.data('index');
    const currentQuantity = cart[index].quantity;
    updateQuantity(index, currentQuantity + 1);
  });

  $(document).on('change', '.quantity-input', function() {
    const $item = $(this).closest('.cart-item');
    const index = $item.data('index');
    const quantity = parseInt($(this).val(), 10);
    updateQuantity(index, quantity);
  });

  // Remove item handler
  $(document).on('click', '.remove-item', function() {
    const $item = $(this).closest('.cart-item');
    const index = $item.data('index');
    removeFromCart(index);
  });

  // Clear cart handler
  $('#clearCart').on('click', function() {
    clearCart();
  });

  // Checkout handler
  $('#checkout').on('click', function() {
    alert('Дякуємо за замовлення! Ваше замовлення прийнято до обробки.');
    clearCart();
    $('#cartModal').css('display', 'none');
  });

  // Mobile menu toggle
  $('.mobile-menu-toggle').on('click', function() {
    $('.nav-left, .nav-right').toggleClass('mobile-visible');

    // Change the toggle button text based on menu state
    if ($('.nav-left').hasClass('mobile-visible')) {
      $(this).html('✕'); // X symbol when menu is open
    } else {
      $(this).html('☰'); // Hamburger symbol when menu is closed
    }
  });

  // Check if we're on the products page
  if ($('.content').length > 0) {
    // Make sure all products are visible when page loads
    $('.cat-card').show();

    // Set "All products" as active by default
    $('.category-link[data-category="all"]').addClass('active');
  }

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800);
    }
  });

  // Initialize cart
  loadCart();
});
