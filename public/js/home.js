$(document).ready(() => {
    $.get("/api/posts", { followingOnly: true }, results => {
        outputPosts(results, $(".postsContainer"));
       
    })
    $(".loadingSpinnerContainer").remove();
    $(".chatContainer").css("visibility", "visible");
})
//home page 1