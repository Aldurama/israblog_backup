import httplib
import re
import os

def changeFunSrc(data):
	return re.sub("Include.js","../../Include.js",data)
	
def getPage(url):
	conn = httplib.HTTPConnection("israblog.nana10.co.il")
	conn.request("GET", url)
	r = conn.getresponse()
	print r.status, r.reason
	data = r.read()
	conn.close()
	return changeFunSrc(data)
	
def writeToFile(data, year, month, pageNum):
	dir_path = "./"+year+"/"+month
	if not os.path.isdir(dir_path):
		os.makedirs(dir_path)
	with open(year+"/"+month+"/"+pageNum+".html",'w') as f:
		f.write(data)
		
def getSons(data,year,month,userID):
	m = re.search('navigateCount=[0-9]', data)
	if m: 
		for i in range(1,int(m.group(0).split('=')[1])):
			url = "/blogread.asp?blog="+userID+"&catcode=&year="+year+"&month="+month+"&day=0&pagenum="+str(i+1)+"&catdesc="
			data = getPage(url)
			getComments(data)
			writeToFile(data, year, month, str(i+1))
			
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
		writeToFile(data,"comments","",blogCode)
				

				
userID = raw_input("Type in your userID: ")

urlStart = "/blogread.asp?blog="+userID

'''
archive = ["6/2013",
			"9/2012","3/2012","2/2012","1/2012","8/2011",
			"7/2011","6/2011","5/2011","3/2011","2/2011",
			"11/2010","10/2010","9/2010","8/2010","6/2010","5/2010","4/2010","2/2010",
			"12/2009","10/2009","9/2009","8/2009","7/2009","6/2009","5/2009","4/2009","3/2009","2/2009","1/2009",
			"12/2008","11/2008","10/2008","9/2008","8/2008","7/2008","5/2008","4/2008","3/2008","2/2008","1/2008",
			"12/2007","11/2007","10/2007","9/2007","8/2007","7/2007","6/2007","5/2007","4/2007","3/2007","2/2007","1/2007",
			"12/2006","11/2006","10/2006","9/2006","8/2006","7/2006","6/2006","5/2006","4/2006","3/2006","2/2006","1/2006",
			"12/2005","11/2005","10/2005","9/2005","8/2005","7/2005","6/2005","5/2005","4/2005","3/2005","2/2005","1/2005",
			"12/2004","11/2004","10/2004","9/2004"]'''
			
				
url = urlStart
data = getPage(url)
p = re.compile("\<form name=\"frmArchive\"\>.+</form>")
m = re.search(p, data)
if m:
	archive = re.split("<|>",m.group(0))[14::4]
	del archive[-1]

#writeToFile(data, "temp", "temp", "1")

	
for date in archive:
	[month,year] = date.split('/')
	url = urlStart+"&year="+year+"&month="+month
	data = getPage(url)
	getComments(data)
	writeToFile(data, year, month, "1")
	getSons(data, year, month, userID)
