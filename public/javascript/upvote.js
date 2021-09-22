async function upvoteClickHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch('/api/correlations/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: post_id,
            correlated_post_id: event.target.id.split('-')[1]
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

const correlationsDiv = document.getElementById('correlations-div');
for (let i = 0; i < correlationsDiv.children.length; i++) {
    document.getElementById(correlationsDiv.children[i].id + '-btn').addEventListener('click', upvoteClickHandler);
}

