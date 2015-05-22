if (!window.Node) {
  var Node = {            // If there is no Node object, define one
    ELEMENT_NODE: 1,    // with the following properties and values.
    ATTRIBUTE_NODE: 2,  // Note that these are HTML node types only.
    TEXT_NODE: 3,       // For XML-specific nodes, you need to add
    COMMENT_NODE: 8,    // other constants here.
    DOCUMENT_NODE: 9,
    DOCUMENT_FRAGMENT_NODE: 11
  }
} 


var KEY_PAGEUP   = 33;
var KEY_PAGEDOWN = 34;
var KEY_END      = 35;
var KEY_HOME     = 36;

var KEY_LEFT     = 37;
var KEY_UP       = 38;
var KEY_RIGHT    = 39;
var KEY_DOWN     = 40;

var KEY_SPACE    = 32;
var KEY_TAB      = 9;

var KEY_BACKSPACE = 8;
var KEY_DELETE    = 46;
var KEY_ENTER     = 13;
var KEY_INSERT    = 45;
var KEY_ESCAPE    = 27;

var KEY_F1        = 112;
var KEY_F2        = 113;
var KEY_F3        = 114;
var KEY_F4        = 115;
var KEY_F5        = 116;
var KEY_F6        = 117;
var KEY_F7        = 118;
var KEY_F8        = 119;
var KEY_F9        = 120;
var KEY_F10       = 121;

var KEY_M         = 77;



var g_cb1 = null;  // variable for the combobox instantiation
var currentId=0; //atomic number of the selected element
$(document).ready(function() {
	//TODO fill table
	var o={}
	var l=[]
	for(var z=1;z<jsonTable.length;z++){
		var li='<li id="cb1-opt-'+z+'-alpha" role="option" class="cb_option">'+jsonTable[z].name+'</li>';
		
		o[jsonTable[z].name]=li
		l.push(jsonTable[z].name)
		
		li='<li id="cb1-opt-'+z+'" role="option" class="cb_option">'+jsonTable[z].name+'</li>';
		$("#cb1-list").append(li);
	}
	l=l.sort();
	for (var i=0;i<jsonTable.length;i++) {
		$("#cb1-list").append(o[l[i]]);
	}

	g_cb1 = new combobox('cb1', true);
    document.getElementById("cb1-edit").focus();
}); // end ready

//
// keyCodes() is an object to contain keycodes needed for the application
//
function keyCodes() {
	// Define values for keycodes
	this.backspace  = 8;
	this.tab        = 9;
	this.enter      = 13;
	this.shift      = 16; // defined for keyUp event handler - firefox browser fix
	this.ctrl       = 17; // defined for keyUp event handler - firefox browser fix
	this.alt        = 18; // defined for keyUp event handler - firefox browser fix
	this.esc        = 27;

	this.space      = 32;
	this.pageup     = 33;
	this.pagedown   = 34;
	this.end        = 35;
	this.home       = 36;

	this.left       = 37;
	this.up         = 38;
	this.right      = 39; 
	this.down       = 40; 

} // end keyCodes

//
// Function combobox() is a class for an ARIA-enabled combobox widget
// @param (id string) id is the id of the div containing the combobox. Div must have role="combobox".
// @param (editable boolean) editable is true if the edit box should be editable; false if read-only.
// @return N/A
//
function combobox(id, editable) {

	// Define the object properties

	this.$id = $('#' + id);  // The jQuery object of the div containing the combobox
	this.editable = editable;  // True if the edit box is editable
	this.keys = new keyCodes();

	// Store jQuery objects for the elements of the combobox
	this.$edit = $('#' + id + '-edit');  // The jQuery object of the edit box
	this.$button = $('#' + id + '-button');  // The jQuery object of the button
	this.$list = $('#' + id + '-list');  // The jQuery object of the option list
	this.$options = this.$list.find('li');  // An array of jQuery objects for the combobox options

	this.$selected; // the current value of the combobox
	this.$focused; // the currently selected option in the combo list
	this.timer = null; // stores the close list timer that is set when combo looses focus

	// Initalize the combobox
	this.init();

	// bind event handlers for the widget
	this.bindHandlers();

} // end combobox constructor


//
// Function init() is a member function to initialize the combobox elements. Hides the list
// and sets ARIA attributes
//
// @return N/A
//
combobox.prototype.init = function() {

	// Hide the list of options
	this.closeList(false);

	// If the edit box is to be readonly, aria-readonly must be defined as true
	if (this.editable == false) {
		this.$edit.attr('aria-readonly', 'false');
	}

	// Set initial value for the edit box
	this.$selected = this.$options.filter('.selected');

	if (this.$selected.length > 0) {
		//TODO I don't want to overwrite the input
		//this.$edit.val(this.$selected.text());
	}

} // end initCombo()

