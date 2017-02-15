var fieldLabels = [ "firstName", "lastName", "dateOfBirth", "gender", "gender",
		"ethnicity", "citizenship", "maritalStatus", "children", "children",
		"smoke", "smoke", "hasORwantsHijab", "relocate", "relocateWhere",
		"education", "occupation", "occupationComments", "email",
		"mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
		"province", "country", "prefMaritalStatus", "prefAgeMin", "prefAgeMax",
		"prefEthnicity", "prefEducation", "prefComments", "amfcPointOfContact" ];

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

function addApplicant(applicantFormData) {
	alert(applicantFormData);
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
				alert("The new applicant is added successfully");
			} else {
				alert("Server Error1");
			}
		},
		error : function() {
			alert("Server Error");
		}
	});
	return false;
};

function submitApplicant() {

	var content = document.forms[0].elements;

	// Validation

//	if (content[1].value == "" || content[2].value == ""
//			|| content[3].value == ""
//			|| (content[4].checked == "false" && content[5].checked == "false")
//			|| content[6].value == "" || content[24].value == ""
//			|| content[26].value == ""|| content[35].value == "") {
//
//		alert("Please fill in the required fields.");
//
//	} else if (content[28].value != "" && content[29].value != ""
//			&& content[28].value > content[29].value) {
//
//		alert("Wrong age range for the prefered match.");
//	} else {
		alert("Are your sure that you want to add this applicant?");
		var json = "{";
		for (var i = 0; i < fieldLabels.length; i++) {
			json += "\'" + fieldLabels[i] + "\':";
			switch (i) { // integer case
			// gender
			case 4:
				if (content[4].value == "true")
					json += 0;
				else
					json += 1;
				i++;
				break;
			// children
			case 9:
				json += content[10].value;
				i++;
				// smoke
			case 11:
				if (content[11].value == "true")
					json += 1;
				else
					json += 0;
				i++;
				break;
			// smoke
			default:
				json += "\'" + content[i].value + "\'";
				break;
			}
			if (i != fieldLabels.length - 1) {
				json += ",";
			}
		}
		json += "}";
		addApplicant(json);
		return false;
//	}
};
