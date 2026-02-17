/*

   JavaScript to integrate Magic Toolbox tools with Squarespace
   Copyright 2012-2017 Magic Toolbox
   www.magictoolbox.com/squarespace/

*/ 
function MagicToolbox_addCSSRule(selector, declaration) {
	var ua = navigator.userAgent.toLowerCase();

	var isIE = (/msie/.test(ua)) && !(/opera/.test(ua)) && (/win/.test(ua)) && (!/msie 9\.0/.test(ua)) && (!/msie 10\.0/.test(ua));

	var style_node = document.createElement("style");
	style_node.setAttribute("type", "text/css");
	style_node.setAttribute("media", "screen"); 

	if (!isIE) style_node.appendChild(document.createTextNode(selector + " {" + declaration + "}"));

	document.getElementsByTagName("head")[0].appendChild(style_node);

	if (isIE && document.styleSheets && document.styleSheets.length > 0) {
		var last_style_node = document.styleSheets[document.styleSheets.length - 1];
		if (typeof(last_style_node.addRule) == "object") last_style_node.addRule(selector, declaration);
	}
};




function MagicToolbox_initSquarespace() {



    var $MAGICJS = (typeof magicJS == "undefined")?$J:magicJS;
	

		var o = document.querySelector('#productSlideshow');
		if (o == null) {
			o = document.querySelector('.ProductItem-gallery-slides');
		}
		if (o == null) {
			o = document.querySelector('.product-gallery-slides');
		}
		if (o == null) {
			return;
		}

		var mzpimages = [], mzpimages_q = 0;

		var mainImage = true;

		var MagicToolboxHolder_main = document.createElement('DIV');
		var MagicToolboxHolder_selectors = document.createElement('DIV');

		MagicToolboxHolder_main.setAttribute('class','MagicToolboxMainConteiner');
		
		MagicToolbox_addCSSRule('.MagicToolboxMainConteiner', 'text-align:center;')

		MagicToolboxHolder_selectors.setAttribute('class','MagicToolboxSelectors')

		$MAGICJS.$A($mjs(o).byTag('IMG')).forEach(function(img) {

			if (typeof mzpimages[img.getAttribute('data-src')] != 'undefined') {
				return;
			}
			mzpimages[img.getAttribute('data-src')] = true;

			mzpimages_q++;

			if (mainImage) {

				var ma = document.createElement('A');
				var mimg = document.createElement('IMG');
				ma.href = mimg.src = img.getAttribute('data-src');
				if (img.getAttribute('alt')) {
					//ma.title = mimg.alt = img.alt;
				}
				ma.id = 'MagicImage';
				ma.setAttribute('class',MagicToolbox_toolName);
				ma.appendChild(mimg);
				MagicToolboxHolder_main.appendChild(ma);
				mainImage = false;
			}

			var ma = document.createElement('A');
			var mimg = document.createElement('IMG');
			ma.href = mimg.src = img.getAttribute('data-src');
			ma.setAttribute('rev',img.getAttribute('data-src'));
			if (img.getAttribute('alt')) {
				//ma.title = mimg.alt = img.alt;
			}			
            var rel = '';
            switch(MagicToolbox_toolName) {
            	case 'MagicZoom': rel="zoom-id:"; break;
            	case 'MagicZoomPlus': rel="zoom-id:"; break;
            	case 'MagicThumb': rel="thumb-id:"; break;
            }
            ma.setAttribute('rel',rel+'MagicImage');
			
			ma.appendChild(mimg);
			MagicToolboxHolder_selectors.appendChild(ma);

		});

		if (mzpimages_q < 2) {
			MagicToolboxHolder_selectors.setAttribute('style','display:none');
		}

		MagicToolboxHolder_main.appendChild(MagicToolboxHolder_selectors);

		o.parentNode.replaceChild(MagicToolboxHolder_main,o);

		MagicToolbox_addCSSRule('.MagicToolboxSelectors img','max-height:45px;');
		MagicToolbox_addCSSRule('.MagicToolboxSelectors a','margin:0 5px;');
		MagicToolbox_addCSSRule('.MagicToolboxSelectors','text-align:center;margin-top:5px;');
		MagicToolbox_addCSSRule('#productThumbnails','display:none;');

		$mjs( $MAGICJS.$A($MAGICJS.body.byTag('DIV')).filter(function(o){ 
			return o.getAttribute('class') && o.getAttribute('class').match(/sqs\-gallery\-thumbnails( |$)/gm); 
		})).forEach(function(o) {
			o.parentNode.removeChild(o);
		});
		
    	switch(MagicToolbox_toolName) {
    		case 'MagicZoom': MagicZoom.refresh(); break;
    		case 'MagicZoomPlus': MagicZoom.refresh(); break;
    		case 'MagicThumb': MagicThumb.refresh(); break;
    	}


	var num=0;



}

var MagicToolbox_toolName = '', MagicToolbox_firstInit = true, MagicToolbox_thumb, MagicToolbox_image;

$mjs(document)[(typeof $mjs(document).jAddEvent)=='function'?'jAddEvent':'je1']('domready', function() {

    var elms = document.getElementsByTagName('SCRIPT');
    for (var i in elms) {
    	if (typeof elms[i].getAttribute == "function" && (' '+elms[i].getAttribute("src")+' ').match(/.*magic\-squarespace\.js.*/)) {
    		MagicToolbox_toolName = elms[i].getAttribute("src").replace(/.*magic\-squarespace\.js\?tool=([a-zA-Z])/gm,"$1");
    		break;
    	}
    	if (elms[i].src && (' '+elms[i].src+' ').match(/.*magic\-squarespace\.js.*/)) {
    		MagicToolbox_toolName = elms[i].src.replace(/.*magic\-squarespace\.js\?tool=([a-zA-Z])/gm,"$1");
    		break;
    	}    		
    }

    MagicToolbox_initSquarespace();


    return;
});

window['mgctlbx$Pltm'] = 'Squarespace';