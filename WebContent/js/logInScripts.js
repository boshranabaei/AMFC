function onLogIn() {
	$.ajax({
		type : "POST",
		url : "/login",
		dataType : "json",
		data : {
			userIDInput : document.forms[0].elements[0].value,
			passwordInput : document.forms[0].elements[1].value
		},
		success : function(data) {
				if(data.isValid == true){
					setCookie(document.forms[0].elements[0].value);
					window.open("match.html","_self");
				}
				else{
					var message = document.createElement("div");
					message.textContent = "Invalid username or password. Please try again.";
					message.style.color="red";
					message.style.padding="2em";
					message.style.fontSize="1.3em";
					document.body.appendChild(message);  
				}
		},
		error : function() {
			alert("Server Error");
		}
	});
	return false;
};

function setCookie(sessionId, username) {
    var d = new Date();
    d.setTime(d.getTime() + (60*60*1000));
    document.cookie = "susername= "+ username +"; expires="+ d.toUTCString()+"; path=/";
}
