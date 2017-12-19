$(document).ready(() => {

    SDK.User.loadNav();



    SDK.quiz.loadQuizzes((err, data) => {
        if (err) throw err;
        const quizzes = JSON.parse(data);
        console.log(quizzes);

        $("#tablehead").append("<thead>\n" +
            "<th>Quiz Titel</th>\n" +

            "</thead>")

        $.each(quizzes, function (i, val) {
            var tr = '<tr>';
            tr += '<td width="80%">' + quizzes[i].quizTitle + '</td>';
            tr += '<td width="20%"><button class="btn btn-primary btn-lg" data-key="' + (i+1) + '">Take quiz</button></td>';
            tr += '</tr>';
            i + 1;
            $("#quizList").append(tr);
        });


    });
});