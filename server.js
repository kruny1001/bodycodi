const express = require('express');
const app = express();
var reload = require('reload')
const path = require('path');
const router = express.Router();

app.use('/assets', express.static('assets'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/node_modules', express.static('node_modules'))

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_2.html'));
});

router.get('/2',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_2.html'));
});

router.get('/3',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_3.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3002);
reload(app)
console.log('Running at Port 3002');