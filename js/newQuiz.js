$(document).ready(() => {

    SDK.User.loadNav();

    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "courseQuizAdmin.html";
    });

    $("#setTitle-button").click(() => {
        console.log("title button ");
        const quizTitle = $("#quizTitle").val();
        const courseId = SDK.Storage.load("myCourseId");
        // const createdBy = "Hej";
        // const questionCount = 10;
        // const quizDescription = "beskrivelse"

        SDK.quiz.createQuiz(quizTitle,courseId, (err, data)=> {
            var newQuiz = JSON.parse(data);

            const quizId = newQuiz.quizId;

            SDK.Storage.persist("myQuizId", quizId);

            window.location.href="newQuestion.html"

            });

    })

});



