async function signupFormHandler(event) {
    event.preventDefault();

    // Get form values for registration form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const startweight = document.querySelector('#start-weight').value.trim();
    const goalweight = document.querySelector('#goal-weight').value.trim();
    const caloriegoal = document.querySelector('#calorie-goal').value.trim();
    // fetch the route in user to create a new user via submit form 
    if (username && password && startweight && goalweight && caloriegoal) {     // If all fields are filled out
        await fetch('/api/users', {                 // Call API endpoint to create a new user
            method: 'post',                  
            body: JSON.stringify({
                username,
                password,
                startweight,
                goalweight,
                caloriegoal
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(`${response.statusText}: This username already exists.`);             // Display an alert if creation of a user fails
            }
        });
    }
}

// Helper function to display alert by passing it a message
function alert(message) {
    var alertEl = $('.alert');                  // Select alert element.
    var alertMsg = $('.alert-message');         // Select alets element's message element

    alertMsg.text(message);                     // Update the message
    alertEl.addClass('show');                   // Show alert
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);