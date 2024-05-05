document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.getElementById('checkout');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productImage = this.getAttribute('data-image');
            addToCart(productName, productImage);
            showNotification();
        });
    });

    checkoutButton.addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length > 0) {
            const productNames = cartItems.map(item => item.name).join('%0A');
            const whatsappMessage = `Hi, I would like to purchase the following products:%0A${productNames}`;
            const whatsappLink = `https://wa.me/+2349048938219/?text=${whatsappMessage}`;
            window.open(whatsappLink, '_blank');
        } else {
            alert('Your cart is empty. Please add some products before checking out.');
        }
    });

    function addToCart(productName, productImage) {
        let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
        cartItems.push({ name: productName, image: productImage });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showNotification() {
        const notification = document.getElementById('notification');
        notification.textContent = 'Successfully added to cart';
        notification.style.backgroundColor = 'green';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.textAlign = 'center';
        notification.style.position = 'fixed';
        notification.style.top = '0';
        notification.style.width = '100%';
        setTimeout(function() {
            notification.textContent = '';
        }, 2000); // Hide notification after 2 seconds
    }
});
