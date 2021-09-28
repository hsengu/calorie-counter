async function addBtnHandler(event) {
    event.preventDefault();
    $('#add-post-modal').on('shown.bs.modal', function () {
        $('#post-title').trigger('focus')
    });
};

async function newFormHandler(event) {
    event.preventDefault();

    const form = $('#post-form')[0];
    const formData = new FormData(form);

    await fetch('/api/post', {
        method: 'POST',
        body: formData
    }).then(response => {
        if(response.ok) {
            document.location.replace('/tracking');
        } else {
            alert(response.statusText);
        }
    });
};

async function delBtnHandler(event) {
    event.preventDefault();

    const id = event.target.value;
    const form = $('#update-form')[0];
    const formData = new FormData(form);

    await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: formData
    }).then(response => {
        if(response.ok) {
            document.location.replace('/tracking');
        } else {
            alert(response.statusText);
        }
    });
};

async function updateBtnHandler(event) {
    event.preventDefault();
    const id = event.target.value;

    await fetch(`/api/post/${id}`, {
        method: 'GET'
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        else
            console.log(resonse.statusText);
    }).then(data => {
        console.log(data);
        $('#update-food')[0].value = data.foods;
        $('#update-calories')[0].value = data.calories;
        $('#update-post-btn')[0].value = id;
    });
};

async function updatePostHandler(event) {
    event.preventDefault();
    const id = $('#update-post-btn')[0].value;
    const form = $('#update-form')[0];

    console.log(form);
    const formData = new FormData(form);

    await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: formData
    }).then(response => {
        if(response.ok)
            document.location.replace('/tracking');
        else
            console.log(response.statusText);
    });
};

document.querySelector('#publish-btn').addEventListener('click', newFormHandler);
document.querySelector('.add-post-btn-form').addEventListener('click', addBtnHandler);
document.querySelector('.btn-delete').addEventListener('click', delBtnHandler);
document.querySelector('.btn-update').addEventListener('click', updateBtnHandler);
document.querySelector('#update-post-btn').addEventListener('click', updatePostHandler);