$(document).ready(() => {

    SDK.User.loadNav();

    $("#cancel-button").click(() => {
        console.log("clicked");
        window.location.href = "index.html";
    });

    $("#setTitle-button").click(() => {
        console.log("title button clicked");
        const quizTitle = $("#quizTitle").val();
        const courseId = SDK.Storage.load("myCourseId");

        SDK.quiz.createQuiz(quizTitle, courseId,(err, data)=>{
            var createQuiz = JSON.parse(data);
            $("#quizTitle").val('');



            $("#setTitle-button").click(function () {
                console.log("title button clicked");
                const quizTitle = $("#quizTitle").val();
                const quizId = this.id;


                const myId = parseInt(quizId);
                console.log(myId);
                SDK.Storage.persist("myQuizId",myId);
                window.location.href="newQuestion.html"





            });

        })

        });
    });


