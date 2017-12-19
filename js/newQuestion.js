$(document).ready(() => {

    SDK.User.loadNav();


    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "testAdmin.html";
    });

    $("#addQuestion-button").click(() => {
        console.log("clicked");
        const question = $("#question").val();
        const quizId = SDK.Storage.persist("myQuizId");

        $("#questionsContainer").append(
            "<br>Question</label><br>" +
            "<input type='text'class='form-control' name='question' placeholder='question title'>"+
            "<br>Answers</br>"+
            "<input type='text' class='form-control' name='question1' trueQuestion='true' placeholder='correct answer'>" +
            "<input type='text' class='form-control' name='question2'>" +
            "<input type='text' class='form-control' name='question3'>" +
            "<input type='text' class='form-control' name='question4'><br>"



    SDK.question.createQuestion(question, quizId, (err, data)=> {
        console.log("Virker det ?");

        const questionId = this.id;
        const myId = parseInt(questionId);
        console.log(myId);
        SDK.Storage.persist("myQuestion",myId);

        var createQuestion = JSON.parse(data);

        window.location.href="newQuestion.html"


    });
    })

    });

