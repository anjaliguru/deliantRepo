/**
 * 
 */


       var source, destination;
        var directionsDisplay;
        var indore = new google.maps.LatLng(22.7196, 75.8577);
       var defaultBounds = new google.maps.LatLngBounds(indore);
       var options = {
         bounds: defaultBounds,
         componentRestrictions: {country: "in"}
       };
        google.maps.event.addDomListener(window, 'click', function () {
            new google.maps.places.Autocomplete(document.getElementById('txtSource'),options);
            new google.maps.places.Autocomplete(document.getElementById('txtDestination'),options);
        });
        $(document).ready(function(){/*
            $("#txtSource").val("Indore| ");
            $("#txtDestination").val("Indore| ");*/
            //your-city-name will have city name and some space to separate it from actual user-input for example: “Bengaluru | ”
            });

        $("#txtSource").on('keydown',function(event){
        	onlyIndore(event);
        });
        $("#txtSource").on('input',function(event){
        	onlyIndore(event);
        });
        $("#txtSource").on('paste', function(event){
        	event.preventDefault();
        	return false;
        });
        $("#txtSource").on('cut', function(event){
        	event.preventDefault();
        	return false;
        });
        $("#txtDestination").on('keydown',function(event){
        	var servicename= $("#services_type").val();
        	if(servicename=='Pay-per-ride')
        	onlyIndore(event);
        });
        $("#txtDestination").on('input',function(event){
        	var servicename= $("#services_type").val();
        	if(servicename=='Pay-per-ride')
        	onlyIndore(event);
        });
        $("#txtDestination").on('paste', function(event){
        	var servicename= $("#services_type").val();
        	event.preventDefault();
        	if(servicename=='Pay-per-ride')
        	return false;
        });
        $("#txtDestination").on('cut', function(event){
        	var servicename= $("#services_type").val();
        	event.preventDefault();
        	if(servicename=='Pay-per-ride')
        	return false;
        });
        
        
        function onlyIndore(event) {
        	window.event = event;
        	//console.log('onlyIndore '+event.data.value);//locality is text-input box which I supplied while creating Autocomplete object
            var localeKeyword = "Indore| ";
            var localeKeywordLen = localeKeyword.length;
            var keyword = event.currentTarget.value;
            var keywordLen = keyword.length;

            if(keywordLen == localeKeywordLen) {
                var e = event || window.event;  
                var key = e.keyCode || e.which; 

                if(key == Number(46) || key == Number(8) || key == Number(37)){
                    e.preventDefault(); 
                    }//Here I am restricting user to delete city name (Restricting use of delete/backspace/left arrow) if length == city-name provided

                if(keyword != localeKeyword) {
                	event.currentTarget.value=localeKeyword;
                    }//If input-text does not contain city-name put it there
                }

            if(!(keyword.includes(localeKeyword))) {
            	event.currentTarget.value=localeKeyword;
                }//If keyword not includes city name put it there
            }