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



    Course: {
        findAll: (callback) => {
            SDK.request({
                method: "GET",
                url: "/course",
                headers: {authorization: SDK.Storage.load("tokenId"),
                },
            }, (err, user) => {
                if (err) return callback(err);

                callback(null, user);
            });
        },
        create: (data, callback) => {
            SDK.request({
                method: "POST",
                url: "/course",
                data: data,
                headers: {authorization: SDK.Storage.load("tokenId")}
            }, callback);
        }
    },


    loadCourses: (callback) => {
        SDK.request({

            method: "GET",
            url: "/user/myuser",
            headers: {
                authorization: SDK.Storage.load("tokenId"),
            },
        }, (err, user) => {
            console.log(err, data);
            if (err) return callback(err);
            SDK.Storage.persist("myUser", user);
            callback(null, user);
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
                  authorization: SDK.Storage.load("tokenId"),
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
          SDK.Storage.remove("tokenId");
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
        const currentUsers = SDK.User.currentUser();
        if (currentUsers) {
          $(".navbar-right").html(`
            <li><a href="course.html">Your Quizzes</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
        } else {
          $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(currentUser)</span></a></li>
            <li><a href="signup.html">Sign-up <span class="sr-only">(currentUser)</span></a></li>
          `);
        }
        $("#logout-link").click(() => SDK.User.logOut());
          callback && callback();
      });
    }
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