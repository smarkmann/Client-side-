$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.currentUser();

    SDK.Course.loadCourses((err, myCourses) => {
        console.log(err, courses);
        var courses = JSON.parse(myCourses);
        courses.forEach((course) =>  {
           $("#courseContainer").append('<button class="btn btn-primary btn-lg" id='+course.courseId+'>'+course.courseTitle+'</button>');
           console.log(course.courseId);
        });
        console.log(courses);

        $(".btn").click(function () {
            console.log(this.id)
            const courseId = this.id;
            const myId = parseInt(courseId);
            console.log(myId);
          //  courses.forEach((course) => {
            SDK.Storage.persist("myCourseId",myId)
            {
                SDK.User.loadCurrentUser((err, data) => {
                    if (err && err.xhr.status === 401) {
                        window.alert("Wrong username or password");
                    } else {
                        let currentUser = JSON.parse(data);
                        if (currentUser.type === 2) {
                            window.location.href = "testUser.html";
                        } else if (currentUser.type === 1) {
                            window.location.href = "test.html";
                        }
                    }
                });
            }
              // if(myId === course.courseId) {
                  // SDK.quiz.loadQuizzes(courseId, (data, err) => {
                   });
            //   }
          //  });
        });

    });
