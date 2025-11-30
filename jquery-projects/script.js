$(document).ready(function () {

  $(".toggle-btn").on("click", function () {

    $(".toggle-btn").removeClass("active");
    $(this).addClass("active");

    const id = $(this).data("section");

    const content = $("#" + id).html();

    $("#content-card").html(content);
  });

});
