$(document).ready(() => {

    SDK.User.loadNav();

  //  $("#login-button").click(() => {

        const quizName = $("#inputQuizname").val();
        const kode = $("#inputPassword").val();

        SDK.User.login(username, kode, (err, data) => {
            console.log(err, data);
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Bad stuff happened")
            } else {
                window.location.href = "course.html";
            }
        });

    });

});