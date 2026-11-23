import json,glob,os,sys
from PIL import Image,ImageDraw
root=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../..'))
base=os.path.join(root,'outputs/chloe-mastery')
for path in glob.glob(base+'/frames/manifest-*.json'):
 model=os.path.basename(path)[9:-5]
 if len(sys.argv)>1 and model not in sys.argv[1:]:continue
 records=json.load(open(path));tiles=[]
 for r in records:
  if r['label'] not in ['late','prediction']:continue
  im=Image.open(r['output']).convert('RGB');im.thumbnail((640,360))
  tile=Image.new('RGB',(660,394),'#e3e8e0');tile.paste(im,(10,24));ImageDraw.Draw(tile).text((10,5),r['scene']+' / '+r['label'],fill='black');tiles.append(tile)
 sheet=Image.new('RGB',(1320,394*((len(tiles)+1)//2)),'#e3e8e0')
 for i,tile in enumerate(tiles):sheet.paste(tile,((i%2)*660,(i//2)*394))
 sheet.save(base+'/review-'+model+'.jpg')
