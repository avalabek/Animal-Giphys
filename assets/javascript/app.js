// jquery
$(document).ready(function() {

    // empty array of animals to be added to
    var animals = [];

    // Event listener for all button elements
    $("button").on("click", function() {
// Question wrap the what happens on click in a function to call for new buttons?
        // function displayAnimalGiphy() {
        var animal = $(this).attr("data-animal");

        // Constructing a URL to search Giphy for the name of the animal 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        //TO DO make new buttons work with giphys--find out why they don't
        // TO DO animate and still giphys make variables to hold url the below items mess up page
        // var imageUrl = response.data.image_original_url;
        // var stillUrl = imageURL.replace(/.gif/i, '_s.gif');

        // AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the giphy API
            .done(function(response) {
                // put the response in an array call it the results variable
                var results = response.data;
                console.log(results);

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Preventing anything not pg or g from showing up
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating to show rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag for giphy
                        var animalImage = $("<img>");

                        // Giving the image tag an src attribute of a property pulled off the
                        // result item found in console to make it still at first 
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        // still image give this attribute
                        animalImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                        //animated image give this attribute
                        animalImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                        animalImage.attr("data-state", "animate"); 
                        animalImage.addClass("image");

                        // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(animalImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                }
            });
    });
    // }) 
    //function to make buttons from form input
    function renderButtons() {
        // delete animals before adding new ones
        $("#buttons-view").empty();
        // loop through array of animals
        for (var i = 0; i < animals.length; i++) {
            //generate buttons for each animal in array
            var a = $("<button>");
            // add class of animal to button 
            a.addClass("animal");
            // add data attribute of data-animal to button
            a.attr("data-animal", animals[i]);
            //button text
            a.text(animals[i]);
            // put buttons in buttons-view div
            $("#buttons-view").append(a);
        }
    }
    $("#add-animal").click(function(event) {
        event.preventDefault();
        //get input from text box; trim removes whitespace
        var animal = $("#animal-input").val().trim();
        //animal that was input goes into the animals array
        animals.push(animal);
        // call renderButtons
        renderButtons();

    });
//Question add a click event listener to all elements with a class of "animal"
    // $(document).on("click", ".animal", displayAnimalGiphy());

    // call render buttons to display intitial buttons
    renderButtons();


    // when .gif is clicked, then do this: incomplete 
    $(document).click(".gif", function() {
        //variable to store image data-state in
        var state = $(this).attr("data-state");

        console.log(state);

        //check if the variable state is equal to still
        if (state === "still") {
            // then update the URL to animate it
            var updateURL = $(this).attr("data-animate");
            $(this).attr("src", updateURL);
            $(this).attr("data-state", "animate");
        }
        // if variable is animated already
        if (state === "animate") {
            //then update the URL to be still
            // by removing.gif and replacing it with_s.gif
            var updateURL = $(this).attr("data-still");
            // $(this).attr("src", 'src.replace(/\.gif/i, "_s.gif"');
            $(this).attr("src", updateURL);
            $(this).attr("data-state", "still");

        }


    })
}) //end jquery document.ready