document.addEventListener('DOMContentLoaded', function() {
  const likeAction = document.getElementById('likeaction');
  const postId = document.getElementById('post_id');
  const id = postId.value;

  likeAction.addEventListener('click', function(e) {
    const obj = {
      id: id
    }

    fetch('/post/like', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Successfull: ', response))
    .catch(err => console.error('Error: ', err));
    
  });
}, false);

