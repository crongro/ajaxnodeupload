/*
 * GET users listing.
 */
var mysql = require('mysql');
 
var dbconn = mysql.createConnection({
    host     : '127.0.0.1', // 기본포트가 3306으로 되어있는 경우에는 포트 설정이 필요없다.
    user     : 'root',
    password : '4020'
});
 
 
/* 
 *
 * 테스트 방
 * 1. 세션추가 : http://localhost:8019/login/1234
 * 2. 세션확인 : http://localhost:8019/checkSession
 * 3. 세션삭제 : http://localhost:8019/logout
 */
 
exports.login = function(req, res){

    console.log('ID:', req.params.id);

    //DB 선택 부분
    dbconn.query('USE mysql', function(err){
        if(err) throw err;

        // 쿼리 부분
        dbconn.query('SELECT * FROM userInfo WHERE id=1', function(err, result){
            console.log("query ok, his age is ", result[0].age);
            if(result[0].name === "jisu") {
                req.session.sessionData = req.params.id;
                console.log('session saved!!');
            }
            if(err) throw err;
            res.send(result);
        });

    });
    
};


exports.checkSession = function(req,res) {
    console.log("checkSession page called");
    if (req.session.sessionData) {
        res.send("세션이 유지중입니다...");
    } else {
        res.send("세션이 없습니다.");
    }
};

exports.logout = function(req,res) {
    console.log("logout page called");
    req.session.sessionData = null;
    res.send();
};
