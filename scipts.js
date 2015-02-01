var urlName;
var pageNum = 0;
var resultLength = 0;
var lPython = false;
var lJSON = false;
var lJS = false;
var lSQL = false;

function langPyth(check){
	if (check.checked == true){lPython = true;}
	else {Python == false};	
}

function langJSON(check){
	if (check.checked == true){lJSON = true;}
	else {JSON == false};	
}

function langJS(check){
	if (check.checked == true){lJS = true;}
	else {JS == false};	
}

function langSQL(check){
	if (check.checked == true){lSQL = true;}
	else {SQL == false};	
}

function searchButton(form){
	
	//clean the list
	var node = document.getElementById("gistResults");
	while (node.hasChildNodes()){
		node.removeChild(node.firstChild);
	}
	
	resultLength = 0;
	pageNum = 0;
	
	var numPages = document.getElementById("pageNumSelect").value;
	
	for (var a = 0; a < numPages; a++){
		
		urlName = "https://api.github.com/gists?page=" + a + "&per_page=30";
		
		getGistResults();
	}
}
function getGistResults() {
	
	var xmlhttp;
	
	if(window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {//IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET", urlName);
	xmlhttp.send();
	
	xmlhttp.onreadystatechange = function (){

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			pageNum += 1;

			document.getElementById("gistResults").innerHTML += "<p>" + "Page:" + pageNum + "<\p>";
			
			var results = JSON.parse(xmlhttp.responseText);

			resultLength += results.length;

			document.getElementById("gistResults").innerHTML += "<p>" + "Number of files: " + resultLength + "<\p>";
			
			// parse data and display
			
			for (var i = 0; i < results.length; i++) {
				
				//
				var files = results[i].files;
				
				for(var j in files) {
					if (lPython == true && files[j].language == "Python"){
						printResults(results[i].html_url, results[i].description, files[j].filename, files[j].language);
					}
					
					if (lJSON == true && files[j].language == "JSON"){
						printResults(results[i].html_url, results[i].description, files[j].filename, files[j].language);
					}
					
					if (lJS == true && files[j].language == "JavaScript"){
						printResults(results[i].html_url, results[i].description, files[j].filename, files[j].language);
					}
					
					if (lSQL == true && files[j].language == "SQL"){
						printResults(results[i].html_url, results[i].description, files[j].filename, files[j].language);
					}
				}
			}
		}
	}
	
}

function printResults(html_url, description, filename, language){
	var printString = "<div id='printed'><p><input type='checkbox' name='output' onclick='addFavorite(this)'/> Add/Remove to favorites " + 					"<a href = '" + html_url + "'>"
						+ "Link:" +html_url 
						+ "		Description: " + description 
						+ "		Filename: " + filename
						+ "		Language: " + language
						+ "</a></p></div>";
						
	document.getElementById("gistResults").innerHTML += printString;
}


function addFavorite(a){
	var b = document.getElementById('printed');
	localStorage.setItem('favorites', b.innerHTML);
	document.getElementById("favorites").innerHTML += b.innerHTML;
	removeElement(b);
}
function removeElement(b){
	var b = document.getElementById("printed");
	b.parentNode.removeChild(b);
}
