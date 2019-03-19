    //Initial array of foods
        var foods = ["Bacon", "Tacos", "Burgers", "Pancakes", "Sushi", "Pizza", "Pasta", "Grilled Cheese", "Donuts"]

        //create buttons
        function renderButtons() {
            //empty buttons array before adding updated list
            $("#buttonsView").empty();
            //create buttons in food array
            for (var i = 0; i < foods.length; i++) {
                var a = $("<button>");
                a.addClass("foods");
                a.attr("data-name", foods[i]);
                a.text(foods[i]);
                //add button to HTML
                $("#buttonsView").append(a);
            }
        }

        //adding buttons to existing list
        $("#add-food").on("click", function (event) {
            event.preventDefault();
            //grab line from input box
            var food = $("#buttonInput").val().trim();
            //add food to foods array
            foods.push(food);
            renderButtons();
        });

        //create functionality to buttons
        $(document).on("click", ".foods", function () {
            //prevent form from submitting itself
            event.preventDefault();
            //empty buttons before adding the updated list
            $("#buttonsView").empty();
            //empty GIFS div
            $("#GIFS").empty();
            //use data-search attr on click event
            var x = $(this).attr("data-name");
            //make queryURL and pull 10 results using data-search
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=E2JXP2YQb0vQRJcPrNRHyq54ZXyEwH3K&limit=10";
            //AJAX call
            $.ajax({ url: queryURL, method: "GET" })
                .done(function (response) {
                    console.log(response);

                    for (var i = 0; i < response.data.length; i++) {
                        var foodDiv = $("<div>");
                        var p = $("<p>").text("Rating: " + response.data[i].rating);
                        var foodImage = $("<img>");
                        foodImage.addClass("gif");
                        foodImage.attr("data-name", foods[i]);
                        var animated = response.data[i].images.downsized.url;
                        var stillImage = response.data[i].images.downsized_still.url;
                        foodImage.attr("src", stillImage);
                        foodImage.attr('data-still', stillImage);
                        foodImage.attr('data-animates', animated);
                        foodImage.attr('data-state', 'still');
                        foodDiv.append(p);
                        foodDiv.append(foodImage);
                        $("#GIFS").append(foodDiv);
                        console.log(foodImage);
                    }
                })
            renderButtons();

        });

        //on click event to change source
        $(document).on("click", ".gif", function () {
            var state = $(this).attr("data-state");
            if (state === "animates") {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
            else {
                $(this).attr("src", $(this).data("animates"));
                $(this).attr("data-state", "animates");
            }
        });

        renderButtons();
