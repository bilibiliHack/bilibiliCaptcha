var binaryzation = require('./binaryzation');
var gen = require('./gen');
var convnetjs = require('convnetjs');
var fs = require('fs');


var layer_defs = [];
layer_defs.push({type:'input', out_sx:110, out_sy:30, out_depth:1});
layer_defs.push({type:'conv', sx:5, filters:8, stride:1, pad:2, activation:'relu'});
layer_defs.push({type:'pool', sx:2, stride:2});
layer_defs.push({type:'conv', sx:5, filters:16, stride:1, pad:2, activation:'relu'});
layer_defs.push({type:'pool', sx:3, stride:3});
layer_defs.push({type:'softmax', num_classes:36});

var net = new convnetjs.Net();
net.makeLayers(layer_defs);

var input = Array();
var output = Array();

process.stdin.setEncoding('utf8');



process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    switch(chunk.replace(/\s+/g,"")){
      case 'bin-test'://二值化测试数据
        console.log('now binarize test data');
        binaryzation.bin_test();
      break;
      case 'bin-train'://二值化训练用例
        console.log('now binarize train data');
        binaryzation.bin_train();
      break;
      case 'gen-train'://生成训练用例
        gen.genTrainSet(10000);
      break;
      case 'gen-data'://生成训练数据json文件
        var res = childProcess.spawnSync('python',['data.py']);
      	console.log(res.stdout.toString())
      	if(res.error){
      		console.log(res.error);
      	}
      break;
      case 'load-data'://加载训练数据
        console.log('loading data from json file');
        fs.readFile('input.json',{"encoding":"utf8"},function(err,data){
          var input_json = JSON.parse(data);
          input.splice(0,input.length);
          for(var data in input_json){
            var vol =new convnetjs.Vol(110,30,1);
            for(var i = 0 ;i<data.length;i++) {
              vol.i = data[i];
            }
            input.push(vol);
          }
          console.log('input data load finish');
        });
        fs.readFile('output.json',{"encoding":"utf8"},function(err,data){
          var output_json = JSON.parse(data);
          output.splice(0,output.length);
          for(var data in output_json){
            output.push(data);
          }
          console.log('output data load finish');
        });
      break;
      case 'train'://训练网络
        console.log('now training neural network');
        var trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:20, l2_decay:0.001});
        for(var i = 0 ; i<10 ;i++){
          for(var j = 0 ; j< input.length ; j++){
            trainer.train(input[j],output[j]);
          }
          console.log('train epoch '+i+' finished');
        }
        console.log('train finished');
      break;
      case 'save'://保存网络
        console.log('now saving neural network');
      break;
      case 'load'://加载网络
        console.log('now loading neural network');
      break;
      default :
        console.log('help');
    }
  }
});
