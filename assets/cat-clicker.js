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
                view.displayCat(selectedCat);
            });
        },
        // event listener for admin button
        listenToBtn: function () {
            $('#display-area').on('click', '.admin-btn', function (elem) {
                var whichCat = $(this).closest('section').attr('id');
                //                var currentBtn = $(this).html(); //if using button tag
                var currentBtn = $(this).attr('value');
                if (currentBtn == 'Admin') {
                    $('.admin-btn.Admin').remove();
                    view.displayAdminForm(whichCat);
                } else if (currentBtn == 'Save') {
                    event.preventDefault();
                    octopus.updateCat(whichCat);
                    view.displayMessage('success');
                } else if (currentBtn == 'Cancel') {
                    $('#admin-form').remove();
                    view.displayBtn('Admin', '#admin');
                }
            });
        },
        randomCat: function () {
            //Math.floor(Math.random() * (max - min +1)) + min;
            var alleyCat = Math.floor(Math.random() * octopus.allCats.length);
            view.displayCat(octopus.allCats[alleyCat].id);
        },
        updateCat: function (thisCat) {
            var softKitty = octopus.allCats;
            for (var meow in softKitty) {
                if (softKitty[meow].id == thisCat) {
                    if ($('#' + thisCat + ' #cat-id').val() != "") softKitty[meow].id = $('#' + thisCat + ' #cat-id').val();
                    if ($('#' + thisCat + ' #cat-img').val() != "") softKitty[meow].picture = $('#' + thisCat + ' #cat-img').val();
                    if ($('#' + thisCat + ' #cat-clicks').val() != "") softKitty[meow].NBclicked = $('#' + thisCat + ' #cat-clicks').val();
                    view.displayCatList();
                    view.displayCat(softKitty[meow].id);
                }
            }
        }
    };

    //---------------------VIEW
    var view = {
        init: function () {
            view.displayCatList();
            octopus.randomCat();
            octopus.listenToImg();
            octopus.listenToBtn();

        },
        //adds the clicked cat's image to the page
        displayCat: function (kitten) {
            $('#display-area').html(' ');
            for (var selectedKitty in octopus.allCats) {
                var thatCat = octopus.allCats[selectedKitty];
                if (kitten == thatCat.id) {
                    var htmlStr = '<section id="' + thatCat.id + '"><div class="polaroid"><h2>' + thatCat.id + '</h2><img src="' + thatCat.picture + '"><p><strong>Clicks: </strong><span></span></p></div><div id="admin"></section>';
                    $('#display-area').append(htmlStr);
                    view.displayBtn('Admin', '#admin');
                    $('#display-area span').append(thatCat.NBclicked);
                }
            }
            octopus.listenToList();
        },
        //adds cat list on the right
        displayCatList: function () {
            $('#names-list p').remove();
            for (var kitty in octopus.allCats) {
                $('#names-list').append('<p>' + octopus.allCats[kitty].id + '</p>');
            }
        },

        displayAdminForm: function (kittyAdm) {
            var adminArea = $(document.body).find('#display-area #admin');
            for (var selectedKitty in octopus.allCats) {
                var thatCat = octopus.allCats[selectedKitty];
                if (kittyAdm == thatCat.id) {
                    var htmlStr = '<form id="admin-form"><label for="cat-id">Name</label><input type="text" id="cat-id" placeholder="' + thatCat.id + '"><em>current: '+ thatCat.id + '</em><br><label for="cat-img">Image</label><input type="text" id="cat-img" placeholder="' + thatCat.picture + '"><em>current: '+ thatCat.picture + '</em><br><label for="cat-clicks">Nb clicks</label><input type="number" id="cat-clicks" placeholder="' + thatCat.NBclicked + '"><em>current: '+ thatCat.NBclicked + '</em><br></form>';
                    adminArea.append(htmlStr);
                }
            }
            view.displayBtn('Cancel', '#admin-form');
            view.displayBtn('Save', '#admin-form');
            //            adminArea.append(view.displayBtn('Cancel', '#admin-form')).append(view.displayBtn('Save', '#admin-form'));

        },

        displayBtn: function (btnType, DOMlocation) {
            //            $(DOMlocation).append('<button class="admin-btn float-right ' + btnType + '">' + btnType + '</button>');
            $(DOMlocation).append('<input type="submit" class="admin-btn float-right ' + btnType + '" value="' + btnType + '">');
        },
        displayMessage: function (type) {
            switch (type) {
            case 'success':
                alert('Modifié avec succès');
                break;
            case 'failure':
                alert('Impossible à effectuer');
                break;
            default:
                alert('hello');
            }
        }
    };

    octopus.init();
});
