async function newFormHandler(event) {
  event.preventDefault();

  const correlation_title = document.querySelector(
    'input[name="correlation-title"]'
  ).value;
  const image_path = document.querySelector(
    'input[name="correlated-post-url"]'
  ).value;
  // const post_id = window.location.toString().split("/")[
  //   window.location.toString().split("/").length - 1
  // ];
  // const post_id = window.location.toString().length;
  // console.log(post_id);

  const response = await fetch(`/api/posts/addCorrelation`, {
    method: "POST",
    body: JSON.stringify({
      // correlated_post_url: image_path,
      // post_id: post_id,
      correlation_title,
      image_path,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-correlation-form")
  .addEventListener("submit", newFormHandler);
