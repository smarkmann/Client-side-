$(document).ready(() => {
// når man skal finde et ID = #
// Når man skal finde en klasse = .

    SDK.User.loadNav();

    const $bookList = $("#book-list");


    SDK.book.findAll((err, user)=> {

        courses.forEach((course)=> {
            const coursesHtml = `
<div class="col-lg-4 book-container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">${course.title}</h3>
        </div>
        <div class="panel-body">
            
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
                <a class="btn btn-primary btn-lg" href="dis.html" role="button">DIS</a>
                    <button class="btn btn-primary btn-lg" data-course-id="${course.id}">Go to course</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

            $bookList.append(bookHtml);

        });
        $(".purchase-button").click(function() {
            $("#purchase-modal").modal("toggle");
            const bookId = $(this).data("book-id");
            const book = books.find((book) => book.id === bookId);
            SDK.Book.addToBasket(book)
//console.log(bookId);


        });
    });
    $("#purchase-modal").on("shown.bs.modal", () => {
        const basket = SDK.Storage.load("basket");
        const $modalTbody = $("#modal-tbody");
        basket.forEach((entry) => {

            $modalTbody.append(`
<tr>
    <td>
        <img src="${entry.book.imgUrl}" height="60"/>
    </td>
    <td>${entry.book.title}</td>
    <td>${entry.count}</td>
    <td>kr. ${entry.book.price}</td>
    <td>kr. 0</td>
</tr>
`);
        });

    });

});