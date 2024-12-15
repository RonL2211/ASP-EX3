$(document).ready(() => {

    if(localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    }
    else {
        $("#welcome").html("Welcome " + localStorage.getItem("userName"));

        // Display success message if exists
        const loginSuccessMessage = localStorage.getItem("loginSuccessMessage");
        if (loginSuccessMessage) {
            alert(loginSuccessMessage); // Show the success message
            localStorage.removeItem("loginSuccessMessage"); // Remove the message after displaying it
        }
    }

    // Generate Menu
    const menuItems = [
        { name: "Home", link: "index.html" },
        { name: "Wish List", link: "wishlist.html" },
        { name: "Cast Form", link: "cast.html" },
        {name: "Add Movie", link: "addmovie.html"}  
    ];

    menuItems.forEach(item => {
        $("#menu").append(`<li><a href="${item.link}">${item.name}</a></li>` );
    });


    $('#logoutBtn').click(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
    });

    renderMovies();
    

});


 renderMovies = () => {
    const $moviesContainer = $("#movies-container");
    $moviesContainer.empty(); // Clear previous content

    ajaxCall('GET', 'https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie', null, (movies) => {

        if (movies.length === 0) {
            $moviesContainer.append("<p>No movies found.</p>");
            return;
        }
        movies.forEach(movie => {
            $moviesContainer.append(`
                <div class="movie">
                    <img src="${movie.photoUrl}" alt="${movie.title}" class="movie-img">
                    <h3>${movie.title}</h3>
                    <p><strong>Rating:</strong> ${movie.rating}</p>
                    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                    <p><strong>Duration:</strong> ${movie.duration} minutes</p>
                    <p><strong>Language:</strong> ${movie.language}</p>
                    <p>${movie.description}</p>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <button class="wishlist-btn" data-id="${movie.id}" onclick="addToWishlist(${movie.id})" >Add to Wishlist</button>
                </div>
            `);
        })}, 

    () => {
        alert("Failed to load movies. Please try again later.");
    }
    );} 







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
