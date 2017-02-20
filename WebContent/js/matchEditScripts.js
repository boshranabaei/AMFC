var APPLICANT;

function requestApplicant() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "getSelectedApplicant"
		},
		success : function(data) {
			APPLICANT = data.applicant;
			fillInForm();
			return true;
		},
		error : function() {
			return false;
		}
	});
};

function updateApplicant(applicantFormData) {
	$.ajax({
		type : "POST",
		url : "/applicant",
		dataType : "json",
		data : {
			"applicant" : applicantFormData,
			"task" : "updateApplicant"
		},
		success : function(data) {
			if (data.mission == "accomplished") {
				toast("Applicant info updated successfully");
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

function selectApplicant(){
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "selectApplicant",
			"userId": APPLICANT.userId
		},
		success : function(data) {
			window.open("matchapplicant.html","_self");
			return true;
		},
		error : function() {
			return false;
		}
	});
	return true;

};

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
	return str.replace("\"", "").replace("\'", ""); 
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
			subtitle : 'Are your sure that you want to edit this applicant?',
			okText : 'Yes', // default: OK
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var json = "{\"userId\":"+APPLICANT.userId+",";
				for (var i = 1; i <= fieldLabels.length; i++) {
					if (i == 19 || i==27)
						continue;
					json += "\'" + fieldLabels[i - 1] + "\':";
					switch (i) { // integer case
					// gender
					case 4:
						if (content[i].checked == true)
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
						if (content[i].checked == true)
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
				updateApplicant(json);
			}

		// onCancel: function() {
		// mscAlert(":( You cancelled the.");
		// }
		//http://bitwiser.in/medium-style-confirm/
		});

	}
	return false;
};

function fillInForm(){
	content = document.forms[0].elements;
	content[1].value=APPLICANT.firstName;
	content[2].value=APPLICANT.lastName;
	content[3].value=APPLICANT.birthYear;
	content[6].value=APPLICANT.ethnicity;
	if(APPLICANT.hasOwnProperty("citizenship"))
		content[7].value=APPLICANT.citizenship;
	if(APPLICANT.maritalStatus=="single")
		content[8].selectedIndex=0;
	else if(APPLICANT.maritalStatus=="divorced")
		content[8].selectedIndex=1;
	else if(APPLICANT.maritalStatus=="widowed")
		content[8].selectedIndex=2;
	else if(APPLICANT.maritalStatus=="separated")
		content[8].selectedIndex=3;
	content[10].value=APPLICANT.children;
	if(APPLICANT.children!=0){
		content[10].disabled=false;
		content[9].checked="true";
	}
	if(APPLICANT.hasORwantsHijab=="no")
		content[13].selectedIndex=1;
	else if(APPLICANT.hasORwantsHijab=="no difference")
		content[13].selectedIndex=2;
	content[15].value=APPLICANT.relocate;
	if(APPLICANT.relocate!=0){
		content[16].disabled=false;
		content[16].value=APPLICANT.relocateWhere;
	}
	if(APPLICANT.hasOwnProperty("occupation"))
		content[17].value=APPLICANT.occupation;
	if(APPLICANT.hasOwnProperty("comments"))
		content[18].value=APPLICANT.comments;
	if(APPLICANT.hasOwnProperty("email"))
		content[20].value=APPLICANT.email;
	if(APPLICANT.hasOwnProperty("mobilePhoneNumber"))
		content[21].value=APPLICANT.mobilePhoneNumber;
	if(APPLICANT.hasOwnProperty("homePhoneNumber"))
		content[22].value=APPLICANT.homePhoneNumber;
	if(APPLICANT.hasOwnProperty("pointOfContact"))
		content[23].value=APPLICANT.pointOfContact;
	content[24].value=APPLICANT.city;
	if(APPLICANT.hasOwnProperty("province"))
		content[25].value=APPLICANT.province;
	content[26].value=APPLICANT.country;
	if(APPLICANT.prefMaritalStatus=="single")
		content[28].selectedIndex=1;
	else if(APPLICANT.prefMaritalStatus=="divorced")
		content[28].selectedIndex=2;
	else if(APPLICANT.prefMaritalStatus=="widowed")
		content[28].selectedIndex=3;
	else if(APPLICANT.prefMaritalStatus=="separated")
		content[28].selectedIndex=4;
	if(APPLICANT.prefAgeMin!=0)
		content[29].value=APPLICANT.prefAgeMin + APPLICANT.age;
	if(APPLICANT.prefAgeMax!=0)
		content[30].value=APPLICANT.prefAgeMax + APPLICANT.age;
	if(APPLICANT.hasOwnProperty("prefEthnicity"))
		content[31].value=APPLICANT.prefEthnicity;
	if(APPLICANT.hasOwnProperty("prefCountry"))
		content[33].value=APPLICANT.prefCountry;
	if(APPLICANT.hasOwnProperty("prefComments"))
		content[34].value=APPLICANT.prefComments;
	if(APPLICANT.hasOwnProperty("amfcPointOfContact"))
		content[35].value=APPLICANT.amfcPointOfContact;
	if(APPLICANT.gender==1)
		content[5].checked="true";
	else
		content[4].checked="true";
	if(APPLICANT.smoke==1)
		content[13].checked="true";
	else
		content[12].checked="true";
	document.getElementById("backNavigation").innerHTML = "<a href=\"match.html\">" +
	"<div class=\"ion-ios-arrow-back\"></div>Applicants</a>" +
	"<a id=\"backToMatchApp\" href=\"matchapplicant.html\"><div class=\"ion-ios-arrow-back\"></div>"
	+APPLICANT.firstName+" "+APPLICANT.lastName+"<a>";
	document.getElementById("backToMatchApp").onclick=selectApplicant;
}
$( document ).ready(function() {
requestApplicant();
});
