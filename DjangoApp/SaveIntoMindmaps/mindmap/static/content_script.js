/*********************************************************************
/*HTML and CSS part
/*********************************************************************/
//Create HTML element for the popup box
document.onreadystatechange = function () {
	if (document.readyState === "complete" ) {
		var popup = document.createElement('div');
		popup.style.position = "absolute";
		popup.style.paddingTop = '5px';
		popup.style.paddingBottom = '5px';
		popup.style.paddingLeft = '10px';
		popup.style.paddingRight = '10px';

		popup.style.lineHeight = '2';
		popup.style.backgroundColor = '#336699';
		popup.style.borderBottomLeftRadius = '12px';
		popup.style.boxShadow = "10px 10px 10px #888888";
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

		// declare an field text for the input text box
		var comment_hint = document.createElement('h4');
		comment_hint.innerHTML = 'Your comment:'
		comment_hint.style.position = "relative";
		comment_hint.style.fontWeight = "800";
		comment_hint.style.color = '#ecf2f9';

		// declare an input text box for user comment
		var comment_input = document.createElement('textarea');
		comment_input.className = 'form-control';
		comment_input.rows = '2';
		comment_input.setAttribute('id', 'focusedInput');
		comment_input.placeholder = 'e.g. What is the AI';
		// declare an field text for the topic
		var topic_hint = document.createElement('h4');
		topic_hint.innerHTML = 'Select a topic:'
		topic_hint.style.fontWeight = "800";
		topic_hint.style.color = '#ecf2f9';

		// declare an submit button
		var submit_btn = document.createElement('BUTTON');
		submit_btn.name = 'submit';
		submit_btn.className = "btn btn-dark";
		$(submit_btn).text("SAVE");

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

		/*********************************************************************
		/*JavaScript part
		/*********************************************************************/
		document.body.appendChild(popup);
		popup.appendChild(hint);
		popup.appendChild(comment_hint);
		popup.appendChild(comment_input);
		popup.appendChild(topic_hint);
		popup.appendChild(tags);
		popup.appendChild(submit_btn);
		popup.style.display = "none";

		var rootElement = document.documentElement;
		var firstTier = rootElement.childNodes;

		var user_selection, user_comment, topic;

		//Event handler for user pressing the keyboard
		document.addEventListener('keydown', (event) => {
			//when the 'alt' key is pressed
			if (event.altKey) {
				for (var i = 0; i < firstTier.length; i++) {
					//Event handler for 'user selection' on the webpage
					firstTier[i].addEventListener('mouseup', function (e) {
						//Elements in the popup window is set to be not selectable!
						if (!popup.contains(e.target)) {
							var sel = window.getSelection().toString().trim();
							user_selection = sel;
							//**********************************************************************
							tags.innerHTML = null;
							if(sel !== "") {
								var range = window.getSelection().getRangeAt(0);
								var span = document.createElement('span');
								//Display the selected text in a pop up window
								sel = sel.toUpperCase();
								var clickTag = sel.split(" ", 8);
								//hint.innerHTML = "点击并保存到所属类别";
								//Make tags as buttons
								createBtnNodes(tags, clickTag.length);

								//Add event listerner to each tag
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

								popup.style.display = "initial";

								//Event handler for user selecting the topics
								for (var j = 0; j <= tags.childNodes.length; j++) {
									tags.childNodes[j].addEventListener('mousedown', function(e){
										e.target.style.backgroundColor = '#B22222';
										e.target.style.color = '#FFFFFF';
										topic = e.target.innerHTML;
									});
								}
							}
							//Only if the user clicks on none-popup DOM element, popup disppeared.
							else {
								popup.style.display = "none" ;
							}
						}
					});
				};
			};
		});

		//Event handler for user typing in the comment
		comment_input.addEventListener('input', function(){
			user_comment = comment_input.value;
		});

		//Send user's selection, comments, topic to the backend
		$(submit_btn).click(function(){
			$.ajaxSetup({
				beforeSend: function(xhr, settings) {
					if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
						// Send the token to same-origin, relative URLs only.
						// Send the token only if the method warrants CSRF protection
						// Using the CSRFToken value acquired earlier
						xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
					}
				}
			});
			$.post("mindmap/SaveUserSelection/", {'text_content':user_selection,
			"user_comment":user_comment,
			"parent_node":topic},
			function(){
				popup.style.display = "none" ;
			});
		});
	}
}

//**********************************************************************
//functions
//**********************************************************************
//CSRFToken set-up for 'POST' requests
function csrfSafeMethod(method) {
	// these HTTP methods do not require CSRF protection
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
	// test that a given url is a same-origin URL
	// url could be relative or scheme relative or absolute
	var host = document.location.host; // host + port
	var protocol = document.location.protocol;
	var sr_origin = '//' + host;
	var origin = protocol + sr_origin;
	// Allow absolute or scheme relative URLs to same origin
	return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
	(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
	// or any other URL that isn't scheme relative or absolute i.e relative.
	!(/^(\/\/|http:|https:).*/.test(url));
}

//Get csrftoken that is stored in cookie
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

function createBtnNodes(obj, length) {
	for (var j = 0; j < length; j++) {
		var newDiv = document.createElement('button');
		newDiv.className = 'btn btn-light';
		obj.appendChild(newDiv);
	}
}
