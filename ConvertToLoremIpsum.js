/*
Kyle James Karwatski
2018-04-19
A basic attempt at converting a string to Lorem Ipsum text.
The functionality will return a string that is equal in length to a source parameter by referencing a seed library.
Designed for use with Azure Functions.
This code has not been optimized.
*/

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
	
    // A generated Lorem source
    var library='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec dui nunc mattis. Sagittis eu volutpat odio facilisis mauris sit amet massa. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh tortor id aliquet lectus proin nibh nisl. In ante metus dictum at tempor commodo ullamcorper. Massa tincidunt dui ut ornare lectus sit amet est placerat. Quis eleifend quam adipiscing vitae proin sagittis nisl. Massa tincidunt nunc pulvinar sapien et ligula. Amet risus nullam eget felis. Neque egestas congue quisque egestas diam in. Interdum consectetur libero id faucibus nisl tincidunt eget. Elementum nibh tellus molestie nunc. Sed euismod nisi porta lorem mollis aliquam ut porttitor leo. Amet facilisis magna etiam tempor. Semper risus in hendrerit gravida rutrum quisque. Porttitor leo a diam sollicitudin tempor id. Diam quam nulla porttitor massa id neque. Morbi non arcu risus quis varius. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Posuere urna nec tincidunt praesent semper feugiat nibh. Faucibus scelerisque eleifend donec pretium vulputate. Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Sed tempus urna et pharetra. Feugiat pretium nibh ipsum consequat. Facilisi morbi tempus iaculis urna id. Turpis in eu mi bibendum neque. Ac turpis egestas integer eget aliquet nibh praesent. Eget sit amet tellus cras adipiscing enim eu turpis. Ullamcorper eget nulla facilisi etiam dignissim. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Mattis pellentesque id nibh tortor id aliquet. Quam pellentesque nec nam aliquam sem et tortor consequat. Sit amet luctus venenatis lectus magna fringilla. Mauris vitae ultricies leo integer malesuada nunc vel. Vitae sapien pellentesque habitant morbi. Mi tempus imperdiet nulla malesuada pellentesque elit eget. Dui vivamus arcu felis bibendum ut tristique. Facilisi morbi tempus iaculis urna id volutpat lacus. Elementum pulvinar etiam non quam. Ultrices tincidunt arcu non sodales neque sodales. Iaculis nunc sed augue lacus. Diam ut venenatis tellus in metus vulputate eu scelerisque. Dignissim enim sit amet venenatis. Morbi quis commodo odio aenean sed adipiscing diam donec. Morbi quis commodo odio aenean sed. Consectetur a erat nam at. Sit amet est placerat in egestas erat. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Viverra orci sagittis eu volutpat odio facilisis. Aliquam nulla facilisi cras fermentum odio eu. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Eu turpis egestas pretium aenean pharetra magna ac. Vivamus at augue eget arcu. Vulputate odio ut enim blandit volutpat maecenas volutpat. Et malesuada fames ac turpis egestas sed tempus. Tempor orci eu lobortis elementum. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Consequat nisl vel pretium lectus quam id leo in. Venenatis cras sed felis eget velit aliquet. Ut enim blandit volutpat maecenas volutpat blandit. Turpis nunc eget lorem dolor sed viverra. Elit scelerisque mauris pellentesque pulvinar. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Dignissim convallis aenean et tortor at. Massa tempor nec feugiat nisl pretium fusce id velit. Etiam tempor orci eu lobortis elementum nibh tellus molestie. Convallis posuere morbi leo urna. Magna fermentum iaculis eu non. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Quisque id diam vel quam elementum. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Leo integer malesuada nunc vel risus commodo viverra. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Leo integer malesuada nunc vel risus commodo. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Ultrices gravida dictum fusce ut placerat orci nulla. Morbi tristique senectus et netus et malesuada.';
	
	// Desired length of result
	var data=null;
	if(req.query.data){
		// Value came from query parameters
		data=req.query.data;
	}else if(req.body.data){
		// Value came from body
		data=req.body.data;
	}
	
    if (data) {
		// Values to prepend and append
		var prepend="Lorem Ipsum ";
		var append=".";
		
		var generatedString='';
		var start=0;
		
		// Acquire the character length of the input
		var length=data.length;
		
		// Revised length to compensate for the prepending and appending of characters [ignore append because it is just punctuation]
		length=length-prepend.length-1;
		
		// The start position referencing the source; always be positive
		start=Math.abs(Math.floor(Math.random()*library.length)-length);
		
		// If length will exceed the length of the library, then extend the library through duplication
		if(start+length>library.length){
			var duplicate=(start+length)/library.length;
			for(var i=0;i<duplicate.toFixed(1);i++){
				library+=' '+library;
			}
		}
		
		// The result
		generatedString=prepend+library.substring(start, start+length).replace(/\s+$|,$|\?$|\!$|\.$/g, '')+append;
	
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: generatedString
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass the data on the query string or body"
        };
    }
    context.done();
};