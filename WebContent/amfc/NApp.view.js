sap.ui.jsview("amfc.NApp",{

	/**
	 * Specifies the Controller belonging to this View. In the
	 * case that it is not implemented, or that "null" is
	 * returned, this View does not have a Controller.
	 * 
	 * @memberOf amfc.NApp
	 */
	getControllerName : function() {
		return "amfc.NApp";
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

		jQuery.sap.require("sap.m.MessageBox");

		var NAppData = [ {
			firstName : "Hamed",
			lastName : "Soltani",
			dateApplied : "2016-05-03",
			viewProfile : "View Profile"
		}, {
			firstName : "Ahmad",
			lastName : "Habib",
			dateApplied : "2016-07-19",
			viewProfile : "View Profile"
		}, {
			firstName : "Amal",
			lastName : "Awal",
			dateApplied : "2016-08-30",
			viewProfile : "View Profile"
		} ];

		var applyLabel = new sap.m.Label(this
				.createId("applyLabel"), {
			text : "Apply changes to the selected applicants:"
		});

		var NAppTable = new sap.ui.table.Table(
				{
					visibleRowCount : 4,
					fixedColumnCount : 5,
					setSelectionBehavior : sap.ui.table.SelectionBehavior.RowOnly,
					width : "506px",
					rowSelectionChange : function() {
						if (this.getSelectedIndices().length == 0) {
							reject.setEnabled(false);
							accept.setEnabled(false);
						} else {
							reject.setEnabled(true);
							accept.setEnabled(true);
						}

					}
				});

		NAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "First Name"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "firstName"),
			sortProperty : "firstName",
			filterProperty : "firstName",
			width : "120px"
		}));

		NAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Last Name"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "lastName"),
			sortProperty : "lastName",
			filterProperty : "lastName",
			width : "120px"
		}));

		NAppTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Date Applied"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "dateApplied"),
			sortProperty : "dateApplied",
			filterProperty : "dateApplied",
			width : "120px"
		}));

		NAppTable.addColumn(new sap.ui.table.Column(
				{
					label : new sap.ui.commons.Label({
						text : "View Profile"
					}),
					template :

					new sap.m.Button(
							this
									.createId("viewProfile"),
							{
								text : "View Profile",
								press : function() {
									if (popOver
											.isOpen()) {
										popOver.close();
									} else {
										console
												.log(this
														.getParent()
														.getIndex());
										popOverIndex = this
												.getParent()
												.getIndex();
										popOver.openBy(
												this,
												true);
										popOver
												.setTitle(NAppData[popOverIndex].firstName
														+ "  "
														+ NAppData[popOverIndex].lastName);
									}
								}
							}).bindProperty("text",
							"viewProfile"),
					width : "120px"
				}));

		var NAppModel = new sap.ui.model.json.JSONModel();
		NAppModel.setData({
			modelData : NAppData
		});
		NAppTable.setModel(NAppModel);
		NAppTable.bindRows("/modelData");

		var accept = new sap.m.Button(
				this.createId("accept"),
				{
					text : "Accept",
					width : "10em",
					enabled : false,
					press : function() {
						sap.m.MessageBox.confirm(
						"Are your sure that you want to accept the selected applicant(s)?",
						{
							title : "Confirmation",
							actions : [
									sap.m.MessageBox.Action.NO,
									sap.m.MessageBox.Action.YES ],
							onClose : function(oAction) {
								if(oAction === sap.m.MessageBox.Action.YES)
									console.log("accepts");
							}.bind(this)
						});
					}
				});
		var reject = new sap.m.Button(
				this.createId("reject"),
				{
					text : "Reject",
					width : "10em",
					enabled : false,
					press : function() {
						sap.m.MessageBox.confirm(
								"Are your sure that you want to reject the selected applicant(s)?",
								{
									title : "Confirmation",
									actions : [
											sap.m.MessageBox.Action.NO,
											sap.m.MessageBox.Action.YES ],
									onClose : function(
											oAction) {
										if(oAction === sap.m.MessageBox.Action.YES)
											console.log("accepts");
									}.bind(this)
								});
					}
				});

		var placeHolderNApp1 = new sap.ui.commons.Label(this
				.createId("placeHolderNApp1"), {
			width : "40px"
		});

		var popOverContent = new sap.m.Label(
				this.createId("popOverContent"),
				{
					width : "auto",
					text : " Birth Date: 1983-05-02  Nationality: Canadian..."
				});

		var applyVBox = new sap.m.VBox(this
				.createId("applyVBox")).setAlignItems("Center");
		applyVBox.addItem(applyLabel).addItem(accept).addItem(
				reject);

		var popOverIndex = 0;

		var popOver = new sap.m.Popover(this
				.createId("idPopover"), {
			title : "Profile",
			content : popOverContent,
			contentWidth : "300px", // contentWidth: "40%",
			contentHeight : "160px", // contentHeight: "20%",
			placement : sap.m.PlacementType.Bottom,
			offsetX : 15,
			offsetY : -15,
			setVerticalScrolling : true,
			setHorizontalScrolling : false
		});

		return new sap.m.HBox().addItem(applyVBox).addItem(
				placeHolderNApp1).addItem(NAppTable);

	}

});