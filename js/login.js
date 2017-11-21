$(document).ready(() => {
    SDK.User.loadNav();

    $("#login-button").click(() => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();


        if (!username || !password) {
            window.alert("Username or password has not been typed. Please try again");
        } else {
            SDK.User.login(username, password, (err, data) => {
                if (err && err.xhr.status === 401) {
                    window.alert("Wrong username or password");
                }
                else if (err) {
                    console.log("Error");
                    window.alert("Unknown Error");
                } else if (SDK.Storage.load("token") === null) {
                    window.alert("This user does not exist");
                }
                else {
                    SDK.User.loadCurrentUser((err, data) => {
                        if (err && err.xhr.status === 401) {
                            window.alert("Wrong username or password");
                        } else {
                            console.log(data)
                            if (SDK.User.currentUser().type === 1) {
                                window.location.href = "course.html";
                            } else if (SDK.User.currentUser().type === 2) {
                                window.location.href = "index.html";
                            }
                        }
                    });
                }
            });
        }
    });
});