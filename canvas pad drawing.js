/* Please ❤ */

(function() {
    
	var devicePixelRatio = window.devicePixelRatio || 1;

	var main = document.getElementById("main");

	var feather = document.getElementById("feather");

	var canvas = document.getElementById("paint");
	var ctx = canvas.getContext("2d");

	var sketch = document.getElementById("sketch");
	var sketch_style = getComputedStyle(sketch);

	var inputType = "mouse";

	canvas.width = parseInt(sketch_style.getPropertyValue("width"), 10);
	canvas.height = parseInt(sketch_style.getPropertyValue("height"), 10);

	// Creating a tmp canvas
	var tmp_canvas = document.createElement("canvas");
	var tmp_ctx = tmp_canvas.getContext("2d");

	tmp_canvas.id = "tmp_canvas";
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;

	sketch.appendChild(tmp_canvas);

	function moveFeather(e) {
		feather.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
	}

	var mouse = {
		x: 0,
		y: 0
	};

	// Pen Points
	var ppts = [];

	/* Mouse Capturing Work */
	tmp_canvas.addEventListener("mousemove", function(e) {
			mouse.x = typeof e.offsetX !== "undefined" ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== "undefined" ? e.offsetY : e.layerY;

			moveFeather(e);

		  e.stopPropagation();
		  e.preventDefault();
		  return false;
		}, false);

	/* Drawing */
	tmp_ctx.lineWidth = 1.5 * devicePixelRatio; /* Size of the drawn line * devicePixelRatio */
	tmp_ctx.lineJoin = "round";
	tmp_ctx.lineCap = "round";
	tmp_ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
	tmp_ctx.fillStyle = "rgba(255, 0, 0, 0.8)";

	tmp_canvas.addEventListener("mousedown", function(e) {
			moveFeather(e);
		if (inputType === "touch") {
			feather.className = "touch down";
		}
		else {
		  inputType = "mouse down";
		}

			tmp_canvas.addEventListener("mousemove", onPaint, false);

			mouse.x = typeof e.offsetX !== "undefined" ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== "undefined" ? e.offsetY : e.layerY;

			ppts.push({
				x: mouse.x,
				y: mouse.y
			});

			onPaint(e);
		}, false);

	tmp_canvas.addEventListener("mouseup", function() {
		if (inputType === "touch") {
			feather.className = "touch";
		}
		else {
		  inputType = "mouse";
		}

			tmp_canvas.removeEventListener("mousemove", onPaint, false);

			// Writing to real canvas now
			ctx.drawImage(tmp_canvas, 0, 0);

			// Clearing tmp canvas
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

			// Emptying up Pen Points
			ppts = [];
		}, false);

	var onPaint = function(e) {
		// Saving all the points in an array
		ppts.push({
			x: mouse.x,
			y: mouse.y
		});

		if (ppts.length < 3) {
			var b = ppts[0];
			tmp_ctx.beginPath();
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fill();
			tmp_ctx.closePath();

			e.preventDefault();
			e.stopPropagation();
			return false;
		}

		// Tmp canvas is always cleared up before drawing.
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

		tmp_ctx.beginPath();
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;

			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}

		// For the last 2 points
		tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, ppts[i + 1].x, ppts[i + 1].y);

		tmp_ctx.stroke();

		e.preventDefault();
		e.stopPropagation();
		return false;
	};

	// Clear canvas
	document.getElementById("clear").onmousedown = document.getElementById("clear").ontouchstart = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	function touchHandler(event) {
		var touch = event.changedTouches[0];
		inputType = "touch";

		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent({ touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup" }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);

		touch.target.dispatchEvent(simulatedEvent);

		event.preventDefault();
		event.stopPropagation();
		return false;
	}

	main.addEventListener("touchstart", touchHandler, true);
	main.addEventListener("touchmove", touchHandler, true);
	main.addEventListener("touchend", touchHandler, true);

/*
	main.addEventListener("touchstart", function(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}, false);
*/
})();