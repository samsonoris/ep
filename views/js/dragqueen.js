
<script>
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
</script>
