from PIL import Image

lable_file = open('lable.txt','r')
lines = lable_file.readlines();
lable_file.close()

input_json = ['[']
output_json = ['[']

for line in lines:
	spl =  line.strip().split(' ')
	path = spl[0]
	code = spl[1]
	print spl
	
	im = Image.open(path)
	im = im.convert('P', palette=Image.ADAPTIVE,colors=2)
	pixels = list(im.getdata())
	width, height = im.size
	pixels = [pixels[i * width:(i + 1) * width] for i in xrange(height)]
	
	input_json += '['
	for h in xrange(height):
		#input_json += '['
		for w in xrange(width):
			input_json += '' +  str(pixels[h][w])
			input_json += ','
		#input_json[-1] = ''
		#input_json += ']'
		#input_json += ','
	input_json[-1] = ''
	input_json += ']'
	input_json += ','
	
	output_json += '['
	for c in code:
		'''if(c >= 'A' and c <= 'Z'):
			c = ord(c) - ord('A')
		else:
			c = ord(c) - ord('0') + 26'''
		c = '"' + c + '"'
		output_json += str(c)
		output_json += ','
	output_json[-1] = ''
	output_json += ']'
	output_json += ','

input_json[-1] = ''
output_json[-1] = ''
input_json+=']'
output_json+=']'

input_file = open('input.json','w')
input_file.write(''.join(input_json))
input_file.close()

output_file = open('output.json','w')
output_file.write(''.join(output_json))
output_file.close()