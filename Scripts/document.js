
$(document).ready(function () {
	drawGetIP();
	//drawSettings();
});

function clearControls(){
	$('#controlDiv').empty();
}


function mockWebService(){
	
	var ret = new Array();
	
	ret[0] = new Object();
	ret[0].title = "Add images to database"
	ret[0].settingType = "boolean";
	
	ret[1] = new Object();
	ret[1].title = "Server path to save images"
	ret[1].settingType = "string";	
	
	ret[2] = new Object();
	ret[2].title = "Email to send alarm to"
	ret[2].settingType = "string";	
	
	ret[3] = new Object();
	ret[3].title = "Sensitivity"
	ret[3].settingType = "double";	
	ret[3].defaultValue = 1.5;
			
	ret[4] = new Object();
	ret[4].title = "Maximum images to email"
	ret[4].settingType = "int";	
	
	ret[5] = new Object();
	ret[5].title = "Minumum movement for alarm"
	ret[5].settingType = "int";	
	
	ret[6] = new Object();
	ret[6].title = "Seconds between alarms"
	ret[6].settingType = "int";	
	
	return ret;
	
}

function drawSettings(){

	$('#header').text('Configure Motion Detection Session');
	var settings = mockWebService();
	
	for(var i = 0; i < settings.length; i++){
		
		addSettingItem(settings[i].title, i.toString());
		
		if(settings[i].settingType.toLowerCase() == "string"){
			addTextInput(i.toString(), 'text1');
		}
		else if(settings[i].settingType.toLowerCase() == "boolean"){
			addBooleanInput(i.toString(), 'text1');
		}
		else if(settings[i].settingType.toLowerCase() == "int" || settings[i].settingType.toLowerCase() == "double"){
			addNumberInput(i.toString(), 'text1');
		}
				
	}

}//(i.toString(), 'text1');

function addSettingItem(txt, controlDivId){
	
	var settingItem = new Object();
	settingItem.settingName = txt;
	settingItem.settingControlId = controlDivId;
	var settingItemTemplate = $('#settingItemTemplate').html();
	
	$('#controlDiv').append(Mustache.render(settingItemTemplate, settingItem));
		
}

function addTextInput(divId, controlId){
	
	var textInput = new Object();
	textInput.controlId = controlId;
	var textInputTemplate = $('#textInputTemplate').html();	
	$('#' + divId).append(Mustache.render(textInputTemplate, textInput));
		
}

function addNumberInput(divId, controlId){
	
	var numberInput = new Object();
	numberInput.controlId = "txt1";
	var numberInputTemplate = $('#numberInputTemplate').html();	
	$('#' + divId).append(Mustache.render(numberInputTemplate, numberInput));
		
}

function addBooleanInput(divId, controlId){
	
	var booleanInput = new Object();
	booleanInput.controlId = "txt1";
	var booleanTemplate = $('#booleanTemplate').html();	
	$('#' + divId).append(Mustache.render(booleanTemplate, booleanInput));
		
}

function addLabel(divId, text, className){
	
	var label = document.create('label');
	label.className = className;
	label.text
}

function drawGetIP(){
	
	clearControls();
	$('#header').text('Configure IP Camera');
	
	var column = new Object();
	column.col1Id = "col1";	
	column.inputId = "txtIpAddress";
	column.col2Id = "col2";	
	
	var ipConfigureTemplate = $('#ipConfigureTemplate').html();
	$('#controlDiv').append(Mustache.render(ipConfigureTemplate, column));
	



	
	//$('#' + column.col2Id).append(returnImage('http://localhost:9000/api/camera/' + '192.168.0.8' + '/', 'testImage'));
	
}

function returnImage(src, className){
	
	var ipAddress = '192.168.0.8';
	//$('#image').attr('src', 'http://localhost:9000/api/camera/' + ipAddress + '/');
	
	var img = document.createElement('img');
	//img.src = 'http://localhost:9000/api/camera/' + ipAddress + '/';
	img.src = src;
	img.className = className;
	return img;
		
}



