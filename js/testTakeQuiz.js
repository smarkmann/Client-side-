$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.currentUser();

    $("#cancelButton").click(() => {
        window.location.href = "courseQuizUser.html"
    });


    SDK.User.loadCurrentUser((err, data) => {
        let currentUser = JSON.parse(data);


        SDK.quiz.loadQuestions((err, myQuestion) => {
            console.log(err, question);
            var questions = JSON.parse(myQuestion);
            questions.forEach((question) => {
                $("#takeQuizContainer").append('<button class="courseBtn btn-primary btn-lg" id=' + question.questionId + '></button>');
                console.log(question.questionId);
            });
            console.log(questions);

            $(".courseBtn").click(function () {
                console.log(this.id);
                const questionId = this.id;
                const myId = parseInt(questionId);
                console.log(myId);
                SDK.Storage.persist("questionId", myId);
                {
                    SDK.User.loadCurrentUser((err, data) => {
                        let currentUser = JSON.parse(data);


                    });
                }

            });

        });

    });
});
