var content;

var fieldLabels = [ "firstName", "lastName", "birthYear", "gender", "gender",
		"ethnicity", "citizenship", "maritalStatus", "children", "children",
		"smoke", "smoke", "hasORwantsHijab", "relocate", "relocateWhere",
		"education", "occupation", "comments", "email", "email",
		"mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
		"province", "country", "prefMaritalStatus", "prefMaritalStatus", "prefAgeMin", "prefAgeMax",
		"prefEthnicity", "prefEducation", "prefCountry", "prefComments",
		"amfcPointOfContact" ];

function toggleChildren() {
	if (document.forms[0].elements[10].disabled == false)
		document.forms[0].elements[10].disabled = true;
	else
		document.forms[0].elements[10].disabled = false;
}
function toggleRelocate() {
	if (document.forms[0].elements[15].disabled == false)
		document.forms[0].elements[15].disabled = true;
	else
		document.forms[0].elements[15].disabled = false;
}

function replaceQuotes(str){
	str= String(str);
	return str.replace("\"", " ").replace("\'", " "); 
}

function greyBorders(){
	content[1].style.border = "1px solid #E1E1E1";
	content[2].style.border = "1px solid #E1E1E1";
	content[3].style.border = "1px solid #E1E1E1";
	content[6].style.border = "1px solid #E1E1E1";
	content[10].style.border = "1px solid #E1E1E1";
	content[24].style.border = "1px solid #E1E1E1";
	content[26].style.border = "1px solid #E1E1E1";
	content[35].style.border = "1px solid #E1E1E1";
	content[29].style.border = "1px solid #E1E1E1";
	content[30].style.border = "1px solid #E1E1E1";
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
	$.ajax({
		type : "POST",
		url : "/applicant",
		dataType : "json",
		data : {
			"applicant" : applicantFormData,
			"task" : "newApplicant"
		},
		success : function(data) {
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
			|| content[3].value == "" || content[6].value == ""
			|| content[24].value == "" || content[26].value == ""
			|| content[35].value == "") {
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
		if (content[6].value == "") {
			content[6].style.border = "1px solid red";
		} 
		if (content[24].value == "") {
			content[24].style.border = "1px solid red";
		} 
		if (content[26].value == "") {
			content[26].style.border = "1px solid red";
		} 
		if (content[35].value == "") {
			content[35].style.border = "1px solid red";
		} 
		toast("Please fill in the required fields.");

	} else if (content[29].value != "" && content[30].value != ""
			&& parseInt(content[29].value) > parseInt(content[30].value)) {
		greyBorders();
		content[29].style.border = "1px solid red";
		content[30].style.border = "1px solid red";
		toast("Wrong age range for the prefered match.");
		
	} else if (isNaN(content[10].value)) {
		greyBorders();
		content[10].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else if (isNaN(content[29].value)) {
		greyBorders();
		content[29].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else if (isNaN(content[30].value)) {
		greyBorders();
		content[30].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	}else {
		mscConfirm({
			title : 'Confirmation',
			subtitle : 'Are your sure that you want to add this applicant?',
			okText : 'Yes', // default: OK
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var json = "{";
				for (var i = 1; i <= fieldLabels.length; i++) {
					if (i == 19 || i==27)
						continue;
					json += "\'" + fieldLabels[i - 1] + "\':";
					switch (i) { // integer case
					// gender
					case 4:
						if (content[i].checked == "true")
							json += 0;
						else
							json += 1;
						i++;
						break;
					// children
					case 9:
						json += replaceQuotes(content[i + 1].value);
						i++;
						break;
					// smoke
					case 11:
						if (content[i].value == "true")
							json += 1;
						else
							json += 0;
						i++;
						break;
					// relocate
					case 14:
						if (content[i].checked)
							json += 1;
						else
							json += 0;
						break;
					// pref Age
					case 29:
					case 30:
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
