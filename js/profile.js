$(document).ready(() => {
    $(".user-display").hide();
    $(".admin-display").hide();

    //Load current user object with id
    SDK.User.loadNav();

    SDK.User.loadCurrentUser((err, data) => {
        let currentUser = JSON.parse(data);
        if (currentUser.type === 1) {
            $(".admin-display").show();
        } else if (currentUser.type === 2) {
            $(".user-display").show();
        }

    });


    const currentUser = SDK.User.currentUser();
    const userId = currentUser.userId;


    //Display username
    $(".profile-header").html(`<h2>${"Brugernavn: "+currentUser.username}</h2>`);

});

