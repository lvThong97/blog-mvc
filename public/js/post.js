const submitCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector(".comment-input").value.trim();
    const author_id = document.querySelector(".logged-in-user-id").innerHTML; //need id of logged in user
    const post_id = document.querySelector(".current-post-id").innerHTML;

    if (!author_id) {
        document.location.replace("/login");
    } else {
        if (comment) {
            const response = await fetch("/api/comment/", {
                method: "POST",
                body: JSON.stringify({ comment, author_id, post_id }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                document.location.replace(
                    "/post/" + post_id + "#comment-section"
                );
                document.location.reload();
            } else {
                alert(
                    "Failed to submit comment. " +
                        response.status +
                        ": " +
                        response.statusText
                );
            }
        } else {
            alert("Please fill out all fields.");
        }
    }
};

const deleteCommentHandler = async (event) => {
    event.preventDefault();

    const deleteCommentId = event.target.getAttribute("data-id");
    const currentPostId = document.querySelector(".current-post-id").innerHTML;
    console.log(2);
    
    if (deleteCommentId) {
        const response = await fetch("/api/comment/" + deleteCommentId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace(
                "/post/" + currentPostId + "#comment-section"
            );
            document.location.reload();
        } else {
            alert(
                "Failed to delete post. " +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    }
   
};

document
    .querySelector(".comment-submit")
    .addEventListener("click", submitCommentHandler);

const deleteLinks = document.querySelectorAll(".delete-comment");
deleteLinks.forEach((el) =>
    el.addEventListener("click", (event) => deleteCommentHandler(event))
);
