$(document).ready(() => {

  const $modalTbody = $("#basket-tbody");
  const basket = SDK.Storage.load("basket");
  let total = 0;

  basket.forEach(entry => {
    let subtotal = entry.book.price * entry.count;
    total += subtotal;
    $modalTbody.append(`
        <tr>
            <td>
                <img src="${entry.book.imgUrl}" height="120"/>
            </td>
            <td>${entry.book.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.book.price}</td>
            <td>kr. ${subtotal}</td>
        </tr>
      `);
  });

  $modalTbody.append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Total</b></td>
        <td>kr. ${total}</td>
      </tr>
    `);

});