//
// Function bindHandlers() is a member function to bind event handlers for the combobox elements
//
// @return N/A
//
combobox.prototype.bindHandlers = function() {

	var thisObj = this;

	///////////////// bind editbox handlers /////////////////////////

	this.$edit.keydown(function(e) {
		return thisObj.handleEditKeyDown($(this), e);
	});

	this.$edit.keyup(function(e) {
		return thisObj.handleEditKeyUp($(this), e);
	});

	this.$edit.keypress(function(e) {
		return thisObj.handleEditKeyPress($(this), e);
	});

	this.$edit.blur(function(e) {
		return thisObj.handleComboBlur($(this), e);
	});

	///////////////// bind handlers for the button /////////////////////////
	
	this.$button.click(function(e) {
		return thisObj.handleButtonClick($(this), e);
	});

	this.$button.mouseover(function(e) {
		return thisObj.handleButtonMouseOver($(this), e);
	});

	this.$button.mouseout(function(e) {
		return thisObj.handleButtonMouseOut($(this), e);
	});

	this.$button.mousedown(function(e) {
		return thisObj.handleButtonMouseDown($(this), e);
	});

	this.$button.mouseup(function(e) {
		return thisObj.handleButtonMouseUp($(this), e);
	});

	///////////////// bind listbox handlers /////////////////////////

	this.$list.focus(function(e) {
		return thisObj.handleComboFocus($(this), e);
	});

	this.$list.blur(function(e) {
		return thisObj.handleComboBlur($(this), e);
	});

	///////////////// bind list option handlers /////////////////////////

	this.$options.click(function(e) {
		return thisObj.handleOptionClick($(this), e);
	});

} // end bindHandlers()

//
// Function isOpen() is a member function to get the current state of the list box
//
// @return (boolean) returns true if list box is open; false if it is not
//
combobox.prototype.isOpen = function() {

	return this.$list.attr('aria-expanded');

} // end isOpen

//
// Function closeList() is a member function to close the list box if it is open
//
// @param (restore booleam) restore is true if function should restore higlight to stored list selection
//
// @return N/A
//
combobox.prototype.closeList = function(restore) {

	var $curOption = this.$options.filter('.selected');

	if (restore == true) {
		$curOption = this.$selected;

		// remove the selected class from the other list items
		this.$options.removeClass('selected');

		// add selected class to the stored selection
		$curOption.addClass('selected');
	}

	this.$list.hide().attr('aria-expanded', 'false');

} // end closeList()

//
// Function openList() is a member function to open the list box if it is closed
//
// @param (restore booleam) restore is true if function should restore higlight to stored list selection
//
// @return N/A
//
combobox.prototype.openList = function(restore) {

	var $curOption = this.$options.filter('.selected');


	if (restore == true) {
		$curOption = this.$selected;

		// remove the selected class from the other list items
		this.$options.removeClass('selected');

		// add selected class to the stored selection
		$curOption.addClass('selected');
	}

	this.$list.show().attr('aria-expanded', 'true');

	if (this.$selected.length == 0) {

		// select the first item
		//TODO
		//this.selectOption(this.$options.first());
		$curOption = this.$selected;
	}

	// scroll to the currently selected option
	this.$list.scrollTop(this.calcOffset($curOption));

} // end openList();

//
// Function toggleList() is a member function to toggle the display of the combobox options.
//
// @param (restore boolean) restore is true if toggle should restore higlight to stored list selection
//
// Return N/A
//
combobox.prototype.toggleList = function(restore) {

	if (this.isOpen() == 'true') {

		this.closeList(restore);
	}
	else {
		this.openList(restore);
	}

} // end toggleList()

//
// Function selectOption() is a member function to select a new combobox option.
// The jQuery object for the new option is stored and the selected class is added
//
// @param ($id object) $id is the jQuery object of the new option to select
//
// @return N/A
// 
combobox.prototype.selectOption = function($id) {

	// remove the selected class from the list
	this.$options.removeClass('selected');
	
	// add the selected class to the new option
	$id.addClass('selected');

	// store the newly selected option
	this.$selected = $id;

	// update the edit box
	//TODO
	//this.$edit.val($id.text());    
	//move cursor to the end
	this.selectText(this.$edit.val().length, this.$edit.val().length);

	// reset the option list
	this.$options = this.$list.find('li').removeClass('hidden');
	
} // end selectOption

