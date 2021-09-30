async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
// allow a user to log in validating their information using the log in route

    if (username && password) {
        await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if(response.ok) {
                document.location.replace('/tracking');
            }
            else {
                alert(`${response.statusText}: These credentials are not valid. Please try again or register for an account.`);
            }
        });
    }
}

function alert(message) {
    var alertEl = $('.alert');
    var alertMsg = $('.alert-message');

    alertMsg.text(message);
    alertEl.addClass('show');
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);