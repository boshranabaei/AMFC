sap.ui.jsview("amfc.LogIn", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf amfc.LogIn
	 */
	getControllerName : function() {
		return "amfc.LogIn";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.LogIn
	 */
	createContent : function(oController) {

		var oLoginLabel1 = new sap.m.Label(this
				.createId('loginLabel1'))
				.setDesign(sap.m.LabelDesign.Bold);


		var userIDLabel = new sap.m.Label(this.createId("userIDLabel"), {
			width : "6em",
			text : "UserID :"
		});
		var userIDInput = new sap.m.Input(this.createId("userIDInput"), {
			width : "15em"
		});
		userIDInput.setValue("bnabaei");
		var passwordLabel = new sap.m.Label(this.createId("passwordLabel"), {
			width : "6em",
			text : "Password :"
		});
		var passwordInput = new sap.m.Input(this.createId("passwordInput"), {
			width : "15em",
			type : sap.m.InputType.Password
		});
		passwordInput.setValue("rouhiFedak14");
		var userIdRow = new sap.ui.layout.HorizontalLayout().addContent(
				userIDLabel).addContent(userIDInput);
		var passwordRow = new sap.ui.layout.HorizontalLayout().addContent(
				passwordLabel).addContent(passwordInput);

		var logInBtn = new sap.m.Button(this.createId("loginBtn"), {
			text : "LogIn",
			width : "10em",
			press : function() {
				oController.onLogIn(userIDInput.getValue(),passwordInput.getValue());
				USER_ID = userIDInput.getValue();
				sap.ui.getCore().byId("shell").removeAllWorksetItems();
				sap.ui.getCore().byId("shell").setContent(
						sap.ui.getCore().byId("idAdmin"));
				oController.onLogIn(userIDInput.getValue(),passwordInput.getValue());
			}
		});

		return new sap.m.VBox(this.createId("pageLayout"))
				.setAlignItems("Center").addItem(oLoginLabel1).addItem(userIdRow)
				.addItem(passwordRow).addItem(logInBtn);
	}

});