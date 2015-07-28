import os,sys,copy,random
from PIL import Image,ImageDraw,ImageFont,ImageOps

if(len(sys.argv) != 3):
    print 'usage : python gen.py CODE OUTPUT'
    exit(0)
	
im = Image.new("L",(110,30))
font = ImageFont.truetype('simhei.ttf', 28)

x1 = 0
x2 = 10
r1 = -20
r2 = 20

for i in xrange(len(sys.argv[1])):
    txtBuffer = Image.new("L",(30,30))
    draw = ImageDraw.Draw(txtBuffer)
    draw.text((0,0),sys.argv[1][i],fill=(255),font=font)
    del draw
    x = random.randint(x1,x2) + 20 * i
    r = random.randint(r1,r2)
    txtBuffer = txtBuffer.rotate(r,expand=1)
    im.paste( txtBuffer, (x,-2),  txtBuffer)

im.save(sys.argv[2])