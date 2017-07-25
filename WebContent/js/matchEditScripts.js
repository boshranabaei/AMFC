var APPLICANT;
var selectedPhoto = {};
var content;
var fieldLabels = [ "firstName", "lastName", "birthYear","approximateAge", "gender", "gender",
		"ethnicity", "citizenship", "maritalStatus", "children", "children",
		"smoke", "smoke", "hasORwantsHijab", "relocate", "relocateWhere",
		"education", "occupation", "comments", "email", "email",
		"mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
		"province", "country", "prefMaritalStatus", "prefMaritalStatus", "prefAgeMin", "prefAgeMax",
		"prefEthnicity", "prefEducation", "prefCountry", "prefComments",
		"amfcPointOfContact", "amfcPointOfContact", "amfcPointOfContact", "amfcPointOfContact" ];

function requestApplicant() {
	$.ajax({
		type : "Post",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "getSelectedApplicant"
		},
		success : function(data) {
			sessionIsValid(data.session);
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
			"photo" : selectedPhoto,
			"task" : "updateApplicant"
		},
		success : function(data) {
			sessionIsValid(data.session);
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
			sessionIsValid(data.session);
			window.open("matchapplicant.html","_self");
			return true;
		},
		error : function() {
			return false;
		}
	});
	return true;

};

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

