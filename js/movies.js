$(document).ready(function () {
    var movies = [];
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
                            movies.push(JSON.parse(movie));
                        });
                        console.log(movies)
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
});