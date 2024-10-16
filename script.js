const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal"); 
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

//ABRIR MODAL DO CARRINHO
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

//FECHAR MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
    let partenButton = event.target.closest(".add-to-cart-btn")

    if(partenButton) {
        const name = partenButton.getAttribute("data-name")
        const price = parseFloat(partenButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

//FUNCTION PARA ADICIONAR AO CARRINHO
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem) {
        //Se já existe o item coloca +1
        existingItem.quantity += 1;
    } else {  
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal();
}

//ATUALIZA O CARRINHO
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            </div>
        </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerText = cart.length;
}

//FUNÇÃO PARA REMOVER ITEM DO CARRINHO.
cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
    
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();

    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function() {
    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
})

//VERIFICAR SE ESTÁ ABERTO O ESTABELECIMENTO
function checkRestaurantOpen() {
 const data = new Date();
 const hora = data.getHours();
 if(hora >= 18 && hora < 22) {
    return true;
 } else {
    return false;
 }
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.add("bg-red-500");
}