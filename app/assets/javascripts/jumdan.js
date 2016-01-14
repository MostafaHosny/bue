function addEvent(element, evnt, funct){
	if (element.attachEvent)
		return element.attachEvent('on'+evnt, funct);
	else
		return element.addEventListener(evnt, funct, false);
}

function submitAjaxRequest(method, script, args, callback)
{
	var xmlhttp;
	if( window.XMLHttpRequest ) {xmlhttp = new XMLHttpRequest();}
	else {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			callback(xmlhttp.responseText);
		}
	};
	
	if( method === "GET") {script = script + "?" + args; args = "";}
	
	xmlhttp.open(method, script, true );
	if(method === "POST") {xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");}
	xmlhttp.send(args);
}

function setLoadingMask()
{
	document.body.style.width = 100 + "%";
	document.body.style.height = window.innerHeight + "px";
	document.body.style.overflow = "hidden";
	
	document.getElementById("loadMask").style.width = 100 + "%";
	document.getElementById("loadMask").style.height = window.innerHeight + "px";
	
	addEvent(window, "load", hideLoadingMask);
}

function hideLoadingMask()
{
	document.getElementById("loadMask").style.display = "none";
	document.body.style.height = "";
	document.body.style.overflowX = "hidden";
	document.body.style.overflowY = "auto";
}

function IsDigit(stringToCheck)
{
	var regex = /[0-9]/;
	if( !regex.test(stringToCheck) ) {
		return false;
	}
	return true;
}

//Validate User-Input is Numeric						
function validateIsDigit(evt)
{
	var key = evt.keyCode || evt.which;
	var chck = String.fromCharCode( key );
	var regex = /[0-9]/;
	if( !regex.test(chck) ) {
		evt.returnValue = false;
	}
}
						
function GetSelectedRadioButtonValue(groupName)
{
	var listOftypesRadioButtons=document.getElementsByName(groupName);
	for(loop=0;loop<listOftypesRadioButtons.length;loop++)
	{
		if(listOftypesRadioButtons[loop].checked)
			return listOftypesRadioButtons[loop].value;
	}
	return null;
}
