sap.ui.jsview("amfc.Settings",{

	/**
	 * Specifies the Controller belonging to this View. In the
	 * case that it is not implemented, or that "null" is
	 * returned, this View does not have a Controller.
	 * 
	 * @memberOf amfc.Settings
	 */
	getControllerName : function() {
		return "amfc.Settings";
	},

	/**
	 * Is initially called once after the Controller has been
	 * instantiated. It is the place where the UI is
	 * constructed. Since the Controller is given to this
	 * method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.LogIn
	 */
	createContent : function(oController) {

		
		var oldPasswordLabel = new sap.m.Label(this
				.createId("oldPasswordLabel"), {
			width : "15em",
			text : "Old Password:   "
		});
		var newPasswordLabel = new sap.m.Label(this
				.createId("newPasswordLabel"), {
			width : "15em",
			text : "New Password:"
		});
		var conNewPasswordLabel = new sap.m.Label(this
				.createId("confirmNewPasswordLabel"), {
			width : "15em",
			text : "Confirm New Password:"
		});
		
		var oldPasswordInput = new sap.m.Input(this.createId("oldPasswordInput"), {
			width : "15em",
			type : sap.m.InputType.Password
		});
		var newPasswordInput = new sap.m.Input(this.createId("newPasswordInput"), {
			width : "15em",
			type : sap.m.InputType.Password
		});
		var conNewPasswordInput = new sap.m.Input(this.createId("conNewPasswordInput"), {
			width : "15em",
			type : sap.m.InputType.Password
		});
		
		
		var changePassBtn = new sap.m.Button(
				this.createId("ChangePassword"),
				{
					text : "Change Password",
					width : "15em",
					press : function() {
						if(oldPasswordInput.getValue()!="" && newPasswordInput.getValue()!="" && conNewPasswordInput.getValue()!=""){
							if(newPasswordInput.getValue()==conNewPasswordInput.getValue()){
								oController.changePassword(oldPasswordInput.getValue(), newPasswordInput.getValue());
							}
							else
								sap.m.MessageToast.show("New password and its confimation don't match!", {});
						}
						else
							sap.m.MessageToast.show("Please fill out all the inputs", {});
					}
				});
		
		var placeHolderSettings1 = new sap.ui.commons.Label(this
				.createId("placeHolderSettings1"), {
			width : "40px"
		});

		var oldPassRow = new sap.ui.layout.HorizontalLayout().addContent(
				oldPasswordLabel).addContent(oldPasswordInput);
		var newPassRow = new sap.ui.layout.HorizontalLayout().addContent(
				newPasswordLabel).addContent(newPasswordInput);
		var conNewPassRow = new sap.ui.layout.HorizontalLayout().addContent(
				conNewPasswordLabel).addContent(conNewPasswordInput);
		
		
		return new sap.m.VBox(this
				.createId("settingsVBox")).setAlignItems("Center").addItem(oldPassRow).addItem(newPassRow).addItem(conNewPassRow).addItem(changePassBtn);;
	}

});