async function logout() {
    await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(reponse.statusTest);
        }
    });
}

document.querySelector('#logoutBtn').addEventListener('click', logout);