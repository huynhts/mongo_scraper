// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var artLink = data[i].link;
    var postLink;

    if(!artLink.includes("https://")) {
      postLink = "https://www.rotoworld.com" + artLink;
    } else {
      postLink = artLink;
    }
    
    $("#articles").append(
      "<p'>" 
      + data[i].title 
      + "<br />" 
      + data[i].summary 
      + "<br />" 
      + "<a href='" + postLink + "' target='#'>" + "Read Article Here " + "</a>" 
      + "<button data-id='" + data[i]._id + "' id='addNote'> Add Notes </button>"
      + "<button note-id='" + data[i]._id + "' id='viewNote'> View Notes </button>"
      + "<button article-id='" + data[i]._id + "' id='saveArt'> Save Article </button>"
      + "</p>");
  }
});


// Whenever someone clicks add note button
$(document).on("click", "#addNote", function() {
      // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  noteTaking(thisId);
});

// Whenever someone clicks edit note button
$(document).on("click", "#editNote", function() {
      // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  noteTaking(thisId);
});

var noteTaking = function (noteId) {

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + noteId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


    // If there's a note in the article
    if (data.note) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.note.body);
    }
  });
};

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//when you click view note
$(document).on("click", "#viewNote", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("note-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<h5> Note Title: " + data.note.title + "</h5>");
      // A textarea to add a new note body
      $("#notes").append("<p>" + data.note.body + "</p>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='editNote'> Edit Notes</button>");
      // A button to delete note
      $("#notes").append("<button data-id='" + data._id + "' id='deleteNote'>Delete Note</button>");

    });
});

// Whenever someone clicks add note button
$(document).on("click", "#saveArt", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("article-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {saved: true}
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});

// Whenever someone clicks add note button
$(document).on("click", "#scrapeNew", function() {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/scrape",
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      $("#articles").empty();
      window.location.href = "/";
    });
});