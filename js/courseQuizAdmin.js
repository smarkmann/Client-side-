$(document).ready(() => {

    SDK.User.loadNav();

    SDK.quiz.loadQuizzes((err, myQuizzes) => {
        if (err) throw err;
        var quizzes = JSON.parse(myQuizzes);
        console.log(quizzes);

        $("#tablehead").append("<thead>\n" +
            "<th>Quiz Titel</th>\n" +
            "<th><button class=\"quizCreateBtn btn-primary btn-lg\" >Create quiz</button></th>\n" +
            "</thead>")

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td width="80%">' + quizzes[i].quizTitle + '</td>';
            tr += '<td width="20%"><button class="quizDeleteBtn btn-primary btn-lg" data-key="' + (i+1) + '">Delete quiz</button></td>';
            tr += '</tr>';
            i + 1;
            $("#quizList").append(tr);
        });

        $(".quizCreateBtn").click(function () {
            console.log(this.id)
            window.location.href = "newQuiz.html";

        });



        });




    });
