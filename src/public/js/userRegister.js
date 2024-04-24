const form = document.getElementById('userRegisterForm');

const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const age = document.getElementById('age');
const password = document.getElementById('password');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    fetch('https://ecommercebackend-production-26fb.up.railway.app/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        first_name.value = ''
        last_name.value = ''
        email.value = ''
        age.value = ''
        password.value = ''
        window.location.href = '/login-view';
    })
});