//Create HTML element for the popup box
var popup = document.createElement('div');
popup.style.position = "absolute";
popup.style.padding = '5px 10px';
popup.style.lineHeight = '2';
popup.style.backgroundColor = "#CCCCCC";
popup.style.borderBottomLeftRadius = '12px';
popup.style.boxShadow = "5px 5px 3px #888888";
popup.style.zIndex = "99";
//Create HTML element for the header of the popup box
var hint = document.createElement('h3');
hint.style.position = "relative";
hint.style.top = "5px";
hint.style.bottom = "2px";
hint.style.marginBottom = '0px';	
hint.style.left = "10px";
hint.style.fontWeight = "800";
hint.style.letterSpacing = "1.5px";
hint.style.fontSize = '18px';
//Create HTML element for the tags inside the popup box
var tags = document.createElement('p');
tags.style.position = "relative";
tags.style.top = '5px';
tags.style.left = "10px";
tags.style.fontWeight = "700";
tags.style.fontSize = '15px';

document.body.appendChild(popup);
popup.appendChild(hint);
popup.appendChild(tags);

var rootElement = document.documentElement;
var firstTier = rootElement.childNodes;

var popup_width = window.innerWidth * 0.3;	//width of the popup window
var popup_height = window.innerHeight * 0.25;	//height of the popup window 
var popup_y_offset = -1.2 * popup_height;  //positive number means moving downwards.
var popup_x_offset = -0.3 * popup_width;  //positive number means moving towards right.

	for (var i = 0; i < firstTier.length; i++) {
		firstTier[i].addEventListener('mouseup', function () {
			var sel = window.getSelection().toString().trim();
			if(sel !== ""){
			    var range = window.getSelection().getRangeAt(0);
		 		var span = document.createElement('span');

		 		//alert("Start container:" + range.startContainer+"  "+"End container:" + range.endContainer);
		 		//alert("Start:"+range.startOffset+"   "+"end:"+range.endOffset);
		 		//Display the selected text in a pop up window
				tags.innerHTML = sel;
				hint.innerHTML = "点击并保存到所属类别";
				//Highlight the selected text
				span.style.backgroundColor = 'pink';
				span.style.color = 'black';
				span.style.fontWeight = '800';

	    		//span.appendChild(range.extractContents());
	    		//range.insertNode(span); 
	    		range.surroundContents(span);
	    		//alert("Start container:" + range.startContainer+"  "+"End container:" + range.endContainer);
	    		//alert("Start:"+range.startOffset+"   "+"end:"+range.endOffset);
	      		//Get (left and top) co-ordinates of the selected text
	      		var rect = span.getBoundingClientRect(),
	      		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	      		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    		//Put pop-up window up of the selected text
	    		popup.style.width = popup_width + "px";
	    		popup.style.height = popup_height + "px";
	    		popup.style.left = rect.left + scrollLeft + popup_x_offset + "px" ;
	    		popup.style.top = rect.top + scrollTop + popup_y_offset +  "px" ;
	    		popup.style.display = "initial";
	    	}
	    	else {
	    		popup.style.display = "none";
	    	}
	    });
	} 

