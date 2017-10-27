const SDK = {
  serverURL: "http://localhost:3000/api",
  request: (options, cb) => {

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
        cb(null, data, status, xhr);
      },
      error: (xhr, status, errorThrown) => {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });

  },
  Book: {
    addToBasket: (book) => {
      let basket = SDK.Storage.load("basket");
      if(!basket){
        return SDK.Storage.persist("basket", [book]);
      }
      basket.push(book);
      SDK.Storage.remove("basket");
      SDK.Storage.persist("basket", basket);
    },
    findAll: (cb) => {
      SDK.request({
        method: "GET",
        url: "/books",
        headers: {
          filter: {
            include: ["authors"]
          }
        }
      }, cb);
    },
    create: (data, cb) => {
      SDK.request({
        method: "POST",
        url: "/books",
        data: data,
        headers: {authorization: SDK.Storage.load("tokenId")}
      }, cb);
    }
  },
  Author: {
    findAll: (cb) => {
      SDK.request({method: "GET", url: "/authors"}, cb);
    }
  },
  User: {
    finAll: (cb) => {
      SDK.request({method: "GET", url: "/staffs"}, cb);
    },
    current: () => {
      return this.Storage.load("user");
    },
    logOut: () => {
      SDK.Storage.remove("tokenId");
      SDK.Storage.remove("userId");
      SDK.Storage.remove("user");
    },
    login: (username, password, cb) => {
      SDK.request({
        data: {
          username: username,
          password: password
        },
        url: "/users/login?include=user",
        method: "POST"
      }, (err, data) => {

        //On login-error
        if (err) return cb(err);

        SDK.Storage.persist("tokenId", data.id);
        SDK.Storage.persist("userId", data.userId);
        SDK.Storage.persist("user", data.user);

        cb(null, data);

      });
    }
  },
  Storage: {
    prefix: "BookStoreSDK",
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