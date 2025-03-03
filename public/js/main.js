/*
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/


console.log("Main has loaded");
$(document).ready(function() {
    //hide homeLink
    $("#homeLink").hide();

    //clear the search bar after a search is made like shown on canvas
    function clear() {
        $("#search_term").val("");
    }

    //function that retrieves tv shows based on what a user searches
     function getShows(searchTerm) {
        if (searchTerm) {
        var url = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
       
        //ajax request
        $.ajax({
            url: url,
            method: "GET",
            //if successful will execute
            success: function(data) {

                clear();

                var showList = $("#showList");
                //If there is a value, you will first empty the list item elements
                showList.empty();

                //iterate over each show and append to our list of shows
                data.forEach(function(item) {
                    //show data
                    var show = item.show;
                    //(the url we need is in the data in the _links.self.href field)
                    var showLink = (show._links && show._links.self && show._links.self.href) ? show._links.self.href : "#";
                    var listItem = $("<li>").append(
                    $("<a>").attr("href", showLink).text(show.name)
                );
                   //You will then append each list item to the showList UL element...
                    showList.append(listItem);
                    });


                //...and then show the showList element
                showList.show();
                //hide the homeLink 
                $("#homeLink").hide();

                console.log("Shows: ", showList);

            },
            //error
            error: function(error) {
                console.log("Error loading shows:", error);
            }
        });
    }
    }


//--------------------------------------------------------------------------------------


    $("#searchForm").submit(function(event) {
        event.preventDefault();
        //get and trim input
        var searchTerm = $("#search_term").val().trim();

        //if nothing entered
        if (searchTerm === "") {
            //alert user
            alert("Please enter a search term!")
            return;
        }
        getShows(searchTerm);
    });


 //--------------------------------------------------------------------------------------


 //for clicking on the link of a show after searching
$("#showList").on("click", "a", function(event) {
    event.preventDefault();
    //get the url
    var showUrl = $(this).attr('href');
    //split and take the show's id from the url
    var separate = showUrl.split('/');
    var showId = separate[separate.indexOf("shows") + 1];

    $.ajax({
        //now we have the show ID
        // url: `http://localhost:3000/api/shows/${showId}`,
        url: `http://localhost:3000/api/${showId}`,
        method: "GET",
        //will execute if successful
        success: function(show) {


            //...it will then empty the show element
            var showElement = $("#show").empty();


            //append the info about the show... the name, image, language, genre, avg rating, network and a summary
            $("<h1>").text(show.name || "N/A").appendTo(showElement);
            $("<img>").attr("src", show.image ? show.image.medium : "path/to/no-image.jpg").appendTo(showElement);
            //and a dl (definition list) of the following properties of the matching show: language, genres(the entire array in an ul), rating.average, network.name, and summary.
            $("<dl>").text("Language: " + (show.language || "N/A")).appendTo(showElement);
            $("<dl>").text("Genres: " + (show.genres && show.genres.length > 0 ? show.genres.join(", ") : "N/A")).appendTo(showElement);
            $("<dl>").text("Average Rating: " + (show.rating && show.rating.average ? show.rating.average : "N/A")).appendTo(showElement);
            $("<dl>").text("Network: " + (show.network ? show.network.name : "N/A")).appendTo(showElement);
            $("<dl>").html("Summary: " + (show.summary || "N/A")).appendTo(showElement);

            //...You will then show the show element.
           showElement.show();

            $("#showList").hide();

            $("#homeLink").show();

        },

        //error
        error: function(error) {
            console.log("Error loading show detail:", error);
        }
    });
});


 //--------------------------------------------------------------------------------------

//link back to the list of shows
$("#homeLink").on("click", function(event) {
    $("#showList").show();
    $("#show").hide();
});

getShows();


});







