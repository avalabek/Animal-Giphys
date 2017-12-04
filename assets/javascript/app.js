// jquery
$(document).ready(function() {

    // empty array of animals to be added to
    var animals = [];

    // Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      
      var animal = $(this).attr("data-animal");

      // Constructing a URL to search Giphy for the name of the animal who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        // TO DO animate and still giphys make variables to hold url the below items mess up page

        // var imageUrl = response.data.image_original_url;
         // var stillUrl = imageURL.replace(/.gif/i, '_s.gif');

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and animalImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
    //function to make buttons from form input
    function renderButtons() {
        // delete animals before adding new ones
        $("#buttons-view").empty();
        // loop through array of animals
        for (var i = 0; i < animals.length; i++) {
            //generate buttons for each animal in array
            var a = $("<button>");
            // add class of animal to button QUESTION do I need this
            // a.addClass("animal");
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
        //get input from text box trim removes whitespace
        var animal = $("#animal-input").val().trim();
        //animal that was input goes into the animals array
        animals.push(animal);
        // call renderButtons
        renderButtons();

    });

    // call render buttons to display intitial buttons
    renderButtons();

    // when .gif is clicked, then do this: incomplete 
    $(".gif").click(function() {
        //variable to store image data-state in
        var state = $(this).attr("data-state");
        //the below works
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
            $(this).attr("src", 'src.replace(/\.gif/i, "_s.gif"');
            // $(this).attr("src", updateURL);
            $(this).attr("data-state", "still");

        }


    })
  }) //end jquery document.ready
