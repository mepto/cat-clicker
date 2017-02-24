$(function () {
    var allCats = [];
    var model = {
        //

//        init: function () {
//            if (!localStorage.cats) {
//                localStorage.cats = JSON.stringify([]);
//            }
//        },
//        add: function (obj) {
//            var data = JSON.parse(localStorage.cats);
//            data.push(obj);
//            localStorage.cats = JSON.stringify(data);
//        },
//        getAllCats: function () {
//            return JSON.parse(localStorage.cats);
//        }
        init: function () {
            octopus.addNewCat('Rusty', 'cat.jpg');
            octopus.addNewCat('Blinky', 'cat2.jpg');
            octopus.addNewCat('Quincy', 'cat3.jpg');
            octopus.addNewCat('Princess', 'cat4.jpg');
            octopus.addNewCat('Godron', 'cat5.jpg');
        },

        add: function (obj) {
            allCats.push(obj);
        },

        getAllCats: function() {
            return allCats;
        }


    };

    var octopus = {
        addNewCat: function (name, pic) {
            model.add({
                id: name,
                picture: pic,
                NBclicked: 0
            });
            view.renderList();
        },

        getCats: function () {
            return model.getAllCats();
        },
        incrementClicks(kitten) {
            for (var kitty in allCats) {
                if (kitten == allCats[kitty].id) {
                    allCats[kitty].NBclicked++;
                    $('#' + kitten + ' span').html(allCats[kitty].NBclicked);
                }
            }
        },

        listenToList: function () {
            $('#display-area').on('click', 'img', function (el) {
                var whichCat = $(this).closest('section').attr('id');
                incrementClicks(whichCat);
            });
        },

        listenToImage: function () {
            $('#names-list p').click(function (e) {
                var selectedCat = $(this).html();
                displayCat(selectedCat);
            });
        }


            init: function () {
            model.init();
            view.init();
            listenToList();
            listenToImage();
        }
    };


    var view = {
        init: function () {
            this.catList = $('#names-list');
            this.catImage = $('#display-area');
            view.renderList();
        },
        renderList: function () {
            var htmlStr = '';
            octopus.getCats().forEach(function (kitten) {
                htmlStr += '<p>' + allCats[kitty].id + '</p>';
            });
            this.catList.html(htmlStr);
        },
        renderImage: function (kitten) {
            var htmlStr = '';
            octopus.getCats().forEach(function (kitten) {
                if (kitten == allCats[kitty].id) {
                    htmlstr += '<section id="' + this.id + '"><div><h2>' + this.id + '</h2><img src="' + this.picture + '"><p><strong>Clicks: </strong><span></span></p></div></section>'
                        //                    $('#display-area').append(allCats[kitty].displayOnPage);
                        //                    $('#display-area span').append(allCats[kitty].NBclicked);
                }

            });
            this.catImage.html(htmlStr);
            renderClicks(kitten);
        },
        renderClicks: function (kitten) {
            var htmlStr = '';
            octopus.getCats().forEach(function (kitten) {
                if (kitten == allCats[kitty].id) {
                    // $('#display-area').html(' ');
                    htmlstr += allCats[kitty].NBclicked;
                    //                    $('#display-area').append(allCats[kitty].displayOnPage);
                    //                    $('#display-area span').append(allCats[kitty].NBclicked);
                }
            });
            //retrieve span then.html(htmlStr);
        }
    };

    octopus.init();
});
