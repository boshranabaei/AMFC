var content;
var selectedPhoto = {};
var fieldLabels = [ "firstName", "lastName", "gender", "gender", "birthYear", "ethnicity", 
                    "citizenship", "maritalStatus", "children",
                    "smoke", "smoke", "hasORwantsHijab","relocate", "relocateWhere", 
                    "education", "occupation", "comments", "email","email",
                    "mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
                    "province", "country", "prefMaritalStatus","prefMaritalStatus",
                    "prefEthnicity", "prefEducation", "prefCountry", "prefAgeMin", "prefAgeMax","prefComments"];

function toggleRegister() {
	if(document.getElementById("human").checked && document.getElementById("agree").checked){
		document.getElementById("register").disabled=false;
	}else{
		document.getElementById("register").disabled=true;
	}
}

function toggleChildren() {
	if (document.forms[0].elements[11].disabled == false){
		document.forms[0].elements[11].disabled = true;
		document.forms[0].elements[11].value = 0;
	}
	else{
		document.forms[0].elements[11].disabled = false;
		document.forms[0].elements[11].value = "";
	}
}

function toggleRelocate() {
	if (document.forms[0].elements[14].disabled == false){
		document.forms[0].elements[14].disabled = true;
		document.forms[0].elements[14].style.backgroundColor = "#cececa";
	}
	else{
		document.forms[0].elements[14].disabled = false;
		document.forms[0].elements[14].style.backgroundColor = "rgba(144, 144, 144, 0.075)";
	}
	document.forms[0].elements[14].value = "";
}


