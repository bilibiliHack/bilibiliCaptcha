import os,sys,copy
from PIL import Image

if(len(sys.argv) != 3):
    print 'usage : python bin.py INPUT OUTPUT'
    exit(0)

print sys.argv[1] + ' to ' + sys.argv[2]
	
im = Image.open(sys.argv[1])
print im.format, im.size, im.mode
im = im.convert('P', palette=Image.ADAPTIVE,colors=5)
pixels = list(im.getdata())
width, height = im.size
pixels = [pixels[i * width:(i + 1) * width] for i in xrange(height)]

colors = [0,0,0,0,0,0]

for w in xrange(width):
    for h in xrange(height):
        colors[pixels[h][w]]=colors[pixels[h][w]]+1

colors2 = copy.deepcopy(colors)
colors2.sort()

mainColor = 0
for c in xrange(len(colors)):
    if(colors[c] == colors2[-2]):
        mainColor = c

img = Image.new("L",(width,height))
        
for w in xrange(width):
    for h in xrange(height):
        if(pixels[h][w]!=mainColor):
            img.putpixel((w,h),0)
        else:
            if(pixels[max(h-1,0)][w]!=mainColor \
                and pixels[max(h-1,0)][max(0,w-1)]!=mainColor \
                and pixels[max(h-1,0)][min(width-1,w+1)]!=mainColor \
                and pixels[h][max(0,w-1)]!=mainColor \
                and pixels[h][min(w+1,width-1)]!=mainColor \
                and pixels[min(height-1,h+1)][max(0,w-1)]!=mainColor \
                and pixels[min(height-1,h+1)][w]!=mainColor \
                and pixels[min(height-1,h+1)][min(width-1,w+1)]!=mainColor \
                 ):
                img.putpixel((w,h),0)
            else:
                img.putpixel((w,h),255)
        


img.save(sys.argv[2])
