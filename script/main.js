// Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
// Open Cart

let isCartOpen = false
cartIcon.onclick = () => {
    cart.classList.add('active')
    isCartOpen = true
};
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active')
    isCartOpen = false
};

//Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Making Function
function ready() {
    //Remove Items From Cart
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    //Add To Cart
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}


function buyButtonClicked() {
    alert(`Siap dikirim ke alamat, bayar total harga ${document.querySelector('.total-price').innerHTML}. Bayarnya COD doang ya untuk sementara :D`)
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
    window.location.href = "./bye.html";
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal()
}

//Remove Items From Cart
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal()
}

//Quantity Changes
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}

//Add to cart
function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText
    let price = shopProducts.getElementsByClassName('price')[0].innerText
    let calories = shopProducts.getElementsByClassName('calories')[0].innerText
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    // console.log(title, price, productImg);
    addProductToCart(title, price, productImg, calories)
    updatetotal()
    console.log(isCartOpen)
    if (!isCartOpen) {
        cart.classList.add('active')
        isCartOpen = true
    }
}

function addProductToCart(title, price, productImg, calories) {
    let cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0]
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('Pilih Yang Lain, Ini Udah,Katanya Mau Kurus')
            return

        }
    }
    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price"> ${price}</div>
                            <span class="calories">${calories}</span>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash cart-remove'></i>`
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}


//Update Total
function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;
    let tocal=0
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let caloriesElement = cartBox.getElementsByClassName('calories')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ""))
        let calories = parseFloat(caloriesElement.innerText.replace('', ""))
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        tocal=tocal+(calories*quantity)
        //if price Contain some Cents Value
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    document.getElementsByClassName('total-calories')[0].innerText = tocal+'cal';
    document.getElementsByClassName('total-price')[0].style['font-size'] = '1.5rem'
    document.getElementsByClassName('total-calories')[0].style['font-size'] = '1.5rem' 
}
