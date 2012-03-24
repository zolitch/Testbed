/*global window, jQuery, Raphael */
(function ($) {
console.log($('.mod-graph-holder').outerWidth());
	var r, /*Raphael instance*/
		labels = [], 
		label,
		data = [],
		multiple = 0,
		width = $('.mod-graph-holder').outerWidth(),
		totPoints = 121, /*total graph points. */
		height = 273,
		leftgutter= 0,
		bottomgutter = 20,
		topgutter = 10,
		color = "#64aa3c",
		blanket,
		rect,
		leave_timer,
		path,
		bgp,
		is_label_visible = false,
		x,
		y,
		frame;
			
			
	/*
		Drawgrid parameters:
		x = x value
		y = y value
		w = width of the whole grid
		h = height of the whole grid
		wv = number of columns in total
		hv = number of rows in total
		color = the grid line color
	*/
	
	Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
		color = color || "#000";
		var path = ["M", Math.round(x) + 0.5, Math.round(y) + 0.5, "L", Math.round(x + w) + 0.5, Math.round(y) + 0.5, Math.round(x + w) + 0.5, Math.round(y + h) + 0.5, Math.round(x) + 0.5, Math.round(y + h) + 0.5, Math.round(x) + 0.5, Math.round(y) + 0.5],
			rowHeight = h / hv,
			columnWidth = w / wv,
			i;
		for (i = 1; i < hv; i+=1) {
			path = path.concat(["M", Math.round(x) + 0.5, Math.round(y + i * rowHeight) + 0.5, "H", Math.round(x + w) + 0.5]);
		}
		for (i = 1; i < wv; i+=1) {
			path = path.concat(["M", Math.round(x + i * columnWidth) + 0.5, Math.round(y) + 0.5, "V", Math.round(y + h) + 0.5]);
		}
		return this.path(path.join(",")).attr({stroke: color});
	};

	var getAnchors = function(p1x, p1y, p2x, p2y, p3x, p3y) {
		// if l1 and l2 = 1, the path lines will be straight
		//var l1 = (p2x - p1x) / 1000,
		//    l2 = (p3x - p2x) / 1000,
		var l1 = 1,
			l2 = 1,
			a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
			b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
		a = p1y < p2y ? Math.PI - a : a;
		b = p3y < p2y ? Math.PI - b : b;
		var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
			dx1 = l1 * Math.sin(alpha + a),
			dy1 = l1 * Math.cos(alpha + a),
			dx2 = l2 * Math.sin(alpha + b),
			dy2 = l2 * Math.cos(alpha + b);
		return {
			x1: p2x - dx1,
			y1: p2y + dy1,
			x2: p2x + dx2,
			y2: p2y + dy2
		};
	};
	
	var setPopupValues = function (x, y, data, lbl, dot) {
		//console.log(x, y, data, lbl, dot);
		var timer, i = 0;
		rect.hover(function () {
			clearTimeout(leave_timer);
			var side = "right";
			if (x + frame.getBBox().width > width) {
				side = "left";
			}
			var ppp = r.popup(x, y, label, side, 1);
			frame.show().stop().animate({path: ppp.path}, 200 * is_label_visible);
			//label[0].attr({text: data + " hit" + (data == 1 ? "" : "s")}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
			//label[1].attr({text: lbl + " &nbsp;"}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
			//console.log('data: ' + data + ' ');
			//console.log('lbl: ' + lbl + ' ');
			label[0].attr({text: data + ' '}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
			label[1].attr({text: lbl + ' '}).show().stop().animateWith(frame, {translation: [ppp.dx, ppp.dy]}, 200 * is_label_visible);
			if (dot !== ''){dot.attr("r", 6);}
			is_label_visible = true;
		}, function () {
			if (dot !== ''){dot.attr("r", 4);}
			leave_timer = setTimeout(function () {
				frame.hide();
				label[0].hide();
				label[1].hide();
				is_label_visible = false;
			}, 1);
		});
	};
	
	
	$(function () {
		$(".mod-graph-data").css({
			position: "absolute",
			left: "-9999em",
			top: "-9999em"
		});
	});

	window.onload = function () {
		// Grab the data
		$(".mod-graph-data tfoot th").each(function () {
			labels.push($(this).html());
		});
		$(".mod-graph-data tbody td").each(function () {
			data.push($(this).html());
		});
		
		console.log('labels.length: ' + labels.length);
		// Draw
		var txt = {font: '14px Helvetica, Arial', fill: "#fff"},
			txt1 = {font: '10px Helvetica, Arial', fill: "#fff"},
			txt2 = {font: '10px Helvetica, Arial', fill: "#555"},
			//X = (width - leftgutter) / labels.length,
			X = (width - leftgutter) / totPoints ,
			max = Math.max.apply(Math, data),
			Y = (height - bottomgutter - topgutter) / (max + 1),
			yValuesTot = 9
			xValuesTot = 1;
			
		r = new Raphael("graph-1", width, height);
		r.drawGrid(leftgutter + X * 0.5 + 0.5, topgutter + 0.5, width - leftgutter - X , height - topgutter - bottomgutter, xValuesTot, yValuesTot, "#e3e3e4");
		path = r.path().attr({stroke: color, "stroke-width": 2});
		bgp = r.path().attr({stroke: "none", fill: "270-#64aa3c:0-#fff", opacity: 0.7});
		
		var i = 0,
			ii = 0;
			
			
		blanket = r.set();
		
		label = r.set();
		label.push(r.text(1, 1, "0").attr(txt));
		label.push(r.text(10, 18, "0").attr(txt1).attr({fill: '#fff'}));
		label.hide();
		frame = r.popup(100, 100, label, "right").attr({fill: "120-#224099:30-#396bff", stroke: "#224099", "stroke-width": 0, "fill-opacity": 0.7}).hide();
		
		var p, bgpp;
		
		
		for (i = 0, ii = labels.length; i < ii; i+=1) {
		
			y = Math.round(height - bottomgutter - Y * data[i]);
			x = Math.round(leftgutter + X * (i + 0.5));
			var t,
				dot;
			
			/*only set the x label values and the graph 'dot' value every 'multiple' time of the loop*/	
			if (i === multiple ) {
				//t = r.text(x, height - 6, labels[i]).attr(txt2).toBack(); /*The x values along the bottom*/
				t = ''; /*The x values along the bottom*/
				//dot = '';
				dot = r.circle(x, y, 4).attr({fill: "#fff", stroke: color, "stroke-width": 2});
				multiple += 12;
			}else{
				t = ''; /*The x values along the bottom*/
				dot = '';
			}
			
			if (!i) {
				p = ["M", x, y, "C", x, y];
				bgpp = ["M", leftgutter + X * 0.5, height - bottomgutter, "L", x, y, "C", x, y];
			}
			if (i && i < ii - 1) {
				var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
					X0 = Math.round(leftgutter + X * (i - 0.5)),
					Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
					X2 = Math.round(leftgutter + X * (i + 1.5));
				var a = getAnchors(X0, Y0, x, y, X2, Y2);
				p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
				bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
			}
			
			
			blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({stroke: "none", fill: "#fff", opacity: 0}));
			rect = blanket[blanket.length - 1];
			setPopupValues(x, y, data[i], labels[i], dot);
		}
		p = p.concat([x, y, x, y]);
		bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
		path.attr({path: p});
		bgp.attr({path: bgpp});
		frame.toFront();
		label[0].toFront();
		label[1].toFront();
		blanket.toFront();
	};
} (jQuery));