$(document).ready(() => {

  if(selectedTab === "followers") {
      loadFollowers();
  }
  else {
      loadFollowing();
  }
});

function loadFollowers() {
  $.get(`/api/users/${profileUserId}/followers`, results => {
      outputUsers(results.followers, $(".resultsContainer"));
      $(".loadingSpinnerContainer").remove();
      $(".chatContainer").css("visibility", "visible");
  })
}

function loadFollowing() {
  $.get(`/api/users/${profileUserId}/following`, results => {
      outputUsers(results.following, $(".resultsContainer"));
      $(".loadingSpinnerContainer").remove();
      $(".chatContainer").css("visibility", "visible");
  })
}

