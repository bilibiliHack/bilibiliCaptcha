var fs = require('fs')
var childProcess = require('child_process');

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function GenTrainSet(count) {
	var codeList = '';

	var res = childProcess.spawnSync('python',['-m','py_compile','./gen.py']);
	console.log(res.stdout.toString())
	if(res.error){
		console.log(res.error);
	}
	
	for(var i=0;i<count;i++){
		var code = '';
		var path = './raw/train/'+i+'.png'
		console.log(path)
		
		for (var j = 0; j < 5; j++) {
	　　　　code += chars.charAt(Math.floor(Math.random() * chars.length));
	　　}
	
		codeList += path + ' ' + code + '\n';
		
		res = childProcess.spawnSync('python',['./gen.pyc',code,path]);
		console.log(res.stdout.toString())
		if(res.error){
			console.log(res.error);
		}
	}
	
	fs.writeFileSync('./lable.txt',codeList);
}

exports.genTrainSet = GenTrainSet;
