var router = require('express').Router()
var fire = require('./fire')
var bodyParser = require('body-parser')
var db = fire.firestore()
router.use(bodyParser.json())

router.get('/datastudent', (req, res)=>{
    var type = req.query.type;
    var allData = [];
    db.collection('students')
    .get()
    .then(snapshot => {
        snapshot.forEach((hasil)=>{
            allData.push(hasil.data())
        });
        console.log(allData)
        res.send(allData)
    }).catch((error)=>{
        console.log(error)
    });
});

router.get('/datadetection', (req, res)=>{
  
    var allData = []
    db.collection('detection')
    .get()
    .then(snapshot => {
        snapshot.forEach((hasil)=>{
            allData.push(hasil.data())
        });
        console.log(allData)
        res.send(allData)
    }).catch((error)=>{
        console.log(error)
    });
});

//-------------------------------------------------------------------
router.get('/student', (req, res)=>{
   
    db.collection('students').add({
        id: req.query.id,
        name: req.query.name
    });
    res.send({
        id: req.query.id,
        name: req.query.name
    });
});

router.get('/detection', (req, res)=>{
   
    db.collection('detection').add({
        id: req.query.id,
        name: req.query.name
    });
    res.send({
        id: req.query.id,
        name: req.query.name
    });
});

//-----------------------------------------------------------------
router.get('/deletestudent', (req, res)=>{

    var delete_query = db.collection('students').where('id','==',req.query.id);
    delete_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();

        });
        res.send({
            "message": req.query.id + "deleted successfully"
        });
    });
    
});

router.get('/deletedetection', (req, res)=>{
   
    var delete_query = db.collection('detection').where('id','==',req.query.id);
    delete_query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();

        });
        res.send({
            "message": req.query.id + "deleted successfully"
        });
    });
});
module.exports = router
