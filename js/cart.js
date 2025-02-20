document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    const closeButton = document.querySelector('.cart-popup-content .close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummaryTotal = document.querySelector('.cart-summary p');

    cartButton.addEventListener('click', function() {
        cartPopup.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        cartPopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == cartPopup) {
            cartPopup.style.display = 'none';
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            const productImage = productItem.querySelector('img').src;

            const existingCartItem = Array.from(cartItemsContainer.children).find(item => item.querySelector('.cart-item-details p').textContent === productName);

            if (existingCartItem) {
                const quantityElement = existingCartItem.querySelector('.cart-item-quantity');
                quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
            } else {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${productImage}" alt="${productName}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p>${productName}</p>
                        <p>${productPrice}</p>
                        <div class="cart-item-quantity-controls">
                            <button class="decrease-quantity">-</button>
                            <span class="cart-item-quantity">1</span>
                            <button class="increase-quantity">+</button>
                        </div>
                        <button class="delete-item">Delete</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);

                cartItem.querySelector('.increase-quantity').addEventListener('click', function() {
                    const quantityElement = cartItem.querySelector('.cart-item-quantity');
                    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
                    updateCartTotal();
                });

                cartItem.querySelector('.decrease-quantity').addEventListener('click', function() {
                    const quantityElement = cartItem.querySelector('.cart-item-quantity');
                    if (parseInt(quantityElement.textContent) > 1) {
                        quantityElement.textContent = parseInt(quantityElement.textContent) - 1;
                        updateCartTotal();
                    }
                });

                cartItem.querySelector('.delete-item').addEventListener('click', function() {
                    cartItem.remove();
                    updateCartTotal();
                });
            }

            updateCartTotal();
        });
    });

    function updateCartTotal() {
        let total = 0;
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-details p:nth-child(2)').textContent;
            const price = parseFloat(priceText.replace('£', ''));
            const quantity = parseInt(item.querySelector('.cart-item-quantity').textContent);
            total += price * quantity;
        });
        cartSummaryTotal.textContent = `Total: £${total.toFixed(2)}`;
    }
});
