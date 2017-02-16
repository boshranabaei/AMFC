function toast(message) {
	var x = document.getElementById("snackbar")
	x.className = "show";
	x.innerText = message;
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}

function changePassword() {
	if (document.forms[0].elements[2].value != document.forms[0].elements[3].value) {
		toast("New password confirmation does not match.");
		document.forms[0].elements[3].style.border = "1px solid red";
	} else {
		$.ajax({
			type : "POST",
			url : "/settings",
			dataType : "json",
			data : {
				username : document.forms[0].elements[0].value,
				oldPassword : document.forms[0].elements[1].value,
				newPassword : document.forms[0].elements[2].value
			},
			success : function(data) {
				if (data.mission == "accomplished") {
					toast("Password Changed");
				} else {
					toast("Old password is not valid");
					document.forms[0].elements[1].style.border = "1px solid red";
				}
			},
			error : function() {
				toast("Server Error");
			}
		});
	}
	return false;
}