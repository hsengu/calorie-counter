// Function to handle delete button when clicked
async function delBtnHandler(event) {
    event.preventDefault();

    const id = event.target.value;              // Get the clicked target's value (id)
    const form = $('#update-form')[0];
    const formData = new FormData(form);

    await fetch(`/api/post/${id}`, {            // Call API Endpoint to delete Post
        method: 'DELETE',
        body: formData
    }).then(response => {
        if(response.ok) {
            document.location.reload();         // Reload the page after deletion succeeds
        } else {
            alert(response.statusText);
        }
    });
};

// Function to handle update button
async function updateBtnHandler(event) {
    event.preventDefault();
    const id = event.target.value;              // Get the clicked target's value (id)

    await fetch(`/api/post/${id}`, {            // Fetch the Post information
        method: 'GET'
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        else
            console.log(response.statusText);
    }).then(data => {
        $('#update-food')[0].value = data.foods;            // Update form with retrieved data
        $('#update-calories')[0].value = data.calories;
        $('#update-post-btn')[0].value = id;
        $('#delete-post-btn')[0].value = id
    });
};

// Function to handle save Post button
async function updatePostHandler(event) {
    event.preventDefault();
    const id = $('#update-post-btn')[0].value;          // Get the id of the updated post
    const form = $('#update-form')[0];                  // Get the updated form contents

    const formData = new FormData(form);                // Create a new multipart form data object

    await fetch(`/api/post/${id}`, {                    // Call API endpoint to update the post by id and passing formdata in th body
        method: 'PUT',
        body: formData
    }).then(response => {
        if(response.ok)
            document.location.replace('/tracking');     // Reload the page after update succeeds
        else
            console.log(response.statusText);
    });
};

document.querySelector('.btn-delete').addEventListener('click', delBtnHandler);
const updateBtns = document.querySelectorAll('.btn-update');
updateBtns.forEach(btn => btn.addEventListener('click', updateBtnHandler));
document.querySelector('#update-post-btn').addEventListener('click', updatePostHandler);