	
function init() { 
		/*Initialize the map*/
		initMap();
		
		/*Load the data*/
		var data = new DataLoader();
		data.loadPosData("data/birmingham_5a.json");


	}

function visualize(data){	
	
		/**
		 * initialize WGL with link to data, the relative path to the shader folder, and id of the map div
		 */
		WGL = new WGL(data.num,'../../', 'map');		
		
		/**
		 * map is global variable from Open Layers, we set our onMove 
		 * function to be called any time the map moves 
		 */		 
		map.events.register("move", map, onMove);							
			
		/**
		 * Adding heatmap, point map and polybrush interactions
		 */
		WGL.addHeatMapDimension(data.pts, 'heatmap');

		var radius = 10.;		
		
		/*define radius fucntion*/
		WGL.getDimensions()['heatmap'].radiusFunction = function(z){			
			var res = Math.pow(radius / 5,(z-8));
			//console.log(res);
			return  res ;
			};
		
		$("#slider_radius").on("input", function(){
				console.time("radius");
				radius = this.value;			
				WGL.render();
				console.timeEnd("radius");
			}
		);

		/*define maximums*/
		
		var maximum = 100;
		WGL.getDimensions()['heatmap'].maxFunction = function(m){
						return m/maximum;
					};
				
		$("#slider_max").on("input", function(){
			maximum = this.value;
			WGL.render();
			}
		);
		

		/*minimum*/
		var minimum = 0;
		WGL.getDimensions()['heatmap'].minFunction = function(m){
						return minimum;
					};
				

		$("#slider_min").on("input", function(){
				minimum = this.value;
				WGL.render();
			}
		);
		
		/*gradient*/
		var gradient = 1;
		
		WGL.getDimensions()['heatmap'].gradFunction = function(m){
						return gradient/8;
					};
		$("#slider_gradient").on("input", function(){
				gradient = this.value;				
				WGL.render();
			}
		);
			
		var i = 0;
		var draw = function(){
			if (i<10){
				radius = i
				WGL.render();
				requestAnimationFrame(draw);
				i++;
			} 
		}
		$("#test").on("click", function(){
			i= 0;
			draw();		
		});
			
		/**
		 * Initilizing all the filters
		 */
		WGL.initFilters();
		
		/** Drawing the map fist time */
		WGL.mcontroller.zoommove(map.getZoom(), getTopLeftTC());
		//WGL.render();	
	}
			
	

	

/**
 * Function to calculate top left corner of the map in pixels for zoom 0
 * @returns {___anonymous_res}
 */	
function getTopLeftTC() {

	
	var tlwgs = (new OpenLayers.LonLat(-180, 90)).transform(
			new OpenLayers.Projection("EPSG:4326"),
		 	new OpenLayers.Projection("EPSG:900913"));
	
	var s = Math.pow(2, map.getZoom());
	tlpixel = map.getViewPortPxFromLonLat(tlwgs);
	res = {
			x : -tlpixel.x / s,
			y : -tlpixel.y / s
	}
	//console.log(res);
	return res;
}
	
/**
 * Function to for moving the map event.
 */
function onMove() {			
		WGL.mcontroller.zoommove(map.getZoom(), getTopLeftTC(), WGL.filterByExt);
}
	
	
	