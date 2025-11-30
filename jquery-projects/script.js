$(document).ready(function () {

  $(".toggle-btn").on("click", function () {

    // Make clicked button active
    $(".toggle-btn").removeClass("active");
    $(this).addClass("active");

    // ID of the section to show
    const id = $(this).data("section");

    // Read data from hidden div
    const content = $("#" + id).html();

    // Inject into main card
    $("#content-card").html(content);
  });

});
