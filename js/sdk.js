const SDK = {
  serverURL: "http://localhost:8080/api",
  request: (options, callback) => {

    let headers = {};
    if (options.headers) {
      Object.keys(options.headers).forEach((h) => {
        headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
      });
    }

    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      headers: headers,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(options.data),
      success: (data, status, xhr) => {
        callback(null, data, status, xhr);
      },
      error: (xhr, status, errorThrown) => {
          callback({xhr: xhr, status: status, error: errorThrown});
      }
    });

  },

    User: {
        signUp: (username, password, callback) => {
            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url: "/user/signup",
                method: "POST"
            }, (err, data) => {
                if (err) return callback(err);
                callback(null, data);
            });
        },

        loadCurrentUser: (callback) => {
            SDK.request({
                method: "GET",
                url: "/user/myuser",
                headers: {
                    authorization: SDK.Storage.load("token"),
                },
            }, (err, user) => {
                if (err) return callback(err);
                SDK.Storage.persist("myUser", user);
                callback(null, user);
            });

        },

        currentUser: () => {
            const loadedUser = SDK.Storage.load("myUser");
            return loadedUser.currentUser;
        },

        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "index.html";
        },

      login: (username, password, callback) => {
        SDK.request({
          data: {
            username: username,
            password: password
          },
          url: "/user/login",
          method: "POST"
        }, (err, data) => {

          //On login-error
          if (err) return callback(err);

          //localStorage.setItem("token", data);
          SDK.Storage.persist("token", data);
          //SDK.Storage.persist("userId", data.userId);
          //SDK.Storage.persist("user", data.user);

            callback(null, data);

        });
      },


      loadNav: (callback) => {
        $("#nav-container").load("nav.html", () => {
                    SDK.User.loadCurrentUser((err, data) => {
                        let currentUser = JSON.parse(data);
                        console.log(2, currentUser);
                        if (currentUser.type === 2) {
            $(".navbar-right").html(`
              <li><a href="course.html">Your Courses</a></li>
              <li><a href="#" id="logout-link" onclick="SDK.User.logOut()">Logout</a></li>
            `);
          } else if (currentUser.type === 1){
            $(".navbar-right").html(`
              <li><a href="make-quiz.html">Make Quiz</a></li>
             <li><a href="#" id="logout-link" onclick="SDK.User.logOut()">Logout</a></li>
            `);
          }
                        else {
                            $(".navbar-right").html(`
              <li><a href="signup.html" onclick="SDK.User.signUp()">Opret bruger<span class="sr-only">(current)</span></a></li>
              <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
            `);
                        }
          $("#logout-link").click(() => SDK.User.logOut());
            callback && callback();
                    })

        });
      }
    },

  Course: {
      loadCourses: (callback) => {
          SDK.request({
              method: "GET",
              url: "/course",
              headers: {authorization: SDK.Storage.load("token"),
              },
          }, (err, data) => {
              if (err) return callback(err);

              callback(null, data);
          });
      },

  },

    quiz: {
        createQuiz: (questionCount, quizTitle, courseId, callback) => {
            SDK.request({
                data: {
                    questionCount: questionCount,
                    quizTitle: quizTitle,
                    courseId: courseId
                },
                url: "/quiz",
                method: "POST",
                headers: {
                    authorization: SDK.Storage.load("token"),
                }
            }, (err, data) => {
                if (err) return callback(err);

                callback(null, data);
            })
        },
          loadQuizzes: (callback) => {
            const courseId = SDK.Storage.load("myCourseId");
          SDK.request({
              method: "GET",
              url: "/quiz/" + courseId,
              headers: {authorization: SDK.Storage.load("token"),
              },
          }, (err, data) => {
              if(err) return callback(err);
              callback(null, data);
              console.log(data);
          });
      },

        deleteQuiz: (callback) => {
            const chosenQuiz = SDK.Storage.load("chosenQuiz")
            const quizId = chosenQuiz.quizId;
            SDK.request({
                method: "DELETE",
                url: "/quiz/" + quizId,
                headers: {
                    authorization: SDK.Storage.load("token")
                },
            }, (err, data) => {
                if (err) return callback(err);
                callback(null, data)
            });

        },

    },
    question: {
        createQuestion: (question, questionToQuizId, callback) => {
            SDK.request({
                data: {
                    question: question,
                    questionToQuizId: questionToQuizId
                },
                url: "/question",
                method: "POST",
                headers: {
                    authorization: SDK.Storage.load("token"),
                }
            }, (err, data) => {
                if (err) return callback(err);

                callback(null, data);
            })
        },

        loadQuestions: (callback) => {
            const chosenQuiz = SDK.Storage.load("chosenQuiz");
            const quizId = chosenQuiz.quizId;
            SDK.request({
                method: "GET",
                url: "/question/" + quizId,
                headers: {
                    authorization: SDK.Storage.load("token")
                },
            }, (err, question) => {
                if (err) return callback(err);
                callback(null, question)
            });
        },
    },
    option:{
        createOption: (option, optionToQuestionId, isCorrect, callback) => {
            SDK.request({
                data: {
                    option: option,
                    optionToQuestionId: optionToQuestionId,
                    isCorrect: isCorrect
                },
                url: "/option",
                method: "POST",
                headers: {
                    authorization: SDK.Storage.load("Token"),
                }
            }, (err, data) => {
                if (err) return callback(err);
                callback(null, data);
            })
        },

        loadOptions: (questionId, cb) => {
            SDK.request({
                method: "GET",
                url: "/option/" + questionId,
                headers: {
                    authorization: SDK.Storage.load("Token")
                },
            }, (err, options) => {
                if (err) return cb(err);
                cb(null, options)
            });
        },
},

  Storage: {
    prefix: "DøkExamQuizSDK",
    persist: (key, value) => {
      window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: (key) => {
      const val = window.localStorage.getItem(SDK.Storage.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e) {
        return val;
      }
    },
    remove: (key) => {
      window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
  }
};