
	var activeElement;

	var	creator = $('<div id="creator">' +
			'<button onclick="changeMenu(gridMaker)">New grid row</button>' +
			'<button onclick="append(\'article\')">New article</button>' +
			'</div>'
	);

	var gridMaker = $('<div id="gridMaker">' +
			'<h5>Grid Maker Menu</h5>' +
			'<label for="columns">Content columns:</label>' +
			'<input name="columns" type="text"><hr>' +
			'<label for="col-sm">Columns per row sm:</label>' +
			'<input name="col-sm" type="text" />' +
			'<label for="col-md">Columns per row md:</label>' +
			'<input name="col-md" type="text" />' +
			'<label for="col-lg">Columns per row lg:</label>' +
			'<input name="col-lg" type="text" />' +
			'</div>'
	);

	var	editor = $('<div id="editor">' +
			'<h5>Editor</h5>' +
			'<button onclick="doCommand(\'bold\')">B</button>' +
			'<button onclick="doCommand(\'italic\')">I</button>' +
			'<button onclick="doCommand(\'underline\')">U</button><br>' +
			'<button onclick="doCommand(\'justifyLeft\')">Left</button>' +
			'<button onclick="doCommand(\'justifyRight\')">Right</button>' +
			'<button onclick="doCommand(\'justifyCenter\')">Center</button>' +
			'<button onclick="doCommand(\'justifyFull\')">Justified</button>' +
			'</div>'
	);

	var mousex;
	var mousey;
	var move = false;
	var ldivx = 200;
	var ldivy = 200;
	 
	var IE = document.all?true:false;
	if (!IE) document.captureEvents(Event.MOUSEMOVE)

	window.onload = init;

	function init() {
		var d = document.getElementById('dragme');
		d.onmousedown = mousedown;
		d.onmouseup = mouseup;
		d.onmousemove = mousemove;
		d.style.left = ldivx +'px';
		d.style.top = ldivy +'px';
		d.style.display = 'block';

		
		$('#dragme').append(creator);
	}
	 
	function mousedown(e) {
		document.getElementById('dragme').style.color = 'red';
		move = true;
	if (IE) {
			mousex = event.clientX + document.body.scrollLeft;
			mousey = event.clientY + document.body.scrollTop;
		}
		else {
			mousex = e.pageX; 
			mousey = e.pageY;
		}
	}
	 
	function mouseup(e) {
		document.getElementById('dragme').style.color = 'black';
		move = false;
	}
	 
	function mousemove(e) {
		if(move){
			if (IE) {
				ldivx = ldivx + event.clientX + document.body.scrollLeft - mousex;
				ldivy = ldivy + event.clientY + document.body.scrollTop - mousey;
				mousex = event.clientX + document.body.scrollLeft;
				mousey = event.clientY + document.body.scrollTop;
			} 
			else {
				ldivx = ldivx + e.pageX - mousex;
				ldivy = ldivy + e.pageY - mousey;
				mousex = e.pageX;
				mousey = e.pageY;
			}
			var d = document.getElementById('dragme');
			d.style.left = ldivx +'px';
			d.style.top = ldivy +'px';
		}
	}

	$(document).on('focus','.editable',function(){
		activeElement = $(this);
		document.execCommand('styleWithCss',false,true);
		changeMenu(editor);
	});

	function changeMenu(menu){
		$('#dragme').empty();
		$('#dragme').append(menu);
	}

	function append(element) {
		$("<" + element + " class='editable' contentEditable='true'></" + element + ">").appendTo(".container").focus();
	}

	function doCommand(command,argument){
		document.execCommand(command,false,argument);
		activeElement.focus();
	}






