async function upvoteClickHandler(event) {
    event.preventDefault();

    const response = await fetch('/api/correlations/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: 1,
            post_correlation_id: 1
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
    console.log(i);
    console.log(correlationsDiv.children[i].id);
    document.getElementById(correlationsDiv.children[i].id + '-btn').addEventListener('click', upvoteClickHandler);
}

