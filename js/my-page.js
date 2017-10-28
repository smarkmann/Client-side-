$(document).ready(() => {

  SDK.User.loadNav();
  const currentUser = SDK.User.current();
  const $basketTbody = $("#basket-tbody");

  $(".page-header").html(`
    <h1>Hi, ${currentUser.firstName} ${currentUser.lastName}</h1>
  `);

  $(".img-container").html(`
    <img src="${currentUser.avatarUrl}" height="150"/>
  `);

  $(".profile-info").html(`
    <dl>
        <dt>Name</dt>
        <dd>${currentUser.firstName} ${currentUser.lastName}</dd>
        <dt>Email</dt>
        <dd>${currentUser.email}</dd>
        <dt>ID</dt>
        <dd>${currentUser.id}</dd>
     </dl>
  `);

  SDK.Order.findMine((err, orders) => {
    if(err) throw err;
    orders.forEach(order => {
      console.log(order.orderItems);
      $basketTbody.append(`
        <tr>
            <td>${order.id}</td>
            <td>${order.orderItems.length}</td>
            <td>kr. 100</td>
        </tr>
      `);
    });
  });


});