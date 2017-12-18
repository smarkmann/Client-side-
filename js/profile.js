$(document).ready(() => {

    //Load current user object with id
    SDK.User.loadNav();


    const currentUser = SDK.User.currentUser();
    const userId = currentUser.userId;


    //Display username
    $(".page-header").html(`<h2>${currentUser.username}</h2>`);

});

