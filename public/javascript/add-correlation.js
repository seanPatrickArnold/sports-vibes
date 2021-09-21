async function newFormHandler(event) {
    event.preventDefault();
  
    const url = document.querySelector('input[name="correlated-post-url"]').value;
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/addCorrelation`, {
      method: 'POST',
      body: JSON.stringify({
        correlated_post_url: url,
        post_id: post_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-correlation-form').addEventListener('submit', newFormHandler);