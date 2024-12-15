$(document).ready(() => {
    const $castContainer = $("#cast-container");
    const $castForm = $("#add-cast-form");

    // Function to render cast members
    const renderCast = (castMembers) => {
        $castContainer.empty(); // Clear previous members
        if (castMembers.length === 0) {
            $castContainer.append("<p>No cast members found.</p>");
            return;
        }
        castMembers.forEach(member => {
            $castContainer.append(`
                <div class="cast-member">
                    <img src="${member.photoUrl}" alt="${member.name}" class="cast-photo">
                    <h3>${member.name}</h3>
                    <p><strong>Role:</strong> ${member.role}</p>
                    <p><strong>Date of Birth:</strong> ${member.date}</p>
                    <p><strong>Country:</strong> ${member.country}</p>
                </div>
            `);
        });
    };

    // Fetch and render all cast members
    const fetchAndRenderCast = () => {
        $.ajax({
            url: "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Cast",
            method: "GET",
            dataType: "json",
            success: (castMembers) => {
                renderCast(castMembers);
            },
            error: (error) => {
                console.error("Failed to fetch cast members:", error);
                $castContainer.html("<p>Failed to load cast members. Please try again later.</p>");
            }
        });
    };

    // Handle form submission
    $castForm.on("submit", (e) => {
        e.preventDefault();

        const castMember = {
            id: $("#cast-id").val(),
            name: $("#cast-name").val(),
            role: $("#cast-role").val(),
            date: $("#cast-date").val(),
            country: $("#cast-country").val(),
            photoUrl: $("#cast-photoUrl").val()
        };

        $.ajax({
            url: "https://proj.ruppin.ac.il/bgroup1/test2/tar1/api/Cast",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(castMember),
            success: () => {
                alert("Cast member added successfully!");
                $castForm.trigger("reset"); // Clear form
                fetchAndRenderCast(); // Refresh the list
            },
            error: (error) => {
                console.error("Failed to add cast member:", error);
                alert("Failed to add cast member. Please try again.");
            }
        });
    });

    // Load all cast members on page load
    fetchAndRenderCast();
});