//
// Function calcOffset() is a member function to calculate the pixel offset of a list option from the top
// of the list
//
// @param ($id obj) $id is the jQuery object of the option to scroll to
//
// @return (integer) returns the pixel offset of the option
//
combobox.prototype.calcOffset = function($id) {
	var offset = 0;
	var selectedNdx = this.$options.index($id);

	for (var ndx = 0; ndx < selectedNdx; ndx++) {
		if (this.$options.eq(ndx).not('[class=hidden]')) {
			offset += this.$options.eq(ndx).outerHeight();
		}
	}

	return offset;

} // end calcOffset

//
// Function handleButtonClick() is a member function to consume button click events. This handler prevents
// clicks on the button from reloading the page. This could also be done by adding 'onclick="false";' to the
// button HTML markup.
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean)  returns false;
//
combobox.prototype.handleButtonClick = function($id,  e) {

	e.stopPropagation();
	return false;

} // end handleButtonClick();

//
// Function handleButtonMouseOver() is a member function to process button mouseover events
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean)  returns false;
//
combobox.prototype.handleButtonMouseOver = function($id,  e) {

	// change the button image to reflect the highlight state
	//$id.find('img').attr('src', 'images/button-arrow-down-hl.png');
	//$("#cb1-button").text("&#9660;")
	
	e.stopPropagation();
	return false;

} // end handleButtonMouseOver();

//
// Function handleButtonMouseOut() is a member function to process button mouseout events
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean)  returns false;
//
combobox.prototype.handleButtonMouseOut = function($id,  e) {

	// reset image to normal state
	//$id.find('img').attr('src', 'images/button-arrow-down.png');
	//$("#cb1-button").text("&#9660;")
	e.stopPropagation();
	return false;

} // end handleButtonMouseOut();

//
// Function handleButtonMouseDown() is a member function to process button mousedown events
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean)  returns false;
//
combobox.prototype.handleButtonMouseDown = function($id,  e) {

	// change the button image to reflect the pressed state
	//$id.find('img').attr('src', 'images/button-arrow-down-pressed-hl.png');
	//$("#cb1-button").text("&#9660;")
	// toggle the display of the option list
	//this.toggleList(true);

	// Set focus on the edit box
	//this.$edit.focus();

	e.stopPropagation();
	return false;

} // end handleButtonMouseDown();

//
// Function handleButtonMouseUp() is a member function to process button mouseup events
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean)  returns false;
//
combobox.prototype.handleButtonMouseUp = function($id,  e) {

	// reset button image
	//$id.find('img').attr('src', 'images/button-arrow-down-hl.png');
	//$("#cb1-button").text("&#9660;")
	e.stopPropagation();
	return false;

} // end handleButtonMouseUp();

