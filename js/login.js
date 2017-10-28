$(document).ready(() => {

  $("#login-button").click(() => {

    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    SDK.User.login(email, password, (err, data) => {
      console.log(err, data);
    });

  });

});