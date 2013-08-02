Oskari.registerLocalization({
	"lang" : "fi",
	"key" : "cadastreinfo",
	"value" : {
		"title" : "Kohdetiedot",
		"desc" : "",
		"flyout" : {
			"title" : "Kohdetiedot",

			"data" : {
				"location" : {
					"title" : "Kartalta osoitus",
					"buttons" : {
						"spatial" : {
							"title" : "Hae kohteen tiedot"
						}
					}
				},
				"cadastre" : {
					"title" : "Kiinteistötiedot",
					"buttons" : {
						"extract" : {
							"title" : "Näytä kiinteistörekisteriote"
						}
					},
					"table" : {
						"rows" : [{
							"label" : "kiinteistötunnus",
							"qname" : "kiinteistotunnus"
						}, {
							"label" : "rekisteriyksikkölaji",
							"qname" : "rekisteriyksikkolaji"
						}, {
							"label" : "rekisteröintipäivämäärä",
							"qname" : "rekisterointipvm"
						}, {
							"label" : "maapinta-ala",
							"qname" : "maapintaala"
						}, {
							"label" : "vesipinta-ala",
							"qname" : "vesipintaala"
						}, {
							"label" : "arkisto",
							"qname" : "arkistoviite"
						}, {
							"label" : "käyttötarkoituslyhenne",
							"qname" : "kayttotarkoitusLyhenne"
						}]

					}
				},
				"owners" : {
					"title" : "Lainhuutotiedot",
					"buttons" : {						
						"lainhuutotodistus" : {
							"title" : "Näytä lainhuutotodistus"
						},
						"rasitustodistus" : {
							"title" : "Näytä rasitustodistus"
						}
					},
					"table" : {
						"rows" : [{
							"label" : "kiinteistötunnus",
							"qname" : "kiinteistotunnus"
						},{
							"label" : "asianumero",
							"qname" : "asianumero"
						},{
							"label" : "arkistoviite",
							"qname" : "arkistoviite"
						},{
							"label" : "vireilletulopvm",
							"qname" : "vireilletulopvm"
						},{
							"label" : "... ks. lainhuutotodistus"
						}]
					}

				},

				"buildings" : {
					"title" : "Rakennustiedot",
					"table" : {
						"rows" : [{
							"label" : "sijainti",
							"qname" : "sijainti"
						}, {
							"label" : "rakennustunnus",
							"qname" : "rakennustunnus"
						}, {
							"label" : "kiinteistötunnus",
							"qname" : "kiinteistotunnus"
						}, {
							"label" : "postinumero",
							"qname" : "postinumero"
						}, {
							"label" : "osoite",
							"qname" : "osoite"
						}, {
							"label" : "tarkistusmerkki",
							"qname" : "tarkistusmerkki"
						}, {
							"label" : "rakennusnumero",
							"qname" : "rakennusnumero"
						}, {
							"label" : "tilan nimi",
							"qname" : "tilanNimi"
						}, {
							"label" : "valmistumispäivä",
							"qname" : "valmistumispaiva"
						}, {
							"label" : "kerrosluku",
							"qname" : "kerrosluku"
						}, {
							"label" : "kokonaisala",
							"qname" : "kokonaisala"
						}, {
							"label" : "tilavuus",
							"qname" : "tilavuus"
						}, {
							"label" : "luontiAika",
							"qname" : "luontiAika"
						}, {
							"label" : "muutosAika",
							"qname" : "muutosAika"
						}]

					}
				},
				"terrain" : {
					"title" : "Maastokohteet"
				}

			},
			"error" : {
				"fid" : "Kiinteistötunnusta ei ole annettu"
			}
		},
		"tile" : {
			"title" : "Kohdetiedot",
			"tooltip" : "."
		}

	}
});
