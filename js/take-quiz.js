$(document).ready(() => {
    SDK.User.loadNav();

    const chosenQuiz = SDK.Storage.load("chosenQuiz");

    var i = 0;

    SDK.quiz.startQuiz((err, question)=> {
        var $table =$(".table");
        if (err) throw err;
        var questions = JSON.parse(question)

        while (i < question.length){
            var question = (questions[i].question);
            //loads options to specific question
            loadOptions(question);

            function loadOptions(question) {
                //request to load options
                SDK.quiz.loadOptions(questionId, (err, option) => {
                    let options = JSON.parse(option);


                    $(".table").append(`<h2>${question}</h2>`);
                    var optionLength = options.length;
                    //loads all options
                    for (var k = 0; k < optionLength; k++) {
                        //Use the option to find the questionId
                        let optionsToQId= options[k].optionToQuestionId;
                        //Use the questionId as a group unique group for radiobuttons, so grouping is possible
                        //For every question there will be added unique radiobuttons
                        $(".table").append(`<fieldset id="group${optionsToQId}"><p><input type="radio" name="group${optionsToQId}" class="answer-radio" value="${options[k].isCorrect}"> ${options[k].option} </p></fieldset>`);
                    }
                });

            }
            i++;
        }

        });
    });


// når man skal finde et ID = #
// Når man skal finde en klasse = .


