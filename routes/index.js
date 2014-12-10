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

   var oJsonData = getJsonData(req);
   var strJSON = JSON.stringify(oJsonData);
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

 function getJsonData (req) {
    var _aPhoto     = req.files.photo;
    var _nFileCount = _aPhoto.length;

    var jsonData = {
                        "photoLen": _nFileCount,
                        "aPhotoInfo": []
                   };

   for (var i = _nFileCount - 1; i >= 0; i--) {

        var _name = _aPhoto[i].name;
        var _size = _aPhoto[i].size;
        var _path = _aPhoto[i].path;

        jsonData.aPhotoInfo[i] = {
            "name": _name,
            "size": _size,
            "path": _path.replace(/\/Users.*\/webNode\/uploads/,""),
        };
   }

   return jsonData;
 }
