Oskari.registerLocalization({
	"lang" : "fi",
	"key" : "cadastreform",
	"value" : {
		"title" : "Asiakirja",
		"desc" : "",
		"flyout" : {
			"title" : "Asiakirja"
		},
		"tile" : {
			"title" : "Asiakirja",
			"tooltip" : "."
		},
		"view" : {
			"prompt" : "",
			"forms" : {
				"Asiakirja" : {
					"title" : "Asiakirja",
					"cls" : "Asiakirja",
					"pages" : [{
						"title" : "Asiakirja - etusivu",
						"ref" : "#mappage",
						"cls" : "Asiakirja-page_1",
						"controls" : [{
							"type" : "checkbox",
							"id" : "_1080",
							"label" : "yksityistietoimitus",
							"css" : {
								"left" : "215px",
								"top" : "152px",
								"position" : "absolute"
							}
						}, {
							"id" : "_1641",
							"type" : "checkbox",
							"label" : "vesijätön lunastus",
							"selected" : true,
							"css" : {
								"left" : "215px",
								"top" : "168px",
								"position" : "absolute"
							}
						}, {
							"id" : "_1300",
							"type" : "checkbox",
							"label" : "rajankäynti",
							"selected" : true,
							"css" : {
								"left" : "392px",
								"top" : "152px",
								"position" : "absolute"
							}
						}, {
							"id" : "_1480",
							"type" : "checkbox",
							"label" : "vapaaehtoinen tilusvaihto",
							"selected" : true,
							"css" : {
								"left" : "392px",
								"top" : "168px",
								"position" : "absolute"
							}
						}, {
							"id" : "_1030",
							"type" : "checkbox",
							"label" : "halkominen",
							"selected" : true,
							"css" : {
								"left" : "575px",
								"top" : "152px",
								"position" : "absolute"
							}
						}, {
							"id" : "_muu",
							"type" : "checkbox",
							"label" : "muu toimitus",
							"selected" : true,
							"css" : {
								"left" : "215px",
								"top" : "199px",
								"position" : "absolute"
							}
						}, {
							"id" : "kiinteistonimi",
							"type" : "textbox",
							"label" : "kiinteistön nimi",
							"selected" : true,
							"css" : {
								"left" : "217px",
								"top" : "275px",
								"position" : "absolute"
							}
						}, {
							"id" : "kiinteistotunnus",
							"type" : "textbox",
							"label" : "kiinteistötunnus",
							"selected" : true,
							"css" : {
								"left" : "217px",
								"top" : "320px",
								"position" : "absolute"
							}
						}, {
							"id" : "kokouspaikka",
							"type" : "textbox",
							"label" : "ehdotus kokouspaikaksi",
							"selected" : true,
							"css" : {
								"left" : "217px",
								"top" : "350px",
								"position" : "absolute"
							}
						}]
					}, {
						"title" : "Asiakirja - sivu 2",
						"cls" : "Asiakirja-page_2",
						"controls" : [{
							"type" : "textarea",
							"id" : "additionalinfo",
							"label" : "lisätietoja",
							"css" : {
								"left" : "215px",
								"top" : "256px",
								"position" : "absolute"
							}
						}]
					}, {
						"title" : "Asiakirja - sivu 3",
						"cls" : "Asiakirja-page_3",
						"controls" : []
					}, {
						"title" : "Asiakirja - sivu 4",
						"cls" : "Asiakirja-page_4",
						"controls" : [{
							"type" : "placeholder",
							"id" : "rahu",
							"label" : "rakennus- ja huoneistotiedot",
							"css" : {
								"left" : "215px",
								"top" : "160px",
								"width" : "450px",
								"height" : "800px",
								"border" : "1px dashed black",
								"position" : "absolute"
							}
						}]
					}]
				}
			}

		},
		"toolbar" : {
			"title" : "Asiakirja",
			"print" : "Tulosta",
			"send" : "Lähetä",
			"save" : "Talleta",
			"progress" : {
				"send" : "Asiakirja lähetettiin",
				"save" : "Asiakirja talletettiin"
			}

		}

	}
});
