// (function() {
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width], .3);

	var y = d3.scale.linear()
	    .rangeRound([height, 0]);

	var valueLabel = 'Downloads';

	var color = d3.scale.ordinal()
	    .range(['#257900', '#848000', '#8f2200', '#9a004b', '#8100a5', '#007ebb']);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient('bottom');

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient('left')
	    .tickFormat(d3.format('.2s'));

	var chart = d3.select('body').append('div').attr('class', 'bar-chart');

	var svg = chart.append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
			.on('mousemove', function(d) {
				var xy = d3.mouse(this);
				tooltip.style('left', xy[0] + 10 + 'px');
				tooltip.style('top', xy[1] + 10 + 'px');
			})
	  .append('g')
	    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var tooltip = chart.append('div')
		.attr('class', 'tooltip');

	d3.csv('data/data.csv', function(error, data) {
		if (error) return console.error(error);

		// ignore last row in csv (total)
		data = data.slice(0, -1);

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'month'; }));

		console.log(data);

	  data.forEach(function(d) {
	  	console.log('item ',d);
	    var y0 = 0;
	    d.apps = color.domain().map(function(name) { return {name: name, val: d[name], y0: y0, y1: y0 += +d[name]};	});
	    d.total = d.apps[d.apps.length - 1].y1;
	  });

	  x.domain(data.map(function(d) { return d.month; }));
	  y.domain([0, d3.max(data, function(d) { return d.total; })]);

	  svg.append('g')
	      .attr('class', 'x axis')
	      .attr('transform', 'translate(0,' + height + ')')
	      .call(xAxis);

	  svg.append('g')
	      .attr('class', 'y axis')
	      .call(yAxis)
	    .append('text')
	      .attr('transform', 'rotate(-90)')
	      .attr('y', 6)
	      .attr('dy', '.71em')
	      .style('text-anchor', 'end')
	      .text(valueLabel);

	  var month = svg.selectAll('.month')
	      .data(data)
	    .enter().append('g')
	      .attr('class', 'g')
	      .attr('transform', function(d) { return 'translate(' + x(d.month) + ',0)'; });

	  month.selectAll('rect')
	      .data(function(d) { return d.apps; })
	    .enter().append('rect')
	      .attr('width', x.rangeBand())
	      .attr('y', height)
	      .attr('height', 0)
	      .style('fill', function(d) { return color(d.name); })
	      .on('mouseover', function(d, i) {
	      	// console.log(d);
	      	tooltip.html('<span id="keyword">' + d.name + '<br>' + d.val + ' ' + valueLabel.toLowerCase() + '</span>');
	      	// tooltip.style("display", "block");
	      	tooltip.style('opacity', 1);
	      })
	      .on('mouseout', function() {
	      	// tooltip.style("display", "none");
	      	tooltip.style('opacity', 0);
	      })
	      .transition()
	      .duration(400)
	      .attr('y', function(d) { return y(d.y1); })
	      .attr('height', function(d) { return y(d.y0) - y(d.y1); });

/*
 * LEGEND DRAW
 */
	  var legend = svg.selectAll('.legend')
	      .data(color.domain().slice().reverse())
	    .enter().append('g')
	      .attr('class', 'legend')
	      .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

	  legend.append('rect')
	      .attr('x', width - 18)
	      .attr('width', 18)
	      .attr('height', 18)
	      .style('fill', color);

	  legend.append('text')
	      .attr('x', width - 24)
	      .attr('y', 9)
	      .attr('dy', '.35em')
	      .style('text-anchor', 'end')
	      .text(function(d) { return d; });


 	});

// })();
