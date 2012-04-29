CSS Details for this project
===================================

All of the items in any marked files get combined and compressed on deployment.

brand.css
===========
- These styles are used to set basic elements to fit to a brand.
- It should be able to be added to a page no matter what the media type to set the brand.
- It must not contain layout styles [ie margins,position,padding,display]. It would be used for: colors, text, fonts
- It must not contain ids, only elements and classes

These elements should be in a rough alphabetical order

core.css
==============
This is the global core stylesheet. 
The imports below get combined and compressed in to this file on deployment.

	-----------------------------------------------------------------------------------
    core/structure
    This style sheet contains core structural layout 
    
    This shouldn't contain reusable modules or components but would generally 
    set out the chrome of the page using ids
    
    This would often contain the primary and secondary navigation styles but if they
    are not specified here they should be within core/navs
    
    This file should be ordered as elements appear on the page including indentation.
    
	-----------------------------------------------------------------------------------
	core/reusable
	This file has two sections. 
	
	The first is for simple 1 or 2 line styles:	
	- This should contain basic reusable styles.
	- This should not contain any component or module styles
	- The styles should be in a rough alphabetical order
	
	The Second is for icon definitions
	- icon names should be in a rough alphabetical order

	-----------------------------------------------------------------------------------
    core/components
    
    - basic reusable items which are simple
    - components cannot contain child components or modules
    - components can use the following prefixes:
      - cp    component
      - cta   call to action
      - hs    hotspot
    
    Component styles should be grouped together with a heading name
    and description. Styles within each group should then appear as
    they do in the markup including indentation.
    
    Component definitions should be ordered alphabetically.
    
    See example below. 
    (Note: A space has been added next to * to prevent this comment block from breaking.
    This would be removed when used)

	/*
		cp-componentName
		Description of component
	----------------------------------------*/
	.cp-componentName {}
		.cp-componentName-member {}
		.cp-componentName a {}

	/*
		cp-secondComponentName
		Description of component
	----------------------------------------*/
	.cp-secondComponentName {}
		.cp-secondComponentName-member {}
		.cp-secondComponentName a {}

	
	
	-----------------------------------------------------------------------------------
	core/forms
	Use this file for form layouts and styling
	
	<div class="form-errorSummary">
        <h2>...</h2>
        <ul>...</ul>
    </div>
    <div class="form-stack">
        <div class="form-section"></div>
    </div>
	-----------------------------------------------------------------------------------
	core/layouts

	Within the site all column layouts within main content areas should be modular
	and defined here.
	- All layouts are designed to be used with the cc class to clear the containers
	- Layouts prefix: lay 

	A few examples/often used layouts are defined below.

	-----------------------------------------------------------------------------------
    core/modules
    more involved sections of styles often containing modules and/or components
	- prefix these classes with mod-
	- order alphabetically according to containers

	-----------------------------------------------------------------------------------
    core/lists
    lists would use the following prefixes:
	- nav	lists of links,tabs
    - list  other styled list types on ol,ul,dl etc
	
