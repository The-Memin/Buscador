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
        getMatches($("#txtbusca").val())
        matches.forEach(match => {
            $("#salida").append(`<div class="card col">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
            <h5 class="card-text card-title">${match.title}</h5>
            <ul>
                <li class="ranking">Ranking:${match.ranking} </li>
                <li>Year:${match.year}</li>
                <li>Gender:${match.gender}</li>
                <li>Duration:${match.duration}</li>
                <li><a href="${match.url}">Synopsis</a></li>
            </ul>
            </div>`);
        });
    });

    function getMatches(string){
        matches = []
        movies.forEach(movie => {
            if(movie.title.toLowerCase().indexOf(string) !== -1){
                console.log(movie)
                matches.push(movie)
            }
        });
    }
});