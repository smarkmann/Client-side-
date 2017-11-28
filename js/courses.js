$(document).ready(() => {
    $(".user-display").hide();
    $(".admin-display").hide();


    SDK.User.loadNav();
    const currentUser = SDK.User.currentUser();





    SDK.User.loadCurrentUser((err, data) => {
        let currentUser = JSON.parse(data);
        if (currentUser.type === 2) {
            $(".admin-display").show();
        } else if (currentUser.type === 1) {
            $(".user-display").show();
        }

    });



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
            SDK.Storage.persist("myCourseId",myId)
            {
                SDK.User.loadCurrentUser((err, data) => {
                    let currentUser = JSON.parse(data);
                        if (currentUser.type === 2) {
                            window.location.href = "testUser.html";
                        } else if (currentUser.type === 1) {
                            window.location.href = "test.html";
                        }

                });
            }

                   });

        });

    });
