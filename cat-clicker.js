var allCats = [];

//CReation of the Cat class
var Cat = function (name, pic) {
    this.id = name;
    this.picture = pic;
    this.NBclicked = 0;
    this.displayOnPage = '<section id="' + this.id + '"><div><h2>' + this.id + '</h2><img src="' + this.picture + '"><p><strong>Clicks: </strong><span>' + this.NBclicked + '</span></p></div></section>';
    //adds cats to an array
    allCats.push(this);
};

//instantiation of cats
new Cat('Rusty', 'cat.jpg');
new Cat('Quincy', 'cat3.jpg');


//adds formatted cats to the page
function displayCats() {
    for (var kitty in allCats) {
        $('body').append(allCats[kitty].displayOnPage);
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

    //call the function to display cats one by one
    displayCats();

    //listen to clicks and send which img was clicked to the function
    $('img').click(function (e) {
        var whichCat = $(this).closest('section').attr('id');
        incrementClicks(whichCat);
    })

});