//
// Function handleEditKeyDown() is a member function to process keydown events for
// the edit box.
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns false if consuming; true if not processing
//
combobox.prototype.handleEditKeyDown = function($id,  e) {

	var $curOption = this.$options.filter('.selected');
	var curNdx = this.$options.index($curOption);

	switch(e.keyCode) {
		case this.keys.tab: {
			// store the current selection
			this.selectOption($curOption);

			if (this.isOpen() == 'true') {
				// Close the option list
				this.closeList(false);
			}

			// allow tab to propagate
			return true;
		}
		case this.keys.esc: {
			// Do not change combobox value

			// Restore the edit box to the selected value
			this.$edit.val(this.$selected.text());

			// Select the text
			this.$edit.select();

			if (this.isOpen() == 'true') {

				// Close the option list
				this.closeList(true);
			}

			e.stopPropagation();
			return false;
		}
		case this.keys.enter: {
			if (e.shiftKey || e.altKey || e.ctrlKey) {
				// do nothing
				return true;
			}

			if (this.isOpen() == 'false') {
				// open the option list
				//this.openList(false);
                var val=this.$edit.val().toLowerCase();
                for(var z=1;z<jsonTable.length;z++){
                    if (val==jsonTable[z].name.toLowerCase()||val==jsonTable[z].symbol.toLowerCase()) {
                        window.location.href = "mostrarElemento.html?z="+z+"&back=busqueda.html";
                    }
                }
			}
			else {
				// store the new selection
				this.selectOption($curOption);
                //TODO open the search result on a new tab
				// Close the option list
				this.closeList(false);
			}

			e.stopPropagation();
			return false;
		}
		case this.keys.up: {
			
			var $curOption = this.$options.filter('.selected');

			if (e.shiftKey || e.ctrlKey) {
				// do nothing
				return true;
			}

			if (e.altKey) {
				// alt+up toggles the list

				if (this.isOpen() == 'true') {

					this.selectOption($curOption);
				}
				
				// toggle the list
				this.toggleList(false);
			}
			else {
				// move to the previous item in the list
			
				if (curNdx > 0) {
					var $prev = this.$options.eq(curNdx - 1);

					// remove the selected class from the current selection
					$curOption.removeClass('selected');

					// Add the selected class to the new selection
					$prev.addClass('selected');

					// Change the text in the edit box
					this.$edit.val($prev.text());

					// Select the text
					this.$edit.select();

					if (this.isOpen() == true) {
						// scroll the list window to the new option
						this.$list.scrollTop(this.calcOffset($prev));
					}
				}
			}

			e.stopPropagation();
			return false;
		}
		case this.keys.down: {
			if (e.shiftKey || e.ctrlKey) {
				// do nothing
				return true;
			}

			if (e.altKey) {
				// alt+up toggles the list

				if (this.isOpen() == 'true') {
					// Restore the edit box to the selected value
					this.$edit.val(this.$selected.text());

					// Select the text
					this.$edit.select();

					// alt+up toggles the list
					this.closeList(true);
				}
				else {
					// alt+up toggles the list
					this.openList(false);
				}
			}
			else {
				// move to the next item in the list

				if (curNdx != this.$options.length - 1) {
					var $prev = this.$options.eq(curNdx + 1);

					// remove the selected class from the current selection
					this.$options.eq(curNdx).removeClass('selected');

					// Add the selected class to the new selection
					$prev.addClass('selected');

					// Change the text in the edit box
					this.$edit.val($prev.text());

					// Select the text
					this.$edit.select();

					if (this.isOpen() == true) {
						// scroll the list window to the new option
						this.$list.scrollTop(this.calcOffset($prev));
					}
				}
			}

			e.stopPropagation();
			return false;
		}
	}

	return true;

} // end handleEditKeyDown()

//
// Function handleEditKeyUp() is a member function to process keyup events for
// the edit box.
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns false if consuming; true if not processing
//
function isLiAlpha(id){
	return (id.indexOf("alpha")>=0);
}
	

