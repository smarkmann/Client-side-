$(document).ready(() => {

    SDK.User.loadNav();

    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "testAdmin.html";
    });

    $("#setTitle-button").click(() => {
       console.log("title button ");
        const quizTitle = $("#quizTitle").val();
        const courseId = SDK.Storage.load("myCourseId");
       // const createdBy = "Hej";
        // const questionCount = 10;
       // const quizDescription = "beskrivelse"

        SDK.quiz.createQuiz(quizTitle, courseId, (err, data)=>{
            console.log("hej");



            const quizId = this.id;
            const myId = parseInt(quizId);
            console.log(myId);
            SDK.Storage.persist("myQuizId",myId);

            var createQuiz = JSON.parse(data);

            window.location.href="newQuestion.html"

            });

        })

        });



