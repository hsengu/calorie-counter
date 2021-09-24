// async function addBtnHandler(event) {
//     event.preventDefault();
//     // $('#add-post-modal').on('shown.bs.modal', function () {
//     //     $('#post-title').trigger('focus')
//     // });
// };

// async function newFormHandler(event) {
//     event.preventDefault();

//     const user_id = document.querySelector('input[id="post-userid"]').value;
//     const title = document.querySelector('input[id="post-foods"]').value;
//     const post_text = document.querySelector('textarea[id="post-calories"]').value;

//     console.log(`${title} ${post_text}`)

//     const response = await fetch(`/api/posts`, {
//         method: 'POST',
//         body: JSON.stringify({
//             user_id,
//             title,
//             post_text
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (response.ok) {
//         //document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// }

document.querySelector('#publish-btn').addEventListener('click', newFormHandler);
document.querySelector('.add-post-btn-form').addEventListener('click', addBtnHandler);