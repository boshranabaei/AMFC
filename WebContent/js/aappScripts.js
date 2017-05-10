var content;
var selectedPhoto = {};
var fieldLabels = [ "firstName", "lastName", "birthYear", "approximateAge", "gender", "gender",
		"ethnicity", "citizenship", "maritalStatus", "children", "children",
		"smoke", "smoke", "hasORwantsHijab", "relocate", "relocateWhere",
		"education", "occupation", "comments", "email", "email",
		"mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
		"province", "country", "prefMaritalStatus", "prefMaritalStatus", "prefAgeMin", "prefAgeMax",
		"prefEthnicity", "prefEducation", "prefCountry", "prefComments",
		"amfcPointOfContact","amfcPointOfContact","amfcPointOfContact","amfcPointOfContact" ];

function checkSession(){
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "checkSession"
		},
		success : function(data) {
			sessionIsValid(data.session);
			return true;
		},
		error : function() {
			return false;
		}
	});
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
	if (document.forms[0].elements[16].disabled == false){
		document.forms[0].elements[16].disabled = true;
		document.forms[0].elements[16].value = "where?";
	}
	else
		document.forms[0].elements[16].disabled = false;
		document.forms[0].elements[16].value = "";
}


function replaceQuotes(str){
	str= String(str);
	return str.replace(/['"]+/g, ''); 
}

function greyBorders(){
	content[1].style.border = "1px solid #E1E1E1";
	content[2].style.border = "1px solid #E1E1E1";
	content[3].style.border = "1px solid #E1E1E1";
	content[7].style.border = "1px solid #E1E1E1";
	content[11].style.border = "1px solid #E1E1E1";
	content[25].style.border = "1px solid #E1E1E1";
	content[27].style.border = "1px solid #E1E1E1";
	content[30].style.border = "1px solid #E1E1E1";
	content[31].style.border = "1px solid #E1E1E1";
	content[36].style.border = "1px solid #E1E1E1";
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
			"task" : "newApplicant"
		},
		success : function(data) {
			sessionIsValid(data.session);
			if (data.mission == "accomplished") {
				toast("The new applicant is added successfully");
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
			|| content[3].value == "" || content[7].value == ""
			|| content[25].value == "" || content[27].value == ""
			|| content[36].value == ""|| content[11].value == "") {
		greyBorders();
		
		if (content[1].value == "") {
			content[1].style.border = "1px solid red";
		} 
		if (content[2].value == "") {
			content[2].style.border = "1px solid red";
		} 
		if (content[3].value == "") {
			content[3].style.border = "1px solid red";
		} 
		if (content[7].value == "") {
			content[7].style.border = "1px solid red";
		} 
		if (content[11].value == "") {
			content[11].style.border = "1px solid red";
		} 
		if (content[25].value == "") {
			content[25].style.border = "1px solid red";
		} 
		if (content[27].value == "") {
			content[27].style.border = "1px solid red";
		} 
		if (content[36].value == "") {
			content[36].style.border = "1px solid red";
		} 
		toast("Please fill in the required fields.");

	} else if (content[30].value != "" && content[31].value != ""
			&& parseInt(content[30].value) > parseInt(content[31].value)) {
		greyBorders();
		content[30].style.border = "1px solid red";
		content[31].style.border = "1px solid red";
		toast("Wrong age range for the prefered match.");
		
	} else if (isNaN(content[11].value)) {
		greyBorders();
		content[11].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
	} else if (content[10].checked && content[11].value==0){
				greyBorders();
				content[11].style.border = "1px solid red";
				toast("0 children? Why did you check it?");
	} else if (isNaN(content[30].value)) {
		greyBorders();
		content[30].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else if (isNaN(content[31].value)) {
		greyBorders();
		content[31].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else {
		mscConfirm({
			title : 'Confirmation',
			subtitle : 'Are your sure that you want to add this applicant?',
			okText : 'Yes', // default: OK
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var json = "{";
				for (var i = 1; i <= fieldLabels.length; i++) {
					if (i == 20 || i==28 || i== 36 || i==37 || i== 38)
						continue;
					json += "\'" + fieldLabels[i - 1] + "\':";
					switch (i) { // integer case
					// gender
					case 5:
						if (content[i].checked == true)
							json += 0;
						else
							json += 1;
						i++;
						break;
					// children
					case 10:
						json += replaceQuotes(content[i + 1].value);
						i++;
						break;
					// smoke
					case 12:
						if (content[i].checked == true)
							json += 1;
						else
							json += 0;
						i++;
						break;
					// guess
					// relocate
					case 4:
					case 15:
						if (content[i].checked)
							json += 1;
						else
							json += 0;
						break;
					// pref Age
					case 30:
					case 31:
						if (content[i].value != "")
							json += replaceQuotes(content[i].value);
						else
							json += 0;
						break;
					default:
						json += "\'" + replaceQuotes(content[i].value) + "\'";
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
    	document.getElementById("attach").style.color = "red";
        $("#progress").html("");
        $("input#attach").attr("border", false);        
    }
    else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
        toast("The file does not match png, jpg or gif");
        document.getElementById("attach").style.color = "red";
        $("#progress").html("");
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
	checkSession();
	$(":file").change(toggleattach);
	$('#attach').click(attachOrRemovePhoto);
});
