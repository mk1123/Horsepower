$( document ).ready(function() {

	// URL of Instructors instance of PI Web API and the WebId of the parent element we have created child elements on. 
	var BaseWebAPIUrl = "https://ucd-piwebapi.ou.ad3.ucdavis.edu/piwebapi/";
	//var AFParentElementWebId = "E0ZzLNqY1YxEGomsVomMC5JQvjCMdCDq5hGCpRhm2gzeOAQVNVR0FSTUFONzkxMFxSQVNQQkVSUllXQVBJXFRFU1QgSEVBVCBNQVAgRUxFTUVOVA";
	var attributeWebUd = "F1RDbgZy4oKQ9kiBiZJTW7eugwJztPDnRh5UOIr8WoWgnq3gVVRJTC1BRlxDRUZT";
	function PopulateElements(buildingName, attribute)
	{		
		// Enter Exercise 3A step 3 code below this line.
		// Construct the URL for the request to retrieve the list of child elements on the parent element. 
		var convBuildName = encodeURI(buildingName.replace(/\s+/g, ' ').trim());
		var convAttribute = encodeURI(attribute);
		var ChildElementsUrl = BaseWebAPIUrl + "attributes/search?databaseWebId=" + attributeWebUd + "&Query=Element:{Name:=" + convBuildName + "}%20Name:=" + convAttribute;
		;
		console.log(ChildElementsUrl);
      $.ajaxSetup({
  headers: {
    'Authorization': "Basic " + btoa("ou\\piapihack2018" + ":" + "Go $ave energy, 2018!")
  }
});

		// Make a GET request at the specified URL, receiving the response in JSON.
		$.getJSON(ChildElementsUrl, null, function(response){
			console.log("Hello world")
			console.log(response);
			af_elements = []
			$.each( response.Items, function( index, value ) {
				
				// Create our element object for data storage by retrieving data from the response body.
				var af_element = { Name: value.Name, WebId: value.WebId }

				// Add the element to the list of maintained elements for our display.
				af_elements.push(af_element);
				
				// Call the PopulateAttributeValues method to retrieve the element's latest attribute values.
				//  PopulateAttributeValues(af_element);
			});	
		});
	}	

	// Method to populate the attributes values for a elements and updating application storage
	// function PopulateAttributeValues(af_element) {		

	// 	// Enter Exercise 3A step 4 code below this line. 
	// 	// Construct the URL for the request to retrieve the latest attribute values of an element. 
	// 	var ValueUrl = BaseWebAPIUrl + "/streamsets/" + af_element.WebId + "/value";
		
	// 	// Make a GET request at the specified URL, receiving the response in JSON.
	// 	$.getJSON(ValueUrl, null, function(response){
	// 		af_element.Value = response.Items[0].Value.Value;
	// 		af_element.Xcoord = response.Items[1].Value.Value;
	// 		af_element.Ycoord = response.Items[2].Value.Value;				
	// 	});
	// }	
	
	// Method to continously check for value changes every 2.5 seconds, saves scroll position for different size screens. 
	// function Poll()
	// {			 
	// 	setInterval(function(){
	// 		var currentScroll = $(window).scrollTop();
	// 		PopulateElements();
	// 		//PopulateDisplay();
	// 		$( 'html, body' ).animate( { scrollTop: currentScroll }, 0 );
	// 	}, 2500);
	// }
	
	// Exercise 3A step 5 code below this line. 
	//Poll();
	PopulateElements('"academic surge building"', '"average demand"');
});