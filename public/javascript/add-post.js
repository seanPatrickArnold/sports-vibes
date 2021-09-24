async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;
    const post_type = document.querySelector('input[name="post-type"]').value;
    const typeObject = {};


    console.log(post_type);

    if (post_type === 'image') {
      typeObject.type_image = true;
      typeObject.type_audio = null;
    }
    else if (post_type === 'audio') {
      typeObject.type_image = null;
      typeObject.type_audio = true;
    }
    else {
      typeObject.type_image = null;
      typeObject.type_audio = null;
    }
    console.log(typeObject.type_image);
    const type_image = typeObject.type_image;
    const type_audio = typeObject.type_audio;

    console.log(type_image);
    console.log(type_audio);

  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url,
        type_image,
        type_audio
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);