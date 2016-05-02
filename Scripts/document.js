var currentPage;
var cameraIp;
var cameraModel; //the camera object returned from the web service
var webService;
var motionConfigModel; //populated from the web service

$(document).ready(function () {
	currentPage = 0;
	webService = 'http://localhost:9000/api/';
	setMotionConfigModel();
	setButtonEvents();
	drawGetIP();
});

function clearControls(){
	$('#controlDiv').empty();
}

function hideBackButton(){ $('#btnBack').hide();}
function hideForwardButton(){ $('#btnForward').hide();}
function showBackButton(){ $('#btnBack').show();}
function showForwardButton(){ $('#btnForward').show();}

function setButtonEvents(){
	
	$('#btnBack').on('click', function(){ onBack(); });
	$('#btnForward').on('click', function(){ onForward(); });	
}

function onForward(){
	if(currentPage == 0){
		setCameraModel(drawSettings);
		drawSettings();
	}
	else if(currentPage == 1){
		currentPage = 2;
		updateMotionModel();
		startMotionDetection()
	}
}

function onBack(){
	if(currentPage == 1){
		currentPage = 0;
		drawGetIP();
	}
	else if(currentPage == 2){
		currentPage = 1;
		drawSettings();
	}
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
	currentPage = 1;
	clearControls();
	showBackButton();
	$('#header').text('Configure Motion Detection Session');
	
	//var settings = mockWebService();
	
	for(var i = 0; i < this.motionConfigModel.length; i++){
		
		addSettingItem(this.motionConfigModel[i].niceName, i.toString());
		
		if(this.motionConfigModel[i].configType.toLowerCase() == "string"){
			addTextInput(i.toString(), this.motionConfigModel[i].configName);
		}
		else if(this.motionConfigModel[i].configType.toLowerCase() == "boolean"){
			addBooleanInput(i.toString(), this.motionConfigModel[i].configName);
		}
		else if(this.motionConfigModel[i].configType.toLowerCase() == "int" || this.motionConfigModel[i].settingType.toLowerCase() == "double"){
			addNumberInput(i.toString(), this.motionConfigModel[i].configName);
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
	hideBackButton();
	$('#header').text('Configure IP Camera');
	
	var column = new Object();
	column.col1Id = "col1";	
	column.inputId = "txtIpAddress";
	column.col2Id = "col2";	
	column.btnId = "btnIpSearch";
	var ipConfigureTemplate = $('#ipConfigureTemplate').html();
	$('#controlDiv').append(Mustache.render(ipConfigureTemplate, column));
	$('#btnIpSearch').on('click', function(){onIpSearch();});
	
}

function drawMotionDetectionStarted(){
	
	clearControls();
	hideForwardButton();
	$('#header').text('Motion Detection in progress');
	
	var motionDetectionTemplate = $('#motionDetectionTemplate').html();
	$('#controlDiv').append(Mustache.render(motionDetectionTemplate, new Object()));
	$('.spinner').show();
	
	
}

function onIpSearch(){
	//when the user clicks the 'Search for camera' button
	cameraIp = $('#txtIpAddress').val();
	$('#ipImage').attr('src', webService + 'image/' + cameraIp + '/');	
}

function setCameraModel(fnc){
	//when the user clicks forward on the 'Configure IP Camera' page, sets the 
	//camera object by calling web service
	
		var that = this;
		var func = fnc;
		
		$.ajax({ 
			url:webService + 'camera/' + cameraIp + '/', 
			type: 'GET', 
			dataType: 'json', 
			success: function(response){ 
				that.cameraModel = response;
				func();
			},
			error: function() { 
				printError();
			},
		}); 
}

function setMotionConfigModel(){
	
		var that = this;
		
		$.ajax({ 
			url:webService + 'motionconfig', 
			type: 'GET', 
			dataType: 'json', 
			success: function(response){ 
				that.motionConfigModel = response.list;
			},
			error: function() { 
				printError();
			},
		}); 
	
}

function updateMotionModel(){
	//takes the users input and updates the model
	
	for(var i = 0; i < this.motionConfigModel.length; i++){
		
		var val = $('#' + this.motionConfigModel[i].configName).val();
		
		if(val != undefined && val != null && val.length > 0){
			
			this.motionConfigModel[i].userInput = val;
			
		}

	}
	
}

function startMotionDetection(){
	drawMotionDetectionStarted();
		
	var obj = new Object();
	obj.cameraModel = cameraModel;
	obj.list = motionConfigModel;

	
	$.ajax({ 
		url:webService + 'motion',
		type: 'POST', 
		dataType: 'json', 
		contentType:"application/json",
		data : JSON.stringify(obj),
		success: function(response){ 

		},
		error: function() { 
			printError();
		},
	}); 
	
	
}

function printError(){
	//implment me
}



