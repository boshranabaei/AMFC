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

function onLogIn(username, password) {
	$.ajax({
		type : "GET",
		url : "/login",
		dataType : "json",
		data : {
			userIDInput :  document.getElementById("loginForm").value[0],
			passwordInput : document.getElementById("loginForm").value[1]
		},
		success : function(data) {
			if (data.isValid) {
				

			} else {
				sap.m.MessageToast.show("Invalid Username or Password", {});
			}
		},
		error : function() {
			sap.m.MessageToast.show("Server Error", {});
		}
	});
};
