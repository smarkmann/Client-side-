$(document).ready(() => {

  const $bookList = $("#book-list");
  const $purchaseModal = $('#purchase-modal');
  const $modalBody = $(".modal-body");

  SDK.Book.findAll((err, books) => {
    if (err) throw err;
    books.forEach(book => {

      const bookHtml = `
        <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${book.title}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-4">
                        <img src="${book.imgUrl}"/>
                    </div>
                    <div class="col-lg-8">
                      <dl>
                        <dt>Subtitle</dt>
                        <dd>${book.subtitle}</dd>
                        <dt>Publisher</dt>
                        <dd>${book.publisher}</dd>
                        <dt>ISBN</dt>
                        <dd>${book.isbn}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${book.price}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success purchase-button" data-book-id="${book.id}">Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

      $bookList.append(bookHtml);
    });

    $(".purchase-button").click(function () {
      $purchaseModal.modal('toggle');
      if (SDK.User.current()) {
        const bookId = $(this).data("book-id");
        const book = books.find(b => b.id === bookId);
        SDK.Book.addToBasket(book);
      }
    });

  });

  //When modal opens
  $purchaseModal.on('shown.bs.modal', () => {

    if (!SDK.User.current()) {
      $purchaseModal.find(".modal-title").text("Log in to continue");
      $purchaseModal.find(".modal-body").append(`
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
        `);
    } else {

      const basket = SDK.Storage.load("basket");
      let total = 0;

      $modalBody.append(`
      <table class="table">
          <thead>
          <tr>
              <th></th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
          </tr>
          </thead>
          <tbody id="basket-tbody">

          </tbody>
      </table>`);

      basket.forEach(entry => {
        let subtotal = entry.book.price * entry.count;
        total += subtotal;
        $modalBody.find("#basket-tbody").append(`
        <tr>
            <td>
                <img src="${entry.book.imgUrl}" height="60"/>
            </td>
            <td>${entry.book.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.book.price}</td>
            <td>kr. ${subtotal}</td>
        </tr>
      `);
      });

      $modalBody.find("#basket-tbody").append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Total</b></td>
        <td>kr. ${total}</td>
      </tr>
    `);
    }
  });

  //When modal closes
  $purchaseModal.on("hidden.bs.modal", () => {
    $modalBody.html("");
  });

});