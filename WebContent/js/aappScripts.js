var content;

var fieldLabels = [ "firstName", "lastName", "birthYear", "approximateAge", "gender", "gender",
		"ethnicity", "citizenship", "maritalStatus", "children", "children",
		"smoke", "smoke", "hasORwantsHijab", "relocate", "relocateWhere",
		"education", "occupation", "comments", "email", "email",
		"mobilePhoneNumber", "homePhoneNumber", "pointOfContact", "city",
		"province", "country", "prefMaritalStatus", "prefMaritalStatus", "prefAgeMin", "prefAgeMax",
		"prefEthnicity", "prefEducation", "prefCountry", "prefComments",
		"amfcPointOfContact" ];

function toggleChildren() {
	if (document.forms[0].elements[11].disabled == false)
		document.forms[0].elements[11].disabled = true;
	else
		document.forms[0].elements[11].disabled = false;
}
function toggleRelocate() {
	if (document.forms[0].elements[16].disabled == false)
		document.forms[0].elements[16].disabled = true;
	else
		document.forms[0].elements[16].disabled = false;
}

function replaceQuotes(str){
	str= String(str);
	return str.replace("\"", "").replace("\'", ""); 
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
			|| content[3].value == "" || content[7].value == ""
			|| content[25].value == "" || content[27].value == ""
			|| content[36].value == "") {
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
		
	} else if (isNaN(content[30].value)) {
		greyBorders();
		content[30].style.border = "1px solid red";
		toast("Wrong value for some of the inputs.");
		
	} else if (isNaN(content[31].value)) {
		greyBorders();
		content[31].style.border = "1px solid red";
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
					if (i == 20 || i==28)
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
				var fileSelect = document.getElementById('photo');
				if(fileSelect.value != ""){
					// Get the selected files from the input.
					var files = fileSelect.files;
					// Create a new FormData object.
					var formData = new FormData();
					var file = files[0];
					// Check the file type.
					if (!file.type.match('image.*')) {
						continue;
					}
					// Add the file to the request.
					formData.append('photos[]', file, file.name);
				}
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

function uploadPhoto(){
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;

    if(file.name.length < 1) {
    }
    else if(file.size > 10000000) {
        alert("The file is too big");
    }
    else if(file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg' ) {
        alert("The file does not match png, jpg or gif");
    }
    else { 
        $(':submit').click(function(){
            var formData = new FormData($('*formId*')[0]);
            $.ajax({
                url: '/applicant',  //server script to process data
                type: 'POST',
                xhr: function() {  // custom xhr
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // if upload property exists
                        myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // progressbar
                    }
                    return myXhr;
                },
                // Ajax events
                success: completeHandler = function(data) {
                    /*
                    * Workaround for Chrome browser // Delete the fake path
                    */
                    if(navigator.userAgent.indexOf('Chrome')) {
                        var catchFile = $(":file").val().replace(/C:\\fakepath\\/i, '');
                    }
                    else {
                        var catchFile = $(":file").val();
                    }
                    var writeFile = $(":file");
                    writeFile.html(writer(catchFile));
                    $("*setIdOfImageInHiddenInput*").val(data.logo_id);
                },
                error: errorHandler = function() {
                    alert("Something went wrong!");
                },
                // Form data
                data: formData,
                // Options to tell jQuery not to process data or worry about the content-type
                cache: false,
                contentType: false,
                processData: false
            }, 'json');
        });
    }
};

$( document ).ready(function() {
	$(':file').change(uploadPhoto);
});
