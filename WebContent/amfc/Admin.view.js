sap.ui.jsview("amfc.Admin", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf amfc.Admin
	 */
	getControllerName : function() {
		return "amfc.Admin";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.Admin
	 */
	createContent : function(oController) {

		var NewApplicationsTile = new sap.m.GenericTile("NewApplicationsTile",
				{
					header : "New Applications",
					tileContent : new sap.m.TileContent({
						content : new sap.m.ImageContent({
							src : sap.ui.core.IconPool.getIconURI("leads")
						})
					}),
					press : function() {
						console.log("NewApplicationsTile") ;
						oPanel.removeAllContent();
						oPanel.addContent(sap.ui.getCore().byId("idNApp"));
					}
				});

		var CurrrentApplicantsTile = new sap.m.GenericTile(
				"CurrrentApplicantsTile", {
					header : "Current Applicants",
					tileContent : new sap.m.TileContent({
						content : new sap.m.ImageContent({
							src : sap.ui.core.IconPool.getIconURI("group")
						})
					}),
					press : function() {
						console.log("CurrrentApplicantsTile")
						oPanel.removeAllContent();
						oPanel.addContent(sap.ui.getCore().byId("idCApp"));
					}
				});

		var AddApplicantTile = new sap.m.GenericTile("AddApplicantTile", {
			header : "Add Applicant",
			tileContent : new sap.m.TileContent({
				content : new sap.m.ImageContent({
					src : sap.ui.core.IconPool.getIconURI("doctor")
				})
			}),
			press : function() {
				console.log("AddApplicantTile")
				oPanel.removeAllContent();
				oPanel.addContent(sap.ui.getCore().byId("idAApp"));
			}
		});

		var SettingsTile = new sap.m.GenericTile("SettingsTile", {
			header : "User Settings",
			tileContent : new sap.m.TileContent({
				content : new sap.m.ImageContent({
					src : sap.ui.core.IconPool.getIconURI("action-settings")
				})
			}),
			press : function() {
				console.log("AddApplicantTile")
				oPanel.removeAllContent();
				oPanel.addContent(sap.ui.getCore().byId("idAApp"));
			}
		});
		
		var tileLayout = new sap.m.HBox(this.createId("tileLayout"), {});
		tileLayout.addItem(NewApplicationsTile).addItem(CurrrentApplicantsTile)
				.addItem(AddApplicantTile).addItem(SettingsTile);

		var oPanel = new sap.m.Panel({ 
			showCollapseIcon: false
		});
		oPanel.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
		

		

		return new sap.m.VBox(this.createId("AdminLayout")).setAlignItems(
				"Center").addItem(tileLayout).addItem(oPanel);

	}

});