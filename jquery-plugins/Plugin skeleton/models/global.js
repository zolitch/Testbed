{
    "site": "PluginName",
    "description": "plugin desription",
    "environment": "frontend",
    "versions": ["1"],
	"sections": [
		{ "header": "Landing", "pages": [
            {"page": "home.html", "design": "designs/home.png"},
            {"page": "contentpage.html", "design": "designs/contentpage.png"}
		]}
	],
	"pages": [
		{ 
			"title": "Home Page",
			"url": "home.html",
			"pages": [
				{ 
					"title": "Secondary Page 1",
					"url": "secondary-page-1.html"
				},
				{ 
					"title": "Secondary Page 2",
					"url": "secondary-page-2.html"
				},
				{ 
					"title": "Secondary Page 3",
					"url": "secondary-page-3.html"
				}
		]},
		{ 
			"title": "Content Page",
			"url": "contentpage.html",
			"pages": [
				{ 
					"title": "Secondary Page 4",
					"url": "secondary-page-4.html"
				},
				{ 
					"title": "Secondary Page 5",
					"url": "secondary-page-5.html"
				}
		]},
		{ 
			"title": "Another Content Page",
			"url": "another-content-page.html",
			"pages": [
				{ 
					"title": "Secondary Page 6",
					"url": "secondary-page-6.html"
				},
				{ 
					"title": "Secondary Page 7",
					"url": "secondary-page-7.html"
				}
		]}
	]
} 
