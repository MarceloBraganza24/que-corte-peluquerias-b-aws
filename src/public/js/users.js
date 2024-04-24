const updateUser = (uid) => {
    const roleUser = document.getElementById('roleUser' + uid).value;
    fetch(`https://ecommercebackend-production-26fb.up.railway.app/api/users?uid=${uid}&&role=${roleUser}`, {
        method: 'PUT'
    }).then(setTimeout(function(){window.location.reload()}, 1000))
}

const deleteUser = (id) => {
    fetch(`https://ecommercebackend-production-26fb.up.railway.app/api/users/delete-one/${id}`, {
        method: 'DELETE'
    }).then(window.location.reload())
}