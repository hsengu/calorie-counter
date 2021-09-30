async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const startweight = document.querySelector('#start-weight').value.trim();
    const goalweight = document.querySelector('#goal-weight').value.trim();
    const caloriegoal = document.querySelector('#calorie-goal').value.trim();
    // fetch the route in user to create a new user via submit form 
    if (username && password && startweight && goalweight && caloriegoal) {
        await fetch('/api/users', {
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
                console.log("DO THIS");
                document.location.replace('/');
            } else {
                alert(`${response.statusText}: This username already exists.`);
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

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);