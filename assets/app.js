var ViewModel = function () {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/22252709_010df3379e_z.jpg');
    this.imgAttribution = ko.observable('some dude');
    this.nicknames = ko.observableArray([
        "tabatha","tabtab", "mc tabby"
//        {name: "tabatha"},
//        {name: "tabtab"},
//        {name: "mc tabby"}
    ]);
    this.incrementCounter = function () {
        this.clickCount(this.clickCount() + 4);
    };
    this.level = ko.computed(function () {
        if (this.clickCount() < 10) {
            return "newborn";
        } else if (this.clickCount() < 30) {
            return "child";
        } else if (this.clickCount() < 50) {
            return "adult";
        } else {
            return "too shy to tell";
        }
//        switch (this.clickCount()) {
//
//            case (this.clickCount() < 10):
//                return "newborn";
//                break;
//            case (this.clickCount() < 30):
//                return "child";
//                break;
//            case (this.clickCount() < 50):
//                return "adult";
//                break;
//            default:
//                console.log(this.clickCount());
//                return "too shy to tell";
//                break;
//        }
    }, this)
}

ko.applyBindings(new ViewModel());
