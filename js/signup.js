$(document).ready(() => {

    console.log("WORKS");
  //  SDK.User.loadNav();
    console.log("WORKS2");


    $("#cancelButton").click(() => {
        window.location.href = "login.html"
    });

    $("#addUserButton").click(() => {

        const newUsername = $("#newUsername").val();
        const newPassword = $("#newPassword").val();
        const newPasswordVerifier = $("#newPasswordVerify").val();

        if(!newUsername || !newPassword || !newPasswordVerifier) {
            document.getElementById("emptyError").innerHTML = "Information missing";
        } else {
            if(newPassword.valueOf() === newPasswordVerifier.valueOf()) {
                SDK.User.signUp(newUsername, newPassword, (err, data) => {
                    if (err && err.xhr.status == 400) {
                        $(".form-group").addClass("Client fail");
                    }
                    else if (err) {
                        console.log("Error")
                    } else {
                        window.alert(newUsername + "\t" + "Sign up successful")
                        window.location.href = "login.html"

                    }
                });
            } else {
                $("#newPassword").val('');
                $("#newPasswordVerify").val('');
                document.getElementById("emptyError").innerHTML = "Password doesn't match";



            }

        }
    });
});