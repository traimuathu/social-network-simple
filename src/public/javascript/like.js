document.addEventListener('DOMContentLoaded', function() {
  const likeAction = document.getElementById('likeaction');
  const postId = document.getElementById('postid');
  const numberLikes = document.getElementById('numberLikes');
  
  likeAction.addEventListener('click', function(e) {
    // console.log(e.target.parentElement.querySelector('#numberLikes').textContent);
    axios({
      url: '/post/like',
      method: 'POST',
      data: {id: postId},
      responseType: 'json'
    }).then(response => {
        if(response.status != 200) {
          alert('Wrong error!');
        } else {
          e.target.parentElement.querySelector('#numberLikes').textContent = parseInt(e.target.parentElement.querySelector('#numberLikes').textContent) + 1;
        }
      })
      .catch(err => alert(err));
  });
}, false);

