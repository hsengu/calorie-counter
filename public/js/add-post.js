// Function to focus the modal form fields when modal is opened
function addBtnHandler(event) {
    event.preventDefault();
    $('#add-post-modal').on('shown.bs.modal', function () {
        $('#post-title').trigger('focus')
    });
};

// Function to handle formdata when submit button is clicked
async function newFormHandler(event) {
    event.preventDefault();

    const form = $('#post-form')[0];            // Gets form
    const formData = new FormData(form);        // Converts form into formdata

    await fetch('/api/post', {          // Calls API endpoint to create a new Post with multipart formdata
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
        if (response.ok) {
            document.location.replace('/tracking');
        } else {
            alert(response.statusText);
        }
    });
};

document.querySelector('#publish-btn').addEventListener('click', newFormHandler);
document.querySelector('.add-post-btn-form').addEventListener('click', addBtnHandler);