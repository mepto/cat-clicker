var allCats = [];

var Cat = function (name, pic) {
    this.id = name;
    this.picture = pic;
    this.NBclicked = 0;
    //    this.click = function(){$('#' + this.id + " img").click(function (e) {
    //        this.clicked++;
    //        $('#' + this.id + ' p').html(this.click);
    //    })};
    this.displayOnPage = '<section id="' + this.id + '"><div><h2>' + this.id + '</h2><img src="' + this.picture + '"><p><strong>Clicks: </strong><span>' + this.NBclicked + '</span></p></div></section>';
    allCats.push(this);
};

new Cat('Rusty', 'cat.jpg');
new Cat('Quincy', 'cat3.jpg');

function displayCats() {
    for (var kitty in allCats) {
        $('body').append(allCats[kitty].displayOnPage);
    }
}

function incrementClicks(kitten) {
    for (var kitty in allCats) {
        if (kitten == allCats[kitty].id) {
            allCats[kitty].NBclicked++;
            $('#' + kitten + ' span').html(allCats[kitty].NBclicked);
        }
    }
}

$(document).ready(function () {

    //call the function to display cats one by one
    displayCats();

    //listen to clicks and send which img was clicked to the function
    $('img').click(function (e) {
        var whichCat = $(this).closest('section').attr('id');
        incrementClicks(whichCat);
    })

});
