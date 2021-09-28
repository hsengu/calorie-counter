async function loginFormHandler(event) {
    event.preventDefault();
    console.log('clicked');

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    console.log(`${username} ${password}`)

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if(response.ok)
                document.location.replace('/tracking');
            else {
                alert.response.statusText;
            }
        });
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);