$(function () {

    //---------------------MODEL
    var model = {
        //instantiation of cats
        init: function () {
            new octopus.Cat('Rusty', 'cat.jpg');
            new octopus.Cat('Blinky', 'cat2.jpg');
            new octopus.Cat('Quincy', 'cat3.jpg');
            new octopus.Cat('Princess', 'cat4.jpg');
            new octopus.Cat('Godron', 'cat5.jpg');
        },
    };

    //---------------------OCTOPUS
    var octopus = {

        init: function () {
            model.init();
            view.init();
        },

        //Creation of the Cat class
        Cat: function (name, pic) {
            this.id = name;
            this.picture = pic;
            this.NBclicked = 0;
            octopus.allCats.push(this);
        },
        // not wanting any variable outside the MOV structure, and
        // being unable to use localstorage, and not wanting the view to call something from Model,
        // the array of cats ends up here
        allCats: [],

        // depending on the cat name retrieved, increments the nb clicks
        incrementClicks: function (kitten) {
            for (var kitty in octopus.allCats) {
                if (kitten == octopus.allCats[kitty].id) {
                    octopus.allCats[kitty].NBclicked++;
                    $('#' + kitten + ' span').html(octopus.allCats[kitty].NBclicked);
                }
            }
        },

        // event lsitener for image clicks from display area
        listenToImg: function () {
            $('#display-area').on('click', 'img', function (el) {
                var whichCat = $(this).closest('section').attr('id');
                octopus.incrementClicks(whichCat);
            });
        },

        // event lsitener for cat name clicks from list
        listenToList: function () {
            $('#names-list p').click(function (e) {
                var selectedCat = $(this).html();
               //console.log(selectedCat);
                view.displayCat(selectedCat);
            });
        }
    };

    //---------------------VIEW
    var view = {
        init: function(){
            view.displayCatList();
            octopus.listenToImg();
            octopus.listenToList();
        },
        //adds the clicked cat's image to the page
        displayCat: function (kitten) {
            for (var selectedKitty in octopus.allCats) {
                var thatCat = octopus.allCats[selectedKitty];
                if (kitten == thatCat.id) {
                    var htmlStr = '<section id="' + thatCat.id + '"><div><h2>' + thatCat.id + '</h2><img src="' + thatCat.picture + '"><p><strong>Clicks: </strong><span></span></p></div></section>';
                    $('#display-area').html(' ').append(htmlStr);
                    $('#display-area span').append(thatCat.NBclicked);
                }
            }
        },
        //adds cat list on the right
        displayCatList: function () {
            for (var kitty in octopus.allCats) {
                $('#names-list').append('<p>' + octopus.allCats[kitty].id + '</p>');
            }
        }
    };

    octopus.init();
});

