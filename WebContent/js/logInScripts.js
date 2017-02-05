function requestApplicants() {
	$.ajax({
		type : "GET",
		url : "/applicant",
		dataType : "json",
		data : {
			"task" : "requestApplicants"
		},
		success : function(data) {
			APPLICANTS = data.applicants;
			return true;
		},
		error : function() {
			sap.m.MessageToast.show("Server Error", {});
			return false;
		}
	});
};

function onLogIn() {
	$.ajax({
		type : "GET",
		url : "/login",
		dataType : "json",
		data : {
			userIDInput : document.forms[0].elements[0].value,
			passwordInput : document.forms[0].elements[1].value
		},
		success : function(data) {
				if(data.isValid == true)
					window.open("napp.html","_self");
				else
					alert("Invalid username or password.");
		},
		error : function() {
			alert("Server Error");
		}
	});
};
