$(document).ready(function (){

    let $searchBar = $("#searchBar");
    let $searchButton = $(".searchButton");

    $("form").on("submit", (e) =>{
        e.preventDefault();
        if (!$searchBar.val()) {
            return;
        }
        console.log($searchBar.val());
    })

})
