var allCats = [];

//CReation of the Cat class
var Cat = function (name, pic) {
    this.id = name;
    this.picture = pic;
    this.NBclicked = 0;
    this.displayOnPage = '<section id="' + this.id + '"><div><h2>' + this.id + '</h2><img src="' + this.picture + '"><p><strong>Clicks: </strong><span></span></p></div></section>';
    //adds cats to an array
    allCats.push(this);
};

//instantiation of cats
new Cat('Rusty', 'cat.jpg');
new Cat('Blinky', 'cat2.jpg');
new Cat('Quincy', 'cat3.jpg');
new Cat('Princess', 'cat4.jpg');
new Cat('Godron', 'cat5.jpg');


//adds formatted cats to the page
function displayCats() {
    for (var kitty in allCats) {
        $('#display-area').append(allCats[kitty].displayOnPage);
    }
}

//adds the clicked cat's image to the page
function displayCat(kitten) {
    for (var kitty in allCats) {
        if (kitten == allCats[kitty].id) {
            $('#display-area').html(' ');
            $('#display-area').append(allCats[kitty].displayOnPage);
            $('#display-area span').append(allCats[kitty].NBclicked);
        }

    }
}

//adds cat list on the right
function displayCatList() {
    for (var kitty in allCats) {
        $('#names-list').append('<p>' + allCats[kitty].id + '</p>');
    }
}

// depending on the cat name retrieved, increments the nb clicks
function incrementClicks(kitten) {
    for (var kitty in allCats) {
        if (kitten == allCats[kitty].id) {
            allCats[kitty].NBclicked++;
            $('#' + kitten + ' span').html(allCats[kitty].NBclicked);
        }
    }
}



//waits for the dom to be ready
$(document).ready(function () {

    //call the function to display cat names on the list on the right of the page
    displayCatList();
    //call the function to display cats one by one
    //displayCats();


    //listen to clicks and send which img was clicked to the function
    //must use 'on' and the parent element
    //event propagation requires to listen to something that existed already on the "on" function call
    $('#display-area').on('click', 'img', function (el) {
        var whichCat = $(this).closest('section').attr('id');
        incrementClicks(whichCat);
    });

    $('#names-list p').click(function(e){
        var selectedCat = $(this).html();
        displayCat(selectedCat);
    });

//    $('img, #names-list p').on('click', function(e){
//        alert(e);
//    });



});
