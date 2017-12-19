$(document).ready(() => {

    SDK.User.loadNav();

    SDK.quiz.loadQuizzes((err, myQuizzes) => {
        if (err) throw err;
        var quizzes = JSON.parse(myQuizzes);
        console.log(quizzes);

        $("#tablehead").append("<thead>\n" +
            "<th>Quiz Titel</th>\n" +
            "<th><button class=\"quizCreateBtn btn-primary btn-lg\" >Create quiz</button></th>\n" +
            "</thead>");

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td width="80%">' + quizzes[i].quizTitle + '</td>';
            tr += '<td width="20%">' + '<button class="quizDeleteBtn btn-primary btn-lg" data-key="' + (i+1) + '">Delete quiz</button>' +'</td>';
            tr += '</tr>';
            i + 1;

            $("#quizList").append(tr);
        });

        $(".quizCreateBtn").click(function () {
            console.log(this.id);
            window.location.href = "newQuiz.html";

        });

        $('.quizDeleteBtn').on('click', function () {
            if (window.confirm("Do you want to delete this quiz?")) {

                var title = $(this).closest("tr").find("td:eq(0)").text();

                for (var i = 0; i < quizzes.length; i++) {
                    if (title === quizzes[i].quizTitle) {

                        SDK.Storage.persist("quizId", quizzes[i]);
                    }
                }

                SDK.quiz.deleteQuiz((err, data) => {});
                location.reload();
            }
        });

    });

});