var walkDir = require('./walkDir.js');
var fs = require('fs');
var gm = require('gm');
require('gm-buffer');

var wait=require('wait.for');

var out_path = '';

function core(input,output) {
	var img = gm(input)
		.colors(2);
	
	try{
		var result = wait.forMethod(img,'buffer');
		if (result.err) {
		  console.log(result.err);
		  return;
		}
		
		console.log(result.buffer.byteLength);
	}
	catch(err){
		console.log(err);
	}
	// img.buffer(function (err, buffer) {
	//   if (err) {
	// 	  console.log(err);
	// 	  return;
	//   }
	  
	//   console.log(buffer.byteLength);
	// })
		
	img.write(output,function(err){
		console.log(err);
	})
}

function bin(path, floor) {
	console.log(path);
	
	var spstr = path.split("/"); 
	var fileName = spstr[spstr.length-1];
	
	var outPath = out_path + fileName;
	

	wait.launchFiber(core,path,outPath);

}


function Bin_test() {
	out_path = './bin/test/'
	//wait.launchFiber(walkDir.walk,'./raw/test',0,bin)
	walkDir.walk('./raw/test',0,bin);
}

function Bin_train() {
	out_path = './bin/train/'
	//wait.launchFiber(walkDir.walk,'./raw/train',0,bin)
	walkDir.walk('./raw/train',0,bin);
}


exports.bin_test = Bin_test  
exports.bin_train = Bin_train