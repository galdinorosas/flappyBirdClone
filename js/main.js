$(document).ready(function() {

    console.log("hello");
    $("h1").velocity("transition.slideLeftIn", { duration: 2100, delay: 500 });

    $("li a").on("click", function() {

        // console.log($(".topLink").attr("href"));
        var href = $(this).attr("href");

        $(href).velocity("scroll", { duration: 1500 });
    });
});
