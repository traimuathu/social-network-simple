document.addEventListener('DOMContentLoaded', function() {
  const likeAction = document.getElementById('likeaction');
  const postId = document.getElementById('postid');
  const numberLikes = document.getElementById('numberLikes');
  
  likeAction.addEventListener('click', function(e) {
    e.preventDefault();
    axios({
      url: '/post/like',
      method: 'POST',
      data: {id: postId},
      responseType: 'json'
    }).then(response => {
        if(response.status != 200) {
          alert('Wrong error!');
        } else {
          numberLikes.textContent = parseInt(numberLikes.textContent) + 1;
        }
      })
      .catch(err => alert(err));
  });
}, false);
