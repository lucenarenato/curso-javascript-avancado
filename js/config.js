function setConfig(){
	var texts = {
		"title":"Shopping Control"
	};
	document.title = texts.title;
	document.getElementByid("navTitle").innerHTML = texts.title;
}

setConfig();