combobox.prototype.handleEditKeyUp = function($id,  e) {

	var thisObj = this;
	var val = this.$edit.val();
	var re = new RegExp('^' + val, 'i');

	if (e.shiftKey || e.ctrlKey || e.altKey) {
		// do nothing
		return true;
	}

	switch (e.keyCode) {
		case this.keys.shift:
		case this.keys.ctrl:
		case this.keys.alt:
		case this.keys.esc: 
		case this.keys.tab:
		case this.keys.enter:
		case this.keys.left:
		case this.keys.right:
		case this.keys.up:
		case this.keys.down:
		case this.keys.home:
		case this.keys.end: {
			// do nothing
			return true;
		}
	}

	// repopulate the list make all items visible and remove the selection highlighting
	this.$options = this.$list.find('li').removeClass('hidden').removeClass('selected');

	if (val.length == 0) {
		// if the list box is visible, scroll to the top
		if (this.isOpen() == 'true') {
			this.$list.scrollTop(0);
		}
	}
	else {
		// recreate the list including only options that match
		// what the user typed
		//////////////////////////////////////////////////////////TODO The search is done here
		
		
		
		
		var tok=val.match(/[$#]*[\wáéíóúÁÉÍÓÚñÑüÜ]+/g)
		if (tok[0] && tok[0].toLowerCase().indexOf("actinido")==0){
			this.$options = this.$options.filter(function(index) {
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (3==getGrupo(z) && 7==getPeriodo(z)) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		} else if (tok[0] && tok[0].toLowerCase().indexOf("lantanido")==0){
			this.$options = this.$options.filter(function(index) {
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (3==getGrupo(z) && 6==getPeriodo(z)) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		} else if (tok[0] && tok[0].toLowerCase().indexOf("g")==0 && tok[1]) {
			var grupo=parseInt(tok[1]);
			this.$options = this.$options.filter(function(index) {
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (grupo==getGrupo(z)) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
			
		} else if (tok[0] && tok[0].toLowerCase().indexOf("p")==0 && tok[1]) {
			var periodo=parseInt(tok[1]);
			this.$options = this.$options.filter(function(index) {
				
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (periodo==getPeriodo(z)) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		} else if (tok[0] && tok[0].toLowerCase().indexOf("z")==0 && tok[1]) {
			var currentZ=parseInt(tok[1]);
			this.$options = this.$options.filter(function(index) {
				
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (currentZ==z) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		} else if (tok[0] && tok[0].toLowerCase().indexOf("s")==0 && tok[1]) {
			var simbolo=tok[1];
			this.$options = this.$options.filter(function(index) {
				
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				if (simbolo.toLowerCase()==jsonTable[z].symbol.toLowerCase()) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		}				
		else{
			this.$options = this.$options.filter(function(index) {
				var id=($(this).get(0).id)
				var z=id.split("-")[2]
				if (!isLiAlpha(id)) {
					$(this).addClass('hidden');
					return false
				}
				
				//if (val.toLowerCase()==jsonTable[z].symbol.toLowerCase()) {
				//	return true;
				
				if (re.test($(this).text()) == true) {
					return true;
				}
				else {
					// hide those entries that do not match
					$(this).addClass('hidden');
					return false;
				}
			});
		}
	}
	if (this.$options.length > 0) {
		var $newOption = this.$options.first();
		var newVal = $newOption.text();
		var start = val.length;
		var end = newVal.length;
		var editNode = this.$edit.get(0);

		if (e.keyCode != this.keys.backspace) {
			// if the user isn't backspacing, fill in the
			// suggested value.
			//TODO I don't want to overwrite the current input
			//this.$edit.val(newVal);
		}

		// Select the auto-complete text
		//this.selectText(start, end);

		// Reset the highlighting for the list
		this.$options.removeClass('selected');

		//$newOption.addClass('selected');
	}

	// Show the list if it is hidden
	if (this.isOpen() == 'false') {
		this.openList(false);
	}

	e.stopPropagation();
	return false;
} // end handleEditKeyUp()

//
// Function handleEditKeyPress() is a member function to process keypress events for
// the edit box. Needed for browsers that use keypress events to manipulate the window.
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns false if consuming; true if not processing
//
combobox.prototype.handleEditKeyPress = function($id,  e) {

	var curNdx = this.$options.index($id);

	if (e.altKey && (e.keyCode == this.keys.up || e.keyCode == this.keys.down)) {
		e.stopPropagation();
		return false;
	}

	switch(e.keyCode) {
		case this.keys.enter:
		case this.keys.up:
		case this.keys.down: {
			e.stopPropagation();
			return false;
		}
	}

	return true;

} // end handleOptionKeyPress()

//
// Function handleOptionClick() is a member function to process click events for
// the combobox.
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns false
//
combobox.prototype.handleOptionClick = function($id,  e) {

	// select the clicked item
	this.selectOption($id);

	// set focus on the edit box
	this.$edit.focus();

	// close the list
	this.closeList(false);

	e.stopPropagation();
	return false;	

} // end handleOptionClick()

//
// Function handleComboFocus() is a member function to process focus events for
// the combobox
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns true
//
combobox.prototype.handleComboFocus = function($id,  e) {

	window.clearTimeout(g_cb1.timer);

	// set focus on the edit box
	this.$edit.focus();

	e.stopPropagation();
	return false;

} // end handleComboFocus()

//
// Function handleComboBlur() is a member function to process blur events for
// the combobox
//
// @param (e object) e is the event object associated with the event
//
// @param ($id object) $id is the jQuery object for the element firing the event
//
// @return (boolean) Returns true
//
combobox.prototype.handleComboBlur = function($id,  e) {

	// store the currently selected value
	this.selectOption(this.$options.filter('.selected'));

	// close the list box
	if (this.isOpen() == 'true') {
		this.timer = window.setTimeout(function() {g_cb1.closeList(false);}, 40);
	}

	e.stopPropagation();
	return false;

} // end handleComboBlur()

//
// Function selectText() is a member function to select some of the text in the edit box.
// If start and end are the same value, the function moves the cursor to that position.
//
// @param (start object) start is the character position for the start of the selection
//
// @param (end object) end is the character position for the end of the selection
//
// @return N/A
//
combobox.prototype.selectText = function(start, end) {

	var editNode = this.$edit.get(0);

	if (editNode.setSelectionRange) {
		// Firefox and other gecko based browsers
		editNode.setSelectionRange(start, end);
	}
	else if (editNode.createTextRange) {
		// Internet Explorer
		var range = editNode.createTextRange();
		range.collapse(true);
		range.moveEnd('character', start);
		range.moveStart('character', end);
		range.select();
	}
	else if (editNode.selectionStart) {
		// Other browsers
		editNode.selectionStart = start;
		editNode.selectionEnd = end;
	}

} // end selectText()

