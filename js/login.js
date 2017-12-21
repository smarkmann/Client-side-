$(document).ready(() => {



    $("#cancelButton").click(() => {
        window.location.href = "index.html"
    });

    $("#login-button").click(() => {
        console.log("login clicked");

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
                            let currentUser = JSON.parse(data);

                            window.location.href = "profile.html";

                        }
                    });
                }
            });
        }
    });
});