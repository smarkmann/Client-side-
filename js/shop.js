$(document).ready(() => {

  const $bookList = $("#book-list");
  const $purchaseModel = $('#purchase-modal');

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
                            <button class="btn btn-success purchase-button" data-book-id="${book.id}">Køb</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

      $bookList.append(bookHtml);
    });

    $(".purchase-button").click(function () {
      $purchaseModel.modal('toggle');
      const bookId = $(this).data("book-id");
      console.log(bookId);
    });

  });

});