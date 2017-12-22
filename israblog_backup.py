import httplib
import re
import os
import urllib


def changeFunSrc(data):
	return re.sub("/functions.js","../../../functions.js",re.sub("Include.js","../../../Include.js",data))
	
def getPage(url):
	conn = httplib.HTTPConnection("israblog.nana10.co.il")
	conn.request("GET", url)
	r = conn.getresponse()
	#print r.status, r.reason
	data = r.read()
	conn.close()
	return changeFunSrc(data)
	
def getArchive(url):	
	data = getPage(url)
	p = re.compile("<form name=\"frmArchive\">.+</form>")
	m = re.search(p, data)
	if m:
		archive = re.split("<|>",m.group(0))[14::4]
		del archive[-1]
	return archive
	
def writeToFile(data, firstDir, secondDir, fileName):
	dir_path = "./blog/"+firstDir+"/"+secondDir+"/"
	if not os.path.isdir(dir_path):
		os.makedirs(dir_path)
	with open(dir_path+fileName,'wb') as f:
		f.write(data)
		
def getSons(data,year,month,userID):
	m = re.search('navigateCount=[0-9]', data)
	if m: 
		for i in range(1,int(m.group(0).split('=')[1])):
			url = "/blogread.asp?blog="+userID+"&catcode=&year="+year+"&month="+month+"&day=0&pagenum="+str(i+1)+"&catdesc="
			data = getPage(url)
			getComments(data)
			getPictures(data)
			writeToFile(data, year, month, str(i+1)+".html")
			
def getCommentsURL(blogCode, userCode):
	url = "/comments.asp?newcomment=";
	url += '0'
	url += "&blog="
	url += blogCode
	url += "&user="
	url += userCode
	url += "&commentuser="+userCode+"&origcommentuser="+userCode + "#"
	return url
	
def getComments(data):
	m = re.findall('showComments\([0-9]+,[0-9]+\)', data)
	codes =  [re.split('\(|,|\)',x)[1:3] for x in m]
	for [blogCode,userCode] in codes:
		url = getCommentsURL(blogCode,userCode)
		data = getPage(url)
		writeToFile(data,"comments","",blogCode+".html")
		
def getPictures(data):
	p = re.compile("http://f\.nanafiles\.co\.il/upload[a-zA-Z0-9/]*\.(?:gif|png|jpg|GIF|PNG|JPG)")
	for url in re.findall(p,data):
		fileName = url.split('/')[-1]
		writeToFile(urllib.urlopen(url).read(),"pictures","",fileName)
		data = re.sub(p,"../../pictures/"+fileName,data)
	return data

	
#origin = "62816"		
userID = raw_input("Type in your userID: ")
urlStart = "/blogread.asp?blog="+userID
archive = getArchive(urlStart)
	
for date in archive:
	[month,year] = date.split('/')
	url = urlStart+"&year="+year+"&month="+month
	data = getPage(url)
	getComments(data)
	getPictures(data)
	writeToFile(data, year, month, "1.html")
	getSons(data, year, month, userID)
