sap.ui.jsview("amfc.AApp", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf amfc.AApp
	 */
	getControllerName : function() {
		return "amfc.AApp";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf amfc.AApp
	 */
	createContent : function(oController) {

		var aData = [
		             {select:false,firstName:"Hamed", lastName:"aaaa", dateApplied:"2016-05-03",viewProfile:"View Profile"},
		             {select:false,firstName:"Ahmad",lastName:"bbbb", dateApplied:"2016-07-19",viewProfile:"View Profile"},
		             {select:false,firstName:"Amal",lastName:"cccc", dateApplied:"2016-08-30",viewProfile:"View Profile"}
		             ];
		
		var applyLabel = new sap.m.Label(this.createId("applyLabel"), {
			text : "Apply changes to the selected applicants:"
		});

		var oTable = new sap.ui.table.Table({
			visibleRowCount: 3,
			selectionMode: sap.ui.table.SelectionMode.None,
			fixedColumnCount: 5,
			width: "540px"
		});
		
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Select"}),
			template: new sap.ui.commons.CheckBox().bindProperty("checked", "select"),
			width: "60px"
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "First Name"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "firstName"),
			sortProperty: "firstName",
			filterProperty: "firstName",
			width: "120px"
		}));
        
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Last Name"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "lastName"),
			sortProperty: "lastName",
			filterProperty: "lastName",
			width: "120px"
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Date Applied"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "dateApplied"),
			sortProperty: "lastName",
			filterProperty: "lastName",
			width: "120px"
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "View Profile"}),
			template:
			
			new sap.m.Button(this.createId("viewProfile"), {
				text : "View Profile",
				press : function() {
				}
			}).bindProperty("text", "viewProfile"),
			width: "120px"
		}));
		
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({modelData: aData});
        oTable.setModel(oModel);
        oTable.bindRows("/modelData");


        var accept = new sap.m.Button(this.createId("accept"), {
			text : "Accept",
			width : "10em",
			press : function() {
			}
		});
        var reject = new sap.m.Button(this.createId("reject"), {
			text : "Reject",
			width : "10em",
			press : function() {
			}
		});
        
        var applyVBox = new sap.m.VBox(this.createId("filterVBox")).setAlignItems("Center");
        applyVBox.addItem(applyLabel).addItem(accept).addItem(reject);

        return new sap.m.HBox(this.createId("containerLayoutHBox")).addItem(applyVBox).addItem(oTable);

	}

});