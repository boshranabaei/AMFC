sap.ui.controller("amfc.AApp", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf amfc.AApp
*/
//	onInit: function() {
//
//	},

	addApplicant : function(applicantFormData) {
		$.ajax({
			type : "GET",
			url : "/login",
			dataType : "json",
			data : {
				applicant : applicantFormData
			},
			success : function(data) {
				if (data.isValid) {
					USER_ID = username;
					sap.ui.getCore().byId("shell").removeAllWorksetItems();
					sap.ui.getCore().byId("shell").setContent(
							sap.ui.getCore().byId("idAdmin"));
				}
				else{
					sap.m.MessageToast.show("Invalid Username or Password", {});
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
* @memberOf amfc.AApp
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf amfc.AApp
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf amfc.AApp
*/
//	onExit: function() {
//
//	}

});