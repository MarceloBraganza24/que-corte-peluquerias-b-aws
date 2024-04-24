const deleteCart = (uid) => {
    const emptyCartModal = document.getElementById('emptyCartModal');
    emptyCartModal.style.display = 'block';
    setTimeout(function(){
        emptyCartModal.style.display = 'none'
    }, 2000)
    const obj = {
        uid: uid,
    }
    fetch('https://ecommercebackend-production-26fb.up.railway.app/api/users/delete-cart-user', {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(setTimeout(function(){window.location.reload()}, 2000))
}

const finalizePurchase = () => {
    fetch('https://ecommercebackend-production-26fb.up.railway.app/api/users/finalize-purchase', {
        method: 'POST',
    }).then(() => {window.location.href = '/finalize-purchase-view'})
}

const backCatalogue = () => {
    window.location.href = '/products-view';
}

const backToShoppingCartUser = () => {
    window.location.href = '/shopping-cart-user-view';
}

const openValidateModal = () => {
    const validateCartModal = document.getElementById('validateCartModal');
    validateCartModal.style.display = 'block'
}