$(document).ready(() => {
    const $movieContainer = $("#movie-container");
    const $movieForm = $("#add-movie-form");

    $movieForm.submit(addingMovie);

    // // // Function to render movies
    // // const renderMovies = (movies) => {
    // //     $movieContainer.empty(); // Clear previous movies
    // //     if (movies.length === 0) {
    // //         $movieContainer.append("<p>No movies found.</p>");
    // //         return;
    // //     }
    // //     movies.forEach(movie => {
    // //         $movieContainer.append(`
    // //             <div class="movie">
    // //                 <img src="${movie.photoUrl}" alt="${movie.title}" class="movie-photo">
    // //                 <h3>${movie.title}</h3>
    // //                 <p><strong>Rating:</strong> ${movie.rating}</p>
    // //                 <p><strong>Income:</strong> $${movie.income}</p>
    // //                 <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
    // //                 <p><strong>Duration:</strong> ${movie.duration} minutes</p>
    // //                 <p><strong>Language:</strong> ${movie.language}</p>
    // //                 <p><strong>Description:</strong> ${movie.description}</p>
    // //                 <p><strong>Genre:</strong> ${movie.genre}</p>
    // //             </div>
    // //         `);
    // //     });
    // // };

    // // Fetch and render all movies
    // const fetchAndRenderMovies = () => {
    //     $.ajax({
    //         url: "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie",
    //         method: "GET",
    //         dataType: "json",
    //         success: (movies) => {
    //             renderMovies(movies);
    //         },
    //         error: (error) => {
    //             console.error("Failed to fetch movies:", error);
    //             $movieContainer.html("<p>Failed to load movies. Please try again later.</p>");
    //         }
    //     });
    // };


});


    addingMovie =  (e) => {
    e.preventDefault();

    const movie = {
        id: 0,
        title: $("#movie-title").val(),
        rating: parseFloat($("#movie-rating").val()),
        income: parseInt($("#movie-income").val(), 10),
        releaseYear: parseInt($("#movie-releaseYear").val(), 10),
        duration: parseInt($("#movie-duration").val(), 10),
        language: $("#movie-language").val(),
        description: $("#movie-description").val(),
        genre: $("#movie-genre").val(),
        photoUrl: $("#movie-photoUrl").val()
    };

    ajaxCall(
        "POST",
        "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie",
        JSON.stringify(movie),
        () => {
            alert("Movie added successfully!");
        },
        (error) => {
            console.error("Failed to add movie:", error);
            alert("Failed to add movie. Please try again.");
        }
    );

};




function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        datatype: "json",
        success: successCB,
        error: errorCB
    });
}
