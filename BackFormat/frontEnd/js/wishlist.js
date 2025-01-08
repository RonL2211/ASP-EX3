$(document).ready(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("You must log in to access this page.");
        window.location.href = "login.html";
        return;
    }

    let currentWishlistMovies = []; // Store the current wishlist movies for filtering

    // Fetch user's wishlist and render movies
    const fetchWishlistAndMovies = () => {
        ajaxCall(
            "GET",
            `https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie/wishlist/${userId}`,
            null,
            (wishlistMovies) => {
                console.log(wishlistMovies)
                currentWishlistMovies = wishlistMovies; // Store fetched wishlist movies
                const wishlistIds = wishlistMovies.map(movie => movie.id);
                // Fetch all movies
                ajaxCall(
                    "GET",
                    "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie",
                    null,
                    (allMovies) => {
                        allMovies.forEach(movie => {
                            movie.movie.inWishlist = wishlistIds.includes(movie.movie.id);
                        });
                        renderMovies(allMovies, "#movies-container");
                    },
                    (error) => {
                        console.error("Error fetching all movies:", error);
                        $("#movies-container").html("<p>Failed to load movies. Please try again later.</p>");
                    }
                );

                renderMovies(wishlistMovies, "#wishlist-container", true);
            },
            (error) => {
                console.error("Error fetching wishlist:", error);
                $("#wishlist-container").html("<p>Failed to load your wishlist. Please try again later.</p>");
            }
        );
    };

    // Render movies (used for both homepage and wishlist)
    const renderMovies = (movies, containerSelector, isWishlist = false) => {
        const $container = $(containerSelector);
        $container.empty(); // Clear previous content
console.log('movies =' , movies)
        if (!movies || movies.length === 0) {
            $container.append("<p>No movies found.</p>");
            return;
        }

        movies.forEach(movie => {
            const wishlistButton = isWishlist
                ? "" // No button for wishlist movies
                : movie.inWishlist
                    ? "" // Already in wishlist
                    : `<button class="wishlist-btn" data-id="${movie.id}">Add to Wishlist</button>`;

            $container.append(`
                <div class="movie">
                    <img src="${movie.photoUrl}" alt="${movie.title}" class="movie-img">
                    <h3>${movie.title}</h3>
                    <p><strong>Rating:</strong> ${movie.rating}</p>
                    <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                    <p><strong>Duration:</strong> ${movie.duration} minutes</p>
                    <p><strong>Language:</strong> ${movie.language}</p>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    ${wishlistButton}
                </div>
            `);
        });
    };

    // Add a movie to the wishlist
    const addToWishlist = (movieId) => {
        ajaxCall(
            "POST",
            `https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Movie/wishlist/${userId}/${movieId}`,
            null,
            () => {
                alert("Movie successfully added to your wishlist!");
                fetchWishlistAndMovies(); // Refresh data
            },
            (error) => console.error("Error adding movie to wishlist:", error)
        );
    };

    // Event delegation for "Add to Wishlist" button
    $("#movies-container").on("click", ".wishlist-btn", function () {
        const movieId = $(this).data("id");
        addToWishlist(movieId);
    });

    // Filters for Wishlist
    const setupFilters = () => {
        // Filter by rating
        $("#filter-rating-btn").on("click", () => {
            const minRating = parseFloat($("#rating-filter").val());
            if (!isNaN(minRating)) {
                const filteredMovies = currentWishlistMovies.filter(movie => movie.rating >= minRating);
                renderMovies(filteredMovies, "#wishlist-container", true);
            } else {
                alert("Please enter a valid rating.");
            }
        });

        // Filter by duration
        $("#filter-duration-btn").on("click", () => {
            const maxDuration = parseInt($("#duration-filter").val(), 10);
            if (!isNaN(maxDuration)) {
                const filteredMovies = currentWishlistMovies.filter(movie => movie.duration <= maxDuration);
                renderMovies(filteredMovies, "#wishlist-container", true);
            } else {
                alert("Please enter a valid duration.");
            }
        });
    };

    // Fetch wishlist and all movies on page load
    fetchWishlistAndMovies();
    setupFilters(); // Initialize filter buttons
});

// Generic AJAX call function
function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
}