function cleanSpecialChars(str){
	str= String(str);
	return str.replace(/['"]+/g, '')
				.replace(/[^\w\s]/gi, '')
				.replace(/\\n/g, "\\n")
			    .replace(/\\'/g, "\\'")
			    .replace(/\\"/g, '\\"')
			    .replace(/\\&/g, "\\&")
			    .replace(/\\r/g, "\\r")
			    .replace(/\\t/g, "\\t")
			    .replace(/\\b/g, "\\b")
			    .replace(/[\/]/g, '\\/')
			    .replace(/\\f/g, "\\f")
			    .replace(/\x18/g, "")
			    .replace(/\x0B/g,''); 
}

function greyBorders(){
	
	content[1].style.border = "1px solid #E1E1E1";
	content[2].style.border = "1px solid #E1E1E1";
	content[5].style.border = "1px solid #E1E1E1";
	content[6].style.border = "1px solid #E1E1E1";
	content[8].style.border = "1px solid #E1E1E1";
	content[9].style.border = "1px solid #E1E1E1";
	content[19].style.border = "1px solid #E1E1E1";
	content[23].style.border = "1px solid #E1E1E1";
	content[25].style.border = "1px solid #E1E1E1";
	content[31].style.border = "1px solid #E1E1E1";
	content[32].style.border = "1px solid #E1E1E1";
	
}

function toast(message) {
	var x = document.getElementById("snackbar")
	x.className = "show";
	x.innerText = message;
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}

function addApplicant(applicantFormData) {
	greyBorders();
	$.ajax({
		type : "POST",
		url : "/applicant",
		dataType : "json",
		data : {
			"applicant" : applicantFormData,
			"photo" : selectedPhoto,
			"task" : "newPublicRegistration"
		},
		success : function(data) {
			if (data.mission == "accomplished") {
				window.open("approved.html","_self");
				
			} else {
				toast("Server Error");
			}
		},
		error : function() {
			toast("Server Error");
		}
	});
	return false;
};

function submitApplicant() {

	content = document.forms[0].elements;

	// Validation

	if (content[1].value == "" || content[2].value == ""
			|| content[5].value == ""
			|| content[6].value == "" || content[8].value == ""
			|| content[9].value == ""|| content[19].value == ""
			|| content[23].value == "" || content[25].value == "") {
		greyBorders();
		
		if (content[1].value == "") {
			content[1].style.border = "1px solid red";
		} 
		if (content[2].value == "") {
			content[2].style.border = "1px solid red";
		} 
		if (content[5].value == "") {
			content[5].style.border = "1px solid red";
		} 
		if (content[6].value == "") {
			content[6].style.border = "1px solid red";
		} 
		if (content[8].value == "") {
			content[8].style.border = "1px solid red";
		} 
		if (content[9].value == "") {
			content[9].style.border = "1px solid red";
		} 
		if (content[19].value == "") {
			content[19].style.border = "1px solid red";
		} 
		if (content[23].value == "") {
			content[23].style.border = "1px solid red";
		} 
		if (content[25].value == "") {
			content[25].style.border = "1px solid red";
		} 
		toast("Please fill in the required fields.");

	} else if (content[31].value != "" && content[32].value != ""
			&& parseInt(content[31].value) > parseInt(content[32].value)) {
		greyBorders();
		content[31].style.border = "1px solid red";
		content[32].style.border = "1px solid red";
		toast("Wrong age range for the prefered match.");
		
	} else if (isNaN(content[5].value) || content[5].value<1930 || content[5].value > (new Date().getFullYear())-12) {
		greyBorders();
		content[5].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");

	} else if (isNaN(content[9].value)) {
		greyBorders();
		content[9].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");

	} else if (isNaN(content[31].value)) {
		greyBorders();
		content[31].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else if (isNaN(content[32].value)) {
		greyBorders();
		content[32].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else {
		mscConfirm({
			title : 'Confirmation',
			subtitle : 'Are your want to submit this registraion?',
			okText : 'Yes', // default: OK
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var json = "{";
				for (var i = 1; i <= fieldLabels.length; i++) {
					if (i== 36 || i==37 || i== 38)
						continue;
					json += "\'" + fieldLabels[i - 1] + "\':";
					switch (i) { // integer case
					// gender
					case 3:
						if (content[i].checked == true)
							json += 0;
						else
							json += 1;
						i++;
						break;
					// smoke
					case 10:
						if (content[i].checked == true)
							json += 1;
						else
							json += 0;
						i++;
						break;
					// relocate
					case 13:
						if (content[i].checked)
							json += 1;
						else
							json += 0;
						break;
					// relocateWhere?
					case 14:
						if (content[i].value != "")
							json += cleanSpecialChars(content[i].value);
						else
							json += "where?";
						break;
					// pref Age
					case 31:
					case 32:
						if (content[i].value != "")
							json += cleanSpecialChars(content[i].value);
						else
							json += 0;
						break;
					default:
						json += "\'" + cleanSpecialChars(content[i].value) + "\'";
						break;
					}
					if (i != fieldLabels.length) {
						json += ",";
					}
				}
				json += "}";
				addApplicant(json);
			}

		// onCancel: function() {
		// mscAlert(":( You cancelled the.");
		// }
		//http://bitwiser.in/medium-style-confirm/
		});

	}
	return false;
};

function toggleattach(){
	document.getElementById("attach").style.color = "black";
	$("#attach").attr("value","Attach");
	$("#progress").html("");

	if($(":file")[0].files.length!=0){
		$("input#attach").attr("disabled", false);
	}
	else{
		$("input#attach").attr("disabled", true);
	}
}

function attachOrRemovePhoto(){	
	if($(":file")[0].files.length==0)
		return;
	
	if($("#attach").attr("value")=="Delete"){
		$("#attach").attr("value","attach");
		$("#progress").html("");
		selectedPhoto={}
		return;
	}
	
    var file = $(":file")[0].files[0];
    name = file.name;
    size = file.size;
    type = file.type;

    if(file.name.length < 1) {
    }
    else if(file.size > 2000000) {
    	toast("The file is too big");
        $("#progress").html("");
        $("input#attach").attr("border", false);
        document.forms[0].elements[36].style.border = "1px solid red";
    }
    else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
        toast("The file does not match png, jpg or gif");
        $("#progress").html("");
        document.forms[0].elements[36].style.border = "1px solid red";
    }
    else{
    	$("#progress").html("attaching...");
    	document.getElementById("attach").style.color = "black";
    	$("#attach").attr("value","Delete");
    	var formData = new FormData();
    	formData.append('file', $('input[type=file]')[0].files[0]);
   	  	var reader = new FileReader();
   	  	reader.onload = readerOnload;
   	  	x=reader.readAsBinaryString(file)
    }
};

function readerOnload(e){
    var base64 = btoa(e.target.result);
    selectedPhoto.base64 = base64;
    $("#progress").html("successfully attached");
}


$( document ).ready(function() {
	$("#human").change(toggleRegister);
	$("#agree").change(toggleRegister);
	$(":file").change(toggleattach);
	$("#attach").click(attachOrRemovePhoto);
	$("#relocate").click(toggleRelocate);
	document.forms[0].elements[14].style.backgroundColor = "#cececa";
	$("#register").click(submitApplicant);
	$(document).keypress(function(e) {
		  if(e.which == 13) {
			  submitApplicant(); 
		  }
		});
	
});
