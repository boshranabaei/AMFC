var ADMINS, userIndex, username;
var table = document.createElement('table');
table.id = "applicantsTable";


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toast(message) {
	var x = document.getElementById("snackbar")
	x.className = "show";
	x.innerText = message;
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}

function requestAdmins() {
	$.ajax({
		type : "POST",
		url : "/settings",
		dataType : "json",
		data : {
			task: "requestAdmins"
		},
		success : function(data) {
			sessionIsValid(data.session);
			ADMINS = data.admins;
			fillInProfile();
			drawHeaders();
			drawRows();
		},
		error : function() {
			toast("Server Error");
		}
	});
}

function updateProfile() {
	if (document.forms[0].elements[0].value == "" || document.forms[0].elements[1].value == "" ||
			document.forms[0].elements[2].value == "" || document.forms[0].elements[3].value == "") {
		toast("Please fill in all of the fields");
		document.forms[0].elements[4].style.border = "1px solid red";
	} else {
		$.ajax({
			type : "POST",
			url : "/settings",
			dataType : "json",
			data : {
				task: "updateProfile",
				username : USERNAME,
				firstName : document.forms[0].elements[0].value,
				lastName : document.forms[0].elements[1].value,
				email: 	document.forms[0].elements[2].value,
				phoneNumber: document.forms[0].elements[3].value
			},
			success : function(data) {
				sessionIsValid(data.session);
				if (data.mission == "accomplished") {
					toast("Successfully updated profile info");
				} else{
					toast("Server Error");	
				}
			},
			error : function() {
				toast("Server Error");
			}
		});
	}
	return false;
}

function changePassword() {
	if (document.forms[1].elements[1].value != document.forms[1].elements[2].value) {
		toast("New password confirmation does not match.");
		document.forms[1].elements[3].style.border = "1px solid red";
	}else if (document.forms[1].elements[1].value != document.forms[1].elements[0].value) {
		toast("New password is same as old password.");
		document.forms[1].elements[3].style.border = "1px solid red";
	} else {
		$.ajax({
			type : "POST",
			url : "/settings",
			dataType : "json",
			data : {
				task: "changePassword",
				username : USERNAME,
				oldPassword : document.forms[1].elements[0].value,
				newPassword : document.forms[1].elements[1].value
			},
			success : function(data) {
				sessionIsValid(data.session);
				if (data.mission == "accomplished") {
					toast("Password Changed");
					document.forms[1].elements[0].value="";
					document.forms[1].elements[1].value="";
					document.forms[1].elements[2].value="";
				} else {
					toast("Old password is not valid");
					document.forms[1].elements[0].style.border = "1px solid red";
				}
			},
			error : function() {
				toast("Server Error");
			}
		});
	}
	return false;
}

function fillInProfile(){
	userIndex=0;
	for(var i=0; i<ADMINS.length;i++){
		if(ADMINS[i].username==USERNAME){
			userIndex=i;
			break;
		}
	}
	document.forms[0].elements[0].value = ADMINS[userIndex].firstName;
	document.forms[0].elements[1].value = ADMINS[userIndex].lastName;
	document.forms[0].elements[2].value = ADMINS[userIndex].email;
	document.forms[0].elements[3].value = ADMINS[userIndex].phoneNumber;
}

function drawHeaders() {

	var headers = [ "Name", "Email", "Phone Number" ];
	var header = table.createTHead();
	var row = header.insertRow(0);
	for (var i = 0; i < headers.length; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = headers[i];
		cell.style.background = "#5a8c6d";
		cell.style.color = "white";
		cell.style.fontSize = "1.15em";
		cell.style.padding = "0.3em";
		cell.style.width = "12em";
		cell.style.textAlign = "center";
	}

}

function drawRows() {

	for (var i = 0; i < ADMINS.length; i++) {
		var tr = document.createElement('tr');

		var name = document.createElement('td');
		name.appendChild(document.createTextNode(ADMINS[i].firstName + " "
				+ ADMINS[i].lastName));
		tr.appendChild(name);
		name.style.fontWeight = "bold";
		name.style.width = "12em";

		var email = document.createElement('td');
		email.appendChild(document.createTextNode(ADMINS[i].email));
		tr.appendChild(email);

		var phoneNumber = document.createElement('td');
		phoneNumber.appendChild(document.createTextNode(ADMINS[i].phoneNumber));
		tr.appendChild(phoneNumber);


		if (i % 2 == 0)
			tr.style.background = "white";
		else
			tr.style.background = "#e0ebe4";

		table.appendChild(tr);
	}
	document.body.appendChild(table);
}

$(document).ready(function() {
	USERNAME = getCookie("username");
	requestAdmins();
	document.body.appendChild(table);
});