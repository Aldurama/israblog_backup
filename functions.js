function cleanKeyWords(strWords)
{
 		var strResult = strWords;
		strResult = strResult.replace(/\./g, " ");
		strResult = strResult.replace(/_/g, " ");
		strResult = strResult.replace(/,/g, " ");
		strResult = strResult.replace(/@/g, " ");
		strResult = strResult.replace(/%/g, " ");
		strResult = strResult.replace(/#/g, " ");
		strResult = strResult.replace(/!/g, " ");
		strResult = strResult.replace(/~/g, " ");
		strResult = strResult.replace(/\$/g, " ");
		strResult = strResult.replace(/\&/g, " ");
		strResult = strResult.replace(/\^/g, " ");
		strResult = strResult.replace(/\"/g, "``");
		strResult = strResult.replace(/\'/g, "`");
		//strResult = strResult.replace(/\"/g, "");
		//strResult = strResult.replace(/\'/g, "");
		strResult = strResult.replace(/\(/g, " ");
		strResult = strResult.replace(/\)/g, " ");
		strResult = strResult.replace(/\[/g, " ");
		strResult = strResult.replace(/\]/g, " ");
		strResult = strResult.replace(/\}/g, " ");
		strResult = strResult.replace(/\{/g, " ");
		strResult = strResult.replace(/\*/g, " ");
		strResult = strResult.replace(/\+/g, " ");
		strResult = strResult.replace(/-/g, " ");
		strResult = strResult.replace(/\?/g, " ");
		strResult = strResult.replace(/\\/g, " ");
		strResult = strResult.replace(/\//g, " ");
 		return strResult;
}
function isValidSearch()
{
	var oSearchForm = document.getElementById('frmSearch');
	var strSearch = oSearchForm.q.value;
   //var strSearch = document.frmSearch.q.value;
   strSearch = strSearch.replace(/^\s+|\s+$/g,"");
   if (strSearch == '')
   {
   	  alert("יש להקליד ערך לחיפוש");
	  return false;
   }
   if (strSearch.length < 3)
   {
   	  alert("הערך לחיפוש קצר מדי");
	  return false;
   }
   /*
   if (oSearchForm.hasbid[1].checked) 
   {
   	  if (isNaN(oSearchForm.bid.value))
	  {
   	   	 alert("מספר הבלוג לא תקין");
	  	 return false;
	  }
   	  if (oSearchForm.bid.value <= 0)
	  {
   	   	 alert("מספר הבלוג לא תקין");
	  	 return false;
	  }
   } 
   */
   oSearchForm.q.value = cleanKeyWords(strSearch);
   return true;   
}
function addCube(formName, formField)
{
   	  var strURL = "http://www.nanablogs.co.il/addcube.asp?form=";
	  strURL += formName;
	  strURL += "&field=";
	  strURL += formField;
	  openWindow(strURL,'uploadImg','resizable,height=440,width=350,scrollbars=yes,status=yes');
}
function addMovie(formName, formField)
{
   	  var strURL = "addmovie.asp?form=";
	  strURL += formName;
	  strURL += "&field=";
	  strURL += formField;
	  openWindow(strURL,'uploadImg','resizable,height=600,width=700,scrollbars=yes,status=yes');
}
function displayEditLinks(bDisplay)
{
 	var listLinks = document.getElementsByName("listlinks");
	var iIndex = 0;
	var iCount = listLinks.length;
	var strStyle = "inline";
	if (!bDisplay)
	   strStyle = "none";
	for (iIndex = 0; iIndex < iCount; iIndex++)
		listLinks.item(iIndex).style.display = strStyle;
}
function trackbackPing(postCode, postTitle, postExcerpt)
{
 	var url = "tb_ping.asp?postcode=" + postCode;
	url += "&posttitle=" + postTitle;
	url += "&excerpt=" + postExcerpt;
	openWindow(url, "pingWnd", "width=600,height=500,resizable=1,scrollbars=1,status=yes");
} 

	  		  function commonAddImage(imageType, formName, formField, isBR, isTag)
			  {
			   	  var strURL = "addimage.asp?form=";
				  strURL += formName;
				  strURL += "&imagetype=";
				  strURL += imageType;
				  strURL += "&field=";
				  strURL += formField;
				  strURL += "&br=";
				  strURL += isBR;
				  strURL += "&tag=";
				  strURL += isTag;
				  strURL += "&measuresintag=";
				  if (arguments[5] == undefined)
				  	 strURL += "0";
		  		  else
				     strURL += arguments[5];
				  strURL += "&fieldwidth=";
				  if (arguments[6] == undefined)
				  	 strURL += "a";
		  		  else
				  	 strURL += arguments[6];
				  strURL += "&fieldheight=";
				  if (arguments[7] == undefined)
				  	 strURL += "a";
		  		  else
				  	 strURL += arguments[7];
				  openWindow(strURL,'uploadImg','resizable,height=600,width=700,scrollbars=yes,status=yes');
			  }

            function openWindow(urlStr, winName, winProps)
            {
               window.open(urlStr, winName, winProps);
            }

			  function checkSession(thisUserCode)
			  {
			     var strUData = getCookie("UData");
				 var arrayUData = strUData.split(",");
				 if (arrayUData.length < 7)
				 {
//				 	alert("arrayUData.length < 7");
					return '0';
				 }
			     var userCode = arrayUData[0];
				 if ((isNaN(userCode)) || (thisUserCode != userCode))
				 {
//				 	alert("(isNaN(userCode)) || (thisUserCode != userCode)");
				 	return '0';
				 }
				 var userWrite = getCookie("UserData");
				 var arrayData = userWrite.split(",");
				 if (arrayData.length < 4)
				 {
//				 	alert("arrayData.length < 4");
				 	return '0';
				 }
				 if ((arrayData[2] != '1') && (arrayData[2] != '2'))
				 {
//				 	alert("(arrayData[2] != '1') && (arrayData[2] != '2')");
				 	return '0';
				 }
				 return '1';
			  }

                function getCookie(name) 
                {   
	                var bikky = document.cookie;
                    var index = bikky.indexOf(name + "=");
	                if (name == "UserCode")
	                {
	                    if (bikky.indexOf("GroupUserCode=") == index - 5)
		                   index = bikky.indexOf(name + "=", index + 1);
	                }
                    if (index == -1) return null;
                    index = bikky.indexOf("=", index) + 1; // first character
                    var endstr = bikky.indexOf(";", index);
                    if (endstr == -1) endstr = bikky.length; // last character
                    return unescape(bikky.substring(index, endstr));
                }

                function checkSessionJS(thisUserCode) {
                    var strUData = getCookieInline("UData");
                    if (strUData.length > 0) {
                        var arrayUData = strUData.split(",");
                        if (arrayUData.length < 7) {
                            return '0';
                        }
                   
                        var userCode = arrayUData[0];
                        if ((isNaN(userCode)) || (thisUserCode != userCode)) {
                            return '0';
                        }
                      
                        var userWrite = getCookie("UserData");
                        var arrayData = userWrite.split(",");
                        if (arrayData.length < 4) {
                            return '0';
                        }
                        
                        if ((arrayData[2] != '1') && (arrayData[2] != '2')) {
                            return '0';
                        }
                        return '1';
                    }
                    else {
                        return '0';
                    }
                    return '1';
                }
                function getCookieInline(name) {
                    var bikky = document.cookie;
                    var index = bikky.indexOf(name + "=");
                    if (name == "UserCode") {
                        if (bikky.indexOf("GroupUserCode=") == index - 5)
                            index = bikky.indexOf(name + "=", index + 1);
                    }
                    if (index == -1) return 0;
                    index = bikky.indexOf("=", index) + 1; // first character
                    var endstr = bikky.indexOf(";", index);
                    if (endstr == -1) endstr = bikky.length; // last character
                    return unescape(bikky.substring(index, endstr));
                }	
  
			  function expandCat()
			  {
			     if (document.getElementById("catadd").style.display == 'block')
				   	 document.getElementById("catadd").style.display = 'none';
				 else
				   	 document.getElementById("catadd").style.display = 'block';
			  }
			  
			  function expandDelHelp()
			  {
			   	 if (document.getElementById('delHelp').style.display == 'block')
			   		document.getElementById('delHelp').style.display = 'none';			  
				 else
			   		document.getElementById('delHelp').style.display = 'block';			  
			  }
	