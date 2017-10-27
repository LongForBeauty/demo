
var rootElement = document.documentElement;
var firstTier = rootElement.childNodes;


var popup_y_offset = -155;	//positive number means moving downwards.
var popup_x_offset = -50;	//positive number means moving towards right.
var popup_width = 500;	//width of the popup window
var popup_height = 150;	//height of the popup window 
var i;

//Create HTML element for the popup box
var popup = document.createElement('div');
popup.style.position = "absolute";
popup.style.backgroundColor = "#CCCCCC";
popup.style.boxShadow = "5px 5px 3px #888888";
//Create HTML element for the header of the popup box
var hint = document.createElement('h3');
hint.style.position = "relative";
hint.style.left = "10px";
hint.style.fontWeight = "800";
hint.style.letterSpacing = "1.5px";
//Create HTML element for the tags inside the popup box
var tags = document.createElement('p');
tags.style.position = "relative";
tags.style.left = "10px";
tags.style.fontWeight = "700";

document.body.appendChild(popup);
popup.appendChild(hint);
popup.appendChild(tags);

	for (i = 0; i < firstTier.length; i++) {
		firstTier[i].addEventListener('mouseup', function () {
		  var range = window.getSelection().getRangeAt(0);
	 		var span = document.createElement('span');
	 		//Display the selected text in a pop up window
			tags.innerHTML = window.getSelection().toString();
			hint.innerHTML = "点击并保存到所属类别";
			//Highlight the selected text
			span.style.backgroundColor = 'black';
			span.style.color = 'white'

    	span.appendChild(range.extractContents());
    	range.insertNode(span);  
    	//Put pop-up window up of the selected text
    	popup.style.width = popup_width + "px";
    	popup.style.height = popup_height + "px";
    	popup.style.left = span.offsetLeft + popup_x_offset + "px" ;
    	popup.style.top = span.offsetTop + popup_y_offset +  "px" ;
	    
	    });
	} 

