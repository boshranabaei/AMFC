sap.ui.controller("amfc.Settings", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf amfc.Settings
*/
//	onInit: function() {
//
//	},

	changePassword: function(oldPass,newPass){
		$.ajax({
			type : "GET",
			url : "/settings",
			dataType : "json",
			data : {
				username: USER_ID,
				oldPassword : oldPass,
				newPassword : newPass
			},
			success : function(data) {
				if (data.mission=="accomplished") {
					sap.m.MessageToast.show("password changed", {});
				}
				else{
					sap.m.MessageToast.show("Old password is not valid", {});
				}
			},
			error : function() {
				sap.m.MessageToast.show("Server Error", {});
			}
		});
	}
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf amfc.Settings
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf amfc.Settings
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf amfc.Settings
*/
//	onExit: function() {
//
//	}

});