function submitApplicant() {
	content = document.forms[0].elements;

	// Validation

	if (content[1].value == "" || content[2].value == ""
			|| content[3].value == "" || content[7].value == ""
			|| content[25].value == "" || content[27].value == ""
			|| content[36].value == "" || content[11].value == "") {
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
	}
	else if($(":file")[0].files.length!=0 && jQuery.isEmptyObject(selectedPhoto)){
		content[37].style.border = "2px solid red";
		toast("Don't forget to attach your selected photo!");		
			
	}else {
		mscConfirm({
			title : 'Confirmation',
			subtitle : 'Are your sure that you want to edit this applicant?',
			okText : 'Yes', // default: OK
			cancelText : 'Cancel', // default: Cancel,
			onOk : function(val) {
				var json = "{\"userId\":"+APPLICANT.userId+",";
				json +="\"dateAdded\":\""+APPLICANT.dateAdded+"\",";
				json +="\"status\":\""+APPLICANT.status+"\",";
				for (var i = 1; i <= fieldLabels.length; i++) {
					if (i == 20 || i==28 || i == 36 || i == 37 || i == 38)
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
						json += cleanSpecialChars(content[i + 1].value);
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
					// relocateWhere?
					case 16:
						if (content[i].value != "")
							json += "\'" + cleanSpecialChars(content[i].value)
									+"\'";
						else
							json += "\'" + "where?" +"\'";
						break;
					// pref Age
					case 30:
					case 31:
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
	if(APPLICANT.hasOwnProperty("photo") && APPLICANT.photo != "null"){
		selectedPhoto.base64 = APPLICANT.photo;
		$("#attach").attr("value","Delete");
		$("#progress").html("A photo exists");
		$("input#attach").attr("disabled", false);
		$('#attach').click(attachOrRemovePhoto);
	}	
	content = document.forms[0].elements;
	content[1].value=APPLICANT.firstName;
	content[2].value=APPLICANT.lastName;
	content[3].value=APPLICANT.birthYear;
	content[7].value=APPLICANT.ethnicity;
	if(APPLICANT.hasOwnProperty("citizenship"))
		content[8].value=APPLICANT.citizenship;
	if(APPLICANT.maritalStatus=="single")
		content[9].selectedIndex=0;
	else if(APPLICANT.maritalStatus=="divorced")
		content[9].selectedIndex=1;
	else if(APPLICANT.maritalStatus=="widowed")
		content[9].selectedIndex=2;
	else if(APPLICANT.maritalStatus=="separated")
		content[9].selectedIndex=3;
	content[11].value=APPLICANT.children;
	if(APPLICANT.children!=0){
		content[11].disabled=false;
		content[10].checked="true";
	}
	if(APPLICANT.hasORwantsHijab=="no")
		content[14].selectedIndex=1;
	else if(APPLICANT.hasORwantsHijab=="no difference")
		content[14].selectedIndex=2;
	content[16].value=APPLICANT.relocate;
	if(APPLICANT.relocate!=0){
		content[17].disabled=false;
		content[17].value=APPLICANT.relocateWhere;
	}
	
	if(APPLICANT.education=="unknown")
		content[17].selectedIndex=0;
	else if(APPLICANT.education=="someSchooling")
		content[17].selectedIndex=1;
	else if(APPLICANT.education=="highSchool")
		content[17].selectedIndex=2;
	else if(APPLICANT.education=="collegeDiploma")
		content[17].selectedIndex=3;
	else if(APPLICANT.education=="bachelors")
		content[17].selectedIndex=4;
	else if(APPLICANT.education=="masters")
		content[17].selectedIndex=5;
	else if(APPLICANT.education=="doctoral")
		content[17].selectedIndex=6;
	if(APPLICANT.prefEducation=="unknown")
		content[33].selectedIndex=0;
	else if(APPLICANT.prefEducation=="someSchooling")
		content[33].selectedIndex=1;
	else if(APPLICANT.prefEducation=="highSchool")
		content[33].selectedIndex=2;
	else if(APPLICANT.prefEducation=="collegeDiploma")
		content[33].selectedIndex=3;
	else if(APPLICANT.prefEducation=="bachelors")
		content[33].selectedIndex=4;
	else if(APPLICANT.prefEducation=="masters")
		content[33].selectedIndex=5;
	else if(APPLICANT.prefEducation=="doctoral")
		content[33].selectedIndex=6;
	
	if(APPLICANT.hasOwnProperty("occupation"))
		content[18].value=APPLICANT.occupation;
	if(APPLICANT.hasOwnProperty("comments"))
		content[19].value=APPLICANT.comments;
	if(APPLICANT.hasOwnProperty("email"))
		content[21].value=APPLICANT.email;
	if(APPLICANT.hasOwnProperty("mobilePhoneNumber"))
		content[22].value=APPLICANT.mobilePhoneNumber;
	if(APPLICANT.hasOwnProperty("homePhoneNumber"))
		content[23].value=APPLICANT.homePhoneNumber;
	if(APPLICANT.hasOwnProperty("pointOfContact"))
		content[24].value=APPLICANT.pointOfContact;
	content[25].value=APPLICANT.city;
	if(APPLICANT.hasOwnProperty("province"))
		content[26].value=APPLICANT.province;
	content[27].value=APPLICANT.country;
	if(APPLICANT.prefMaritalStatus=="single")
		content[29].selectedIndex=1;
	else if(APPLICANT.prefMaritalStatus=="divorced")
		content[29].selectedIndex=2;
	else if(APPLICANT.prefMaritalStatus=="widowed")
		content[29].selectedIndex=3;
	else if(APPLICANT.prefMaritalStatus=="separated")
		content[29].selectedIndex=4;
	if(APPLICANT.prefAgeMin!=0)
		content[30].value= APPLICANT.age - APPLICANT.prefAgeMin;
	if(APPLICANT.prefAgeMax!=0)
		content[31].value= APPLICANT.age - APPLICANT.prefAgeMax;
	if(APPLICANT.hasOwnProperty("prefEthnicity"))
		content[32].value=APPLICANT.prefEthnicity;
	if(APPLICANT.hasOwnProperty("prefCountry"))
		content[34].value=APPLICANT.prefCountry;
	if(APPLICANT.hasOwnProperty("prefComments"))
		content[35].value=APPLICANT.prefComments;
	if(APPLICANT.hasOwnProperty("amfcPointOfContact"))
		content[39].value=APPLICANT.amfcPointOfContact;
	if(APPLICANT.relocateWhere=="where?"){
		content[16].value="where?";
		content[16].disabled=true;
	}
	else{
		content[16].value=APPLICANT.relocateWhere;
		content[16].disabled=false;
	}
	if(APPLICANT.children!=0){
		content[11].value=APPLICANT.children;
		content[11].disabled=false;
	}
	if(APPLICANT.gender==1)
		content[6].checked="true";
	else
		content[5].checked="true";
	if(APPLICANT.smoke==1)
		content[12].checked="true";
	else
		content[13].checked="true";
	if(APPLICANT.approximateAge==1)
		content[4].checked="true";
	if(APPLICANT.relocate==1)
		content[15].checked="true";
	
	document.getElementById("backNavigation").innerHTML = "<a href=\"match.html\">" +
	"<div class=\"ion-ios-arrow-back\"></div>Applicants</a>" +
	"<a id=\"backToMatchApp\" href=\"matchapplicant.html\"><div class=\"ion-ios-arrow-back\"></div>"
	+APPLICANT.firstName+" "+APPLICANT.lastName+"<a>";
	document.getElementById("backToMatchApp").onclick=selectApplicant;
}

function toggleattach(){
	document.getElementById("attach").style.color = "black";
	$("#attach").attr("value","Attach");
	$("#progress").html("");

	if($(":file")[0].files.length!=0){
		$("input#attach").attr("disabled", false);
		document.forms[0].elements[38].style.border = "2px solid red";
	}
	else{
		$("input#attach").attr("disabled", true);
		document.forms[0].elements[38].style.border = "1px solid #E1E1E1";
		$(":file")[0].value="";
	}
}

function attachOrRemovePhoto(){	
	
	if($("#attach").attr("value")=="Delete"){
		$("#attach").attr("value","attach");
		$("#progress").html("");
		selectedPhoto={}
		document.forms[0].elements[38].style.border = "1px solid #E1E1E1";
		$("input#attach").attr("disabled", true);
		$(":file")[0].value="";

		return;
	}

	if($(":file")[0].files.length==0)
		return;
	
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
   	  	document.forms[0].elements[38].style.border = "1px solid #E1E1E1";
   	  	x=reader.readAsBinaryString(file)
    }
};

function readerOnload(e){
    var base64 = btoa(e.target.result);
    selectedPhoto.base64 = base64;
    $("#progress").html("successfully attached");
}


$( document ).ready(function() {
	$(":file").change(toggleattach);
	$('#attach').click(attachOrRemovePhoto);
	$("input#attach").attr("disabled", true);
	document.forms[0].elements[38].style.border = "1px solid #E1E1E1";
	requestApplicant();
});
