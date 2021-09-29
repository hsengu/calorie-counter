async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const startweight = document.querySelector('#start-weight').value.trim();
    const goalweight = document.querySelector('#goal-weight').value.trim();
    const caloriegoal = document.querySelector('#calorie-goal').value.trim();
// fetch the route in user to create a new user via submit form 
    if (username && password && startweight && goalweight && caloriegoal) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
                startweight,
                goalweight,
                caloriegoal
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);