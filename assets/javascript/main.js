// Initial array of music artists
var musicArtists = ["Linkin Park", "Coldplay", "Red Hot Chili Peppers", "Blink-182", "Green Day"];
$(document).ready(function () {
    renderButtons();
    // This function handles events where one button is clicked
    $("#add-music").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var music = $("#music-input").val().trim();
        // Adding the music from the textbox to our array
        musicArtists.push(music);
        console.log(musicArtists)
        // Calling renderButtons which handles the processing of our music artist array
        renderButtons();
    });
});

// Function for displaying music artist data
function renderButtons() {
    // Deleting the musicArtists prior to adding new musicArtists
    // (this is necessary otherwise we will have repeat buttons)
    $("#musicArtists-view").empty();
    // Looping through the array of music artists
    for (var i = 0; i < musicArtists.length; i++) {
        // Then dynamicaly generating buttons for each music artist in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of music artist to our button
        a.addClass("music");
        // Adding a data-attribute
        a.attr("data-music", musicArtists[i]);
        // Providing the initial button text
        a.text(musicArtists[i]);
        // Adding the button to the HTML
        $("#musicArtists-view").append(a);
    }
    $("button").on("click", handleButtonClick);
}

function handleButtonClick() {
    // In this case, the "this" keyword refers to the button that was clicked
    var music = $(this).attr("data-music");
    // Constructing a URL to search Giphy for the name of the music who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + music +
        "&api_key=9Dn85Fc5a5wc2NYV8bD6PxrosQu7O1GZ&limit=10";
    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                console.log(results.length)
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating an element to have the rating displayed
                    var p = $("<p>").text("Rating: " + rating);
                    // Creating a div for the gif
                    var musicDiv = $("<div class='music'>");
                    // Storing the result item's rating
                    var rating = results[i].rating;
                    // Creating an image tag
                    var musicImage = $("<img>");
                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    musicDiv.append(p);
                    musicDiv.append(musicImage);
                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(musicDiv);
                    musicImage.attr("src", results[i].images.original_still.url);
                    musicImage.attr("data-still", results[i].images.original_still.url);
                    musicImage.attr("data-animate", results[i].images.original.url);
                    musicImage.attr("data-state", "still");
                    musicImage.attr("class", "gif");
                    // Add a click handler for the musicImage tag jquery element
                    musicImage.on('click', handleImageClick);
                    $("#musicArtists").append(musicDiv);

                }
            }
        });
}

// Click Handler for the music images jquery element
function handleImageClick(event) {
    // e.target points at the HTML element the user clicks
    // wrapping in a call to $ like this will convert it to an jquery element with additional functionality
    var image = $(event.target);
    // check the state of the clicked image element
    if (image.attr('data-state') == 'still') {
        // if the state is still, then set it to animate and change the src attribute
        image.attr("data-state", "animate");
        image.attr("src", image.attr('data-animate'));
    } else {
        // if the state is still, then set it to still and change the src attribute
        image.attr("data-state", "still");
        image.attr("src", image.attr('data-still'));
    }
}