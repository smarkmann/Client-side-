$(document).ready(() => {

    SDK.User.loadNav();

    $("#addQuestion-button").click(() => {
        $(".add-quiz").show();
        console.log("clicked");
        $("#questionsContainer").append(
            "<br>Question</label><br>" +
            "<input type='text' name='question' placeholder=>"+
            "<br>Answers</br>"+
            "<input type='text' name='question1' trueQuestion='true' placeholder='korrekt svar'>"+
            "<input type='text' name='question2'>"+
            "<input type='text' name='question3'>"+
            "<input type='text' name='question4'>"
        )
    });
    $("#cancel-button").click(() => {
        console.log("clicked")
    });

});







