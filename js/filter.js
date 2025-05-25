$(document).ready(function () {
  $(".category-link").on("click", function (e) {
    e.preventDefault();

    const category = $(this).data("category");

    $(".cat-card").each(function () {
      const itemCategory = $(this).data("category");

      if (category === "all" || itemCategory === category) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
