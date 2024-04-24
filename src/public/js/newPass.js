const form = document.getElementById('newPassForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    fetch('https://ecommercebackend-production-26fb.up.railway.app/api/users/new-pass', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(window.location.replace('/login-view'))
});