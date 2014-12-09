/*
 *  * GET home page.
 *   */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.hellojisu = function(req, res){
    console.log("hellojisu called");
    res.render('hello', { title: 'Hello , jisu' });
};

exports.pp = function(req, res){
    res.render('pp', { title: 'Pair Picker!' });
};

exports.jsonTest = function(req,res) {
    console.log("staert jsonT");
   var dummyJSON = {"name"  : "jisu" , "age" : 40, "height" : "174cm"};
   var strJSON = JSON.stringify(dummyJSON);
   console.log("strJSON", strJSON);
   res.end(strJSON);
};


//Photo Ajax Routing
exports.photoHandler = function(req, res) {

   //console.log("photo Request = > " , req.files.photo.name, req.files.photo.size);
   console.dir(req.files.photo);

   var photoInfo = req.files.photo;

   var dummyJSON = {"name"  : photoInfo.name, "size" : photoInfo.size, "path" : "/uploads/" + photoInfo.name};
   var strJSON = JSON.stringify(dummyJSON);
   res.end(strJSON);
};

exports.urisunsu = function(db) {
    return function(req, res) {
        var collection = db.get('matchSchedule'); //collection name
        collection.find({},{},function(e,docs){
            console.log("docs - > " + docs);

            docs.sort(utility.datesort);

            res.render('urisunsu', {
                "matchList" : docs
            });
        });
    };
};
