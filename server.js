const express = require('express');
const app = express();
var reload = require('reload')
const path = require('path');
const router = express.Router();

app.use('/assets', express.static('assets'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/node_modules', express.static('node_modules'))

router.get('/video',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_2.html'));
});

router.get('/1',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_1.html'));
});

router.get('/2',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_2.html'));
});

router.get('/3',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_3.html'));
});

router.get('/4',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_4.html'));
});

router.get('/5',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_5.html'));
});

router.get('/6',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_4_search.html'));
});

router.get('/7',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_4_user.html'));
});

router.get('/8',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_4_select.html'));
});

router.get('/9',function(req,res){
  res.sendFile(path.join(__dirname+'/html/classOp_10_4_confirm.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3002);
reload(app)
console.log('Running at Port 3002');