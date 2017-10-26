
 			var text = document.getElementsByTagName('p');
 			var popup = document.getElementById('myPopup');
 			var hint = document.getElementById('popupHint');
 			var tags = document.getElementById('tags');

 			var popup_y_offset = -155;	//positive number means moving downwards.
 			var popup_x_offset = -50;	//positive number means moving towards right.
 			var popup_width = 500;	//width of the popup window
 			var popup_height = 150;	//height of the popup window 
 			var i;

  			for (i = 0; i < text.length; i++) {
  				text[i].addEventListener('mouseup', function () {
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

