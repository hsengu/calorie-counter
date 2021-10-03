//fetch the route in users to allow the user to logout via the log out button
async function logout() {
    await fetch('/api/users/logout', {              // Call API endpoint to logout of a user
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