/*********************************************************************
/*HTML and CSS part 
/*********************************************************************/
//Create HTML element for the popup box
var popup = document.createElement('div');
popup.style.position = "absolute";
popup.style.paddingTop = '5px';
popup.style.paddingBottom = '5px';
popup.style.paddingLeft = '10px';
popup.style.paddingRight = '10px';

popup.style.lineHeight = '2';
popup.style.backgroundColor = "#CCCCCC";
popup.style.borderBottomLeftRadius = '12px';
popup.style.boxShadow = "5px 5px 3px #888888";
popup.style.zIndex = "999";
//Create HTML element for the header of the popup box
var hint = document.createElement('h3');
hint.style.position = "relative";
hint.style.marginTop = "5px";
hint.style.marginBottom = '5px';
hint.style.marginLeft = "0px";
hint.style.marginRight = "0px";
hint.style.paddingTop = "0px";
hint.style.paddingBottom = "0px";

hint.style.fontWeight = "800";
hint.style.letterSpacing = "1.5px";
hint.style.fontSize = '18px';
//Create HTML element for the tags inside the popup box
var tags = document.createElement('div');
tags.style.position = "relative";
tags.style.marginTop = '5px';
tags.style.marginBottom = '5px';
tags.style.marginLeft = "0px";
tags.style.marginRight = '0px';
tags.style.paddingTop = '0px';
tags.style.paddingBottom = '0px';
tags.style.paddingLeft= '0px';
tags.style.paddingRight= '0px';

tags.style.fontWeight = "700";
tags.style.fontSize = '15px';

//Create HTML element for a save button


/*********************************************************************
/*JavaScript part 
/*********************************************************************/
document.body.appendChild(popup);
popup.appendChild(hint);
popup.appendChild(tags);

var rootElement = document.documentElement;
var firstTier = rootElement.childNodes;

//Event handler for user pressing the keyboard
document.addEventListener('keydown', (event) => {
	//when the 'alt' key is pressed
	if (event.altKey) {
		for (var i = 0; i < firstTier.length; i++) {
			//Event handler for 'user selection' on the webpage
			firstTier[i].addEventListener('mouseup', function () {
			var sel = window.getSelection().toString().trim();
			tags.innerHTML = null;
			if(sel !== "") {
			    var range = window.getSelection().getRangeAt(0);
		 		var span = document.createElement('span');
		 		//Display the selected text in a pop up window
		 		sel = sel.toUpperCase();
				var clickTag = sel.split(" ", 10);
				hint.innerHTML = "点击并保存到所属类别";
				//Make tags as buttons
				createBtnNodes(tags, clickTag.length);
				for (var i = 0; i < clickTag.length; i++) {
					tags.childNodes[i].innerHTML = clickTag[i];
					/*********************************************************************
					/*CSS part 
					/*********************************************************************/
					tags.childNodes[i].style.border = "2px ridge grey";
					tags.childNodes[i].style.marginRight = '2px';
				}
				//Highlight the selected text
				span.style.backgroundColor = 'pink';
				span.style.color = 'black';
				span.style.fontWeight = '800';

	    		range.surroundContents(span);
	    		//Set up popup box's properties: width, height and offsets.
	    		var popup_width = window.innerWidth * 0.3;	//width of the popup window
				var popup_height = window.innerHeight * 0.25;	//height of the popup window 
				var popup_y_offset = -1.2 * popup_height;  //positive number means moving downwards.
				var popup_x_offset = 0  * popup_width;  //positive number means moving towards right.
	      		//Get (left and top) co-ordinates of the selected text
	      		var rect = span.getBoundingClientRect(),
	      		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	      		scrollTop = window.pageYOffset || document.documentElement.scrollTop,
	      		popupLeft = rect.left + scrollLeft + popup_x_offset,
	      		popupTop = rect.top + scrollTop + popup_y_offset;
	    		//Put pop-up window up of the selected text
	    		popup.style.width = popup_width + "px";
	    		popup.style.height = popup_height + "px";
	    		//If popup window does not across the viewport's right edge
	    		if ((rect.left + popup_width) <= window.innerWidth) {
	    			popup.style.left = popupLeft + "px" ;
	    		}
	    		else {
	    			popupLeft = window.innerWidth - popup_width + scrollLeft;
	    			popup.style.left = popupLeft + "px";
	    		}
	    		//If popup window does not across the viewport's top edge	    		
	    		if ((rect.top - popup_height) >= 0) {
	    			popup.style.top = popupTop +  "px" ;
	    		}
	    		else {
	    			popupTop = rect.top + scrollTop + (0.2 * popup_height);
	    			popup.style.top = popupTop + 'px';

	    		}
	    		
	    		//When user clicks on the 'tag', the background color of the tag changes
	    		for (var j = 0; j <= tags.childNodes.length; j++) {
		    		tags.childNodes[j].addEventListener('mousedown', function(e){
		    			e.target.style.backgroundColor = 'orange';
		    		});	    			
	    		}
	    		popup.style.display = "initial";
	    	}
	    	else {
	    		popup.style.display = "none";
	    	}
	    	});

		} 
	}
});


function createBtnNodes(obj, length) {
	for (var j = 0; j < length; j++) {
		var newDiv = document.createElement('button');
		obj.appendChild(newDiv);
	}
}






