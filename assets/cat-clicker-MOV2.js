$(function () {

    //---------------------MODEL
    var model = {
        //instantiation of cats
        init: function () {
            new octopus.Cat('Rusty', 'img/cat.jpg');
            new octopus.Cat('Blinky', 'img/cat2.jpg');
            new octopus.Cat('Quincy', 'img/cat3.jpg');
            new octopus.Cat('Queeny', 'img/cat4.jpg');
            new octopus.Cat('Sleepy', 'img/cat5.jpg');
            new octopus.Cat('Joel', 'img/cat7.jpg');
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

        // event listener for image clicks from display area
        listenToImg: function () {
            $('#display-area').on('click', 'img', function (el) {
                var whichCat = $(this).closest('section').attr('id');
                octopus.incrementClicks(whichCat);
            });
        },

        // event listener for cat name clicks from list
        listenToList: function () {
            $('#names-list p').click(function (e) {
                var selectedCat = $(this).html();
               //console.log(selectedCat);
                view.displayCat(selectedCat);
            });
        },
        // event listener for admin button
        listenToBtn: function () {
            $('#display-area').on('click', '.admin-btn', function (elem) {
               view.displayAdminForm();

            });
        },
        randomCat: function () {
            //Math.floor(Math.random() * (max - min +1)) + min;
            var alleyCat = Math.floor(Math.random() * octopus.allCats.length);
            view.displayCat(octopus.allCats[alleyCat].id);
        }
    };

    //---------------------VIEW
    var view = {
        init: function(){
            view.displayCatList();
            octopus.randomCat();
            octopus.listenToImg();
            octopus.listenToList();
            octopus.listenToBtn();
        },
        //adds the clicked cat's image to the page
        displayCat: function (kitten) {
            for (var selectedKitty in octopus.allCats) {
                var thatCat = octopus.allCats[selectedKitty];
                if (kitten == thatCat.id) {
                    var htmlStr = '<section id="' + thatCat.id + '"><div class="polaroid"><h2>' + thatCat.id + '</h2><img src="' + thatCat.picture + '"><p><strong>Clicks: </strong><span></span></p></div><div id="admin"><button class="admin-btn float-left">Admin</button></div></section>';
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
        },
        // input with name
        // input with img
        // input with nb of clicks?
        // cancel button
        // save button
        displayAdminForm: function() {
            $('.admin-btn').toggle();
            var htmlStr = '<form id="admin-form"><label for="cat-id">Name</label><input type="text" id="cat-id" value=""><br><label for="cat-img">Image</label><input type="text" id="cat-img" value=""><br><label for="cat-clicks">Nb clicks</label><input type="text" id="cat-clicks" value=""><br></form>';
            $('#display-area #admin').append(htmlStr);

        }
    };

    octopus.init();
});

