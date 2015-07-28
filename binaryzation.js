var walkDir = require('./walkDir.js');
var fs = require('fs');
var childProcess = require('child_process');

var out_path = '';


function bin(path, floor) {
	console.log(path);
	var spstr = path.split("/"); 
	var fileName = spstr[spstr.length-1];
	
	var outPath = out_path + fileName;
	
	calcExtern(path,outPath);
}

function calcExtern(src,des) {
	var res = childProcess.spawnSync('python',['./bin.py',src,des]);
	console.log(res.stdout.toString())
	if(res.error){
		console.log(res.error);
	}
}


function Bin_test() {
	out_path = './bin/test/'
	walkDir.walk('./raw/test',0,bin);
}

function Bin_train() {
	out_path = './bin/train/'
	walkDir.walk('./raw/train',0,bin);
}


exports.bin_test = Bin_test  
exports.bin_train = Bin_train