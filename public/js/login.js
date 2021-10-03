async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
// allow a user to log in validating their information using the log in route

    if (username && password) {
        await fetch('/api/users/login', {           // Call API endpoint for logging in
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
                alert(`${response.statusText}: These credentials are not valid. Please try again or register for an account.`);     // Display alert if an error occurs
            }
        });
    }
}

// Helper function to display alert and message
function alert(message) {
    var alertEl = $('.alert');              // Select alert element
    var alertMsg = $('.alert-message');     // Select alert element's message element

    alertMsg.text(message);             // Update message
    alertEl.addClass('show');           // Show alert
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);