var cartBtn = document.querySelector('.cart-icon')
var cart = document.querySelector('.cart')
var close = document.querySelector('.close')

//To show the cart

cartBtn.addEventListener('click',()=>{
    cart.classList.add('cart-active');
})

//To remove the cart

close.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
})

document.addEventListener('DOMContentLoaded',loadfood)

function loadfood(){
    loadcontent()
}


function loadcontent(){
    //remove item from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //product item change from cart
    let qtyElement = document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });

    //product cart
    var cartBtns = document.querySelectorAll('.add-cart')
    cartBtns.forEach((Btns)=>{
        Btns.addEventListener('click',addCart);
    });

    updateTotal();
}

//Remove item

function removeItem(){
    if(confirm('The item will be removed')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title !== title);
        this.parentElement.remove();
        loadcontent();
    }
}

//Change quantity 

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadcontent();
}

let itemList=[];

//Add cart
function addCart(){
    let food=this.parentElement;
    var title = food.querySelector('.food-title').textContent;
    var price = food.querySelector('.food-price').textContent;
    var image = food.querySelector('.food-img').src;
    // console.log(title,price,image)

    let newProduct={title,price,image}

    //Checking product in cart

    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product already added in cart")
        return;
    }
    else{
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title,price,image);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartbasket = document.querySelector('.cart-content');

    cartbasket.append(element);
    loadcontent();
}


function createCartProduct(title,price,image){
    return `
    <div class="cart-box">
    <img src="${image}" class="cart-img">
    <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="pricebox">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
    <i class="fa fa-trash cart-remove" aria-hidden="true"></i>
    </div>
    `;
}

function updateTotal(){
    let cartItems=document.querySelectorAll('.cart-box')
    let totalValue=document.querySelector('.total-price')

    let total = 0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price')
        let price = (priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
        
    })

    totalValue.innerHTML='Rs.'+total;
    

    //Add product count in cart Icon

    let cartcount = document.querySelector('.cart-count')
    let count = itemList.length;
    cartcount.innerHTML=count;

}