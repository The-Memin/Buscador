$(document).ready(function () {
    var movies = [];
    var matches = [];
    getMovies()

    function getMovies(){
        $.ajax({
            type: "POST",
            url: "php/movies.php",
            success: function (response) {
                let jsonData = JSON.parse(response);
                switch (jsonData.success) {
                    case 0:
                        alert("jaja")
                        break;
                    case 1:
                        jsonData.movies.forEach(movie => {
                            if (JSON.parse(movie)) {
                                movies.push(JSON.parse(movie));
                            }
                        });
                        break;
                    case 2:
                        alert("Contraseña incorrecta")
                        break;
                    default:
                        console.log("case default")
                        break;
                }
            }
        });
    }

    $("#txtbusca").keyup(function (e) { 
        $(".card").remove();
        $(".no-found").remove();
        getMatches($("#txtbusca").val().toLowerCase())
        if (matches.length > 0) {
            matches.forEach(match => {
                $("#salida").append(`<div class="card col">
                
                <div class="card-body">
                <h5 class="card-text card-title">${match.title}</h5>
                <ul>
                    <li class="ranking">Ranking: <b>${match.ranking}</b></li>
                    <li>Year:${match.year}</li>
                    <li>Gender:${match.gender}</li>
                    <li>Duration:${match.duration}</li>
                    <li><a href="${match.url}">Synopsis</a></li>
                </ul>
                </div>`);
            });
        }else{
            $("#salida").append(`<h4 class="no-found">No se encontraron coincidencias</h4>`);
        }
    });

    function getMatches(string){
        matches = []
        movies.forEach(movie => {
            if(movie.title.toLowerCase().indexOf(string) !== -1 && string!= "" && string!=" "){
                matches.push(movie)
            }
        });
    }
});