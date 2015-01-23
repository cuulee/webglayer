
//function dataupdateloop() {
//	util.createFilteringData(generateOneTriangle());
//	mcontroller.zoommove((Math.random() - 0.5) * 0.4, {
//		x : (Math.random() - 0.5) * 5,
//		y : 0
//	});
//
//	request = window.requestAnimFrame(dataupdateloop);
//};

function start() {
	mapFilterRender.renderFilter();
	histFilterRender.renderFilter();

	// histFilterRender.readPixels();

	allDataFilter.mapFilter = mapFilterRender.filterTexture;
	allDataFilter.histFilter = histFilterRender.filterTexture;

	allDataFilter.render();
	manager.filterTexture = allDataFilter.filterTexture;

	histDim.render();

	dimMap.render(manager.num_rec);

	read();
	/*
	 * if (!request) { animloop(); //dataupdateloop(); }
	 */
}



/**
 * MAIN RENDERING LOOP
 */
function render() {
	// mapFilterRender.renderFilter();
	// histFilterRender.renderFilter();

	// histFilterRender.readPixels();

	// allDataFilter.mapFilter = mapFilterRender.filterTexture;
	// allDataFilter.histFilter = histFilterRender.filterTexture;

	// allDataFilter.render();
	// manager.filterTexture = allDataFilter.filterTexture;

	// allDataFilter.readPixels();
	// manager.histTecture = util.histTexture;

	// util.filterData();
	// manger.filterIndex() =

	// histDim.render();

	// dimMap.render(manager.num_rec);
	// manager.render();
	// read();
	// gl.flush();
	// console.timeEnd(i + " rendering_all");
}

function mapFilter() {
	mapFilterRender.renderFilter();
	allDataFilter.mapFilter = mapFilterRender.filterTexture;
	updateFilters();
}
function histFilter() {
	histFilterRender.renderFilter();
	allDataFilter.histFilter = histFilterRender.filterTexture;
	updateFilters();
}


function updateFilters() {
	
	

	allDataFilter.render();
	manager.filterTexture = allDataFilter.filterTexture;
	dimMap.render(manager.num_rec);	
	histDim.render();
	read();
	


	

}

function read() {

	// readout = dimSpeed.readPixels();

	readout = histDim.readPixels();
	if (typeof readout != 'undefined') {
		for ( var i in charts) {
			charts[i].update(readout[i]);
		}

	}

	// $("#data").text("in:"+readout[0] + "out: "+ readout[1]);

	// dimTime.readPixels();
}

// util.createFilteringData(generatePolygon(2,3));
// util.renderFilter();
// util.addDataToFilter(generatePolygon(2,3));
// util.renderFilter();

// dimSpeed.readFloatPixels();
// dimTime.readFloatPixels();



function getTopLeftTC() {

	s = Math.pow(2, map.getZoom());
	tlpixel = map.getViewPortPxFromLonLat(tlwgs);
	res = {
		x : -tlpixel.x / s,
		y : -tlpixel.y / s
	}
	return res;
}

/**
 * Transfares the coordinates to zoom level 0 in pixel coordiantes
 */
function toLevel0(pt, tl, zoom) {
	ts = 256;
	scale = Math.pow(2, zoom);
	pt.x = pt.x / scale + tl.x;
	pt.y = pt.y / scale + tl.y;
	return pt;
}
function transformProj(p) {

	var v = map.getViewPortPxFromLonLat(p);
	// var v = map.getViewPortPxFromLonLat( new OpenLayers.LonLat(90,0));

	var v0 = toLevel0(v, tl, map.getZoom());
	return v0;
}

function transform(x, y) {
	var tl = getTopLeftTC();
	var p = new OpenLayers.LonLat(y, x);
	p.transform(wgs, map.projection);
	var v = map.getViewPortPxFromLonLat(p);
	// var v = map.getViewPortPxFromLonLat( new OpenLayers.LonLat(90,0));

	var v0 = toLevel0(v, tl, map.getZoom());
	return v0;
}