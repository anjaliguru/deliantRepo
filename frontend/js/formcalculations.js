/*
This source is shared under the terms of LGPL 3
www.gnu.org/licenses/lgpl.html

You are free to use the code in Commercial or non-commercial projects
 */

var services_type = new Array();
// services_type["None"] = undefined;
services_type["HouseShifting"] = ["1TON","1.5TON","2TON","3TON"];
services_type["Pay-per-ride"] = ["1TON","1.5TON","2TON","3TON"];
services_type["Outstation"] = ["1TON","1.5TON","2TON","3TON"];
services_type["Fabrication"] = ["18Gauge","22Gauge"];

var goods_rates = new Array();
goods_rates["None"] = 0;
goods_rates["HL - 1 TON"] = 151;
goods_rates["HL - 1.5 TON"] = 201;
goods_rates["HL - 2 TON"] = 251;
goods_rates["PPRCategory1"] = 151;
goods_rates["PPRCategory2"] = 201;
goods_rates["PPRCategory3"] = 251;
goods_rates["OSCategory1"] = 200;
goods_rates["OSCategory2"] = 200;
goods_rates["OSCategory3"] = 200;
goods_rates["FBCategory1"] = 200;
goods_rates["FBCategory2"] = 200;
goods_rates["FBCategory3"] = 200;

var baseFares = new Array();

//base fare for Outstation up to 5KM
var fabricationRates = new Array();
fabricationRates["18Gauge"]=' 251/Sq Feet';
fabricationRates["22Gauge"]=' 235/Sq Feet';

// base fare for Pay-per-Ride
var pprBaseFares1 = new Array();
pprBaseFares1["1TON"]=151;
pprBaseFares1["1.5TON"]=151;
pprBaseFares1["2TON"]=351;
pprBaseFares1["3TON"]=351;

//base fare for Pay-per-Ride 2nd slab
var pprBaseFares2 = new Array();
pprBaseFares2["1TON"]=251;
pprBaseFares2["1.5TON"]=251;

//per KM rates Pay-per-Ride post slab
var pprKMRates = new Array();
pprKMRates["1TON"]=10;
pprKMRates["1.5TON"]=15;
pprKMRates["2TON"]=24;
pprKMRates["3TON"]=24;


//base fare for Shifting up to 5KM
var hsBaseFares = new Array();
hsBaseFares["1 TON"]=151;
hsBaseFares["1.5 TON"]=151;
hsBaseFares["2 TON"]=351;

//base fare for Outstation up to 10KM
var osBaseFares = new Array();
osBaseFares["1TON"]=1300;
osBaseFares["1.5TON"]=1400;
osBaseFares["2TON"]=1600;
osBaseFares["3TON"]=1600;

//per KM rates of out station up to 150km
var osKMRates1 = new Array();
osKMRates1["1TON"]=10;
osKMRates1["1.5TON"]=15;
osKMRates1["2TON"]=18;
osKMRates1["3TON"]=18;


//per KM rates of out station post 150km
var osKMRates2 = new Array();
osKMRates2["1TON"]=20;
osKMRates2["1.5TON"]=25;
osKMRates2["2TON"]=30;
osKMRates2["3TON"]=30;

/*baseFares["Pay-per-ride"]=pprBaseFares;
baseFares["HouseShifting"]=hsBaseFares;
baseFares["Outstation"]=osBaseFares;
baseFares["Fabrication"]=fabBaseFares;*/

var hsKMWiseRates = new Array();

var perKmRate = new Array();
perKmRate["1TON"] =10;

var helperChargesOneSide = new Array();
//services_type["None"] = undefined;
helperChargesOneSide["HouseShifting"] = 200;
helperChargesOneSide["Pay-per-ride"] = 150;
helperChargesOneSide["Outstation"] = 300;

var helperChargesTwoSide = new Array();
//services_type["None"] = undefined;
helperChargesTwoSide["HouseShifting"] = 300;
helperChargesTwoSide["Pay-per-ride"] = 250;
helperChargesTwoSide["Outstation"] = 450;


/*var houseshifting_type = ["Category1","Category2","Category3"];
var payperride_type = ["General","Fragile","Fine","Hazardous"];
var outstation_type = ["Category1","Category2","Category3"];
var fabrication_type = ["Category1","Category2","Category3"];*/

function getServicesType() {
	var servicesType = 0;
	var theForm = document.forms["calculationform"];
	var selectedServicesType = theForm.elements["services_type"];

	servicesType = services_type[selectedServicesType.value];

	return servicesType;
}

function getGoodsType() {
	var goodsType = 0;
	var theForm = document.forms["calculationform"];
	var selectedGoodsType = theForm.elements["goods_type"];

	goodsType = goods_rates[selectedGoodsType.value];

	return goodsType;
}

function getHelper(serviceValue,subCategory,loadingRequired,unLoadingRequired,helperCount) {
	var helperprice = 0;
		if(loadingRequired&&unLoadingRequired){
			helperprice = helperCount*helperChargesTwoSide[serviceValue];
		}else{
			helperprice = helperCount*helperChargesOneSide[serviceValue];
		}
	return helperprice;
}


function calculateForPPR(type,km){
	if(type=='1TON'||type=='1.5TON'){
	if(km<=5){
		return pprBaseFares1[type];
	}else if(km<=8){
		return pprBaseFares2[type];
	}else{
		return perKM =  Math.round(pprBaseFares2[type] + pprKMRates[type]*(km-8));
	}
}else{
	if(km<=10){
		return pprBaseFares1[type];
	}else{
		return perKM =  Math.round(pprBaseFares1[type] + pprKMRates[type]*(km-10));
	}
}
}

function calculateForOS(type,km){
	if(km<=10){
		return osBaseFares[type];
	}
	else if(km<=150){

		return Math.round(osBaseFares[type] + osKMRates1[type]*(km-10));
	}
	else{
		return Math.round(osKMRates2[type]*km);
		}
}

function calculateTotal() {
	// Here we get the total price by calling our function
	// Each function returns a number so by calling them we add the values they
	// return together
	
	
	resetPrice();
	
	var finalprice = 0;
	var theForm = document.forms["calculationform"];
	var selectedServicesType = theForm.elements["services_type"];
	var serviceValue =selectedServicesType.value;
	var subCategory = theForm.elements["goods_type"].value;
		var goodsprice = getGoodsType();
		if (subCategory !=undefined && subCategory!=''&&subCategory!='None') {
			// if service is fabrication, just return the amount of goods type
			if(serviceValue=='Fabrication'){
				finalprice = fabricationRates[subCategory];
				// display the result
				setPrice(finalprice);
			}
			// If someone entered 0 in distance
			else 
				{
				var perKmprice=0;
				var distance ;
			    source = document.getElementById("txtSource").value;
			    destination = document.getElementById("txtDestination").value;
			    if(source==undefined||source=='undefined'||source==''||source.trim().length<1)
		    	{
			    	// add empty error flag
			    	 document.getElementById("txtSource").setCustomValidity("Please enter a location");
		    	return;
		    	}
		    else{
		    	// remove error flag
		    	document.getElementById("txtSource").setCustomValidity("");
		    }
		     if(destination==undefined||destination=='undefined'||destination==''||destination.length<1){
		    	// add empty error flag
		    	 document.getElementById("txtDestination").setCustomValidity("Please enter a location");
			    	return;
		    }
		     else{
		    	// remove empty error flag
		    	 document.getElementById("txtDestination").setCustomValidity("");
			    }
		     //if terms and conditions not accepted
		     
		     if(!$('#field_terms').prop('checked')){
		    	 document.getElementById("field_terms").setCustomValidity("Please accept the Terms and Conditions");
		    	 return;
		     }else{
		    	 document.getElementById("field_terms").setCustomValidity("");
		     }
		     
		    // getLocation();
			    // *********DISTANCE **********************//
			    var service = new google.maps.DistanceMatrixService();

			    service.getDistanceMatrix({
			        origins: [source],
			        destinations: [destination],
			        travelMode: google.maps.TravelMode.DRIVING,
			        unitSystem: google.maps.UnitSystem.METRIC,
			        avoidHighways: false,
			        avoidTolls: false
			    }, function (response, status) {

			    	window.res = response;
			        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS" && response.rows[0].elements[0].status != "NOT_FOUND") {
			            var distanceObj =response.rows[0].elements[0].distance;
			            if(distanceObj==undefined||distanceObj=='undefined'){
			            	alert("Invalid source/destination");
			            	return;
			            }
			        	distance = distanceObj.value;
			            distance = (Math.round(distance/100))/10;
			            $("#txtDistance").val(distance);
			            if(distance==0){
							var theForm = document.forms["calculationform"];
						// alert("Disance must be greter than 0");
							var divobj = document.getElementById('distancediv');
							divobj.style.display = 'block';
							alert("Source and destination are same or distance between them is too less.");
							// display the result
							setPrice(finalprice);
						}
						else{
							var divobj = document.getElementById('distancediv');
							divobj.style.display = 'block';
							 var helperCharge = 0;
							 if($('#toggle-trigger').prop('checked')){
								 var loadingRequired = $('#loading').prop('checked');
								 var unLoadingRequired = $('#unloading').prop('checked');
								 var helperCount =  parseInt($("#helper")[0].innerText);
								 if((loadingRequired||unLoadingRequired)&&helperCount>0){
									 helperCharge = getHelper(serviceValue,subCategory,loadingRequired,unLoadingRequired,helperCount);
								 }
							 }
							if(serviceValue=="Pay-per-ride"){
								finalprice = calculateForPPR(subCategory, distance)+ helperCharge;
						}else if(serviceValue=="Outstation"){
							finalprice = calculateForOS(subCategory, distance)+ helperCharge;
					}
							
							else{
							
							perKmprice = (distance-5)*25;
							finalprice = goodsprice	+ helperCharge+perKmprice;
						}
							// display the result
							setPrice(finalprice);
						}
			        } else {
			        		var divobj = document.getElementById('distancediv');
			        		divobj.style.display = 'none';
			        		if(res.originAddresses[0].length==0){
			        	 	source = document.getElementById("txtSource");
						    source.setCustomValidity("Invalid field.");
			        }
			        	 	if(response.destinationAddresses[0].length==0){
						    destination = document.getElementById("txtDestination");
						    destination.setCustomValidity("Invalid field.");
			        }
			            return false;
			        }
			    });
		}
	
		}
	

}

function showSubMenu() {
	var theForm = document.forms["calculationform"];
	var selectedServicesType = theForm.elements["services_type"];
	var servicesType = services_type[selectedServicesType.value];
	
	// set price to blank
	setPrice(0);
	if(servicesType==undefined){

		var ddl = document.getElementById("goods_type");
		// remove all options from goods type dropdown
		ddl.innerHTML = "";
		// add one option only
		var option = document.createElement("OPTION");
		option.innerHTML = "-- Select Service First --";
		option.value = "None";
		ddl.options.add(option); 
		// hide distance text box
		$('#distance').hide();
		// hide services section
		$('#services').hide();
		// hide the t&c checkbox
		$('#tnc').hide();
		// hide and reset helper related inputs
	    $('#toggle-trigger').bootstrapToggle('off');
		$('#loading').prop('checked',false);
    	$('#unloading').prop('checked',false);
    	$("#helper")[0].innerText=0;
    	$('#helperCount').hide();
	    $('#helperDetails').hide();
		return;
	}
	var ddl = document.getElementById("goods_type");
	ddl.innerHTML = "";
	var option = document.createElement("OPTION");
	option.innerHTML = "-- Select Category --";
	option.value = "";
	ddl.options.add(option); 
	servicesType.forEach(addDropdown);
	var divobj = document.getElementById('subtype');
	divobj.style.display = 'block';
if(selectedServicesType.value=='Fabrication'){
	// hide unrelated inputs
	$('#distance').hide();
	$('#services').hide();
	$('#tnc').hide();
    $('#toggle-trigger').bootstrapToggle('off');
	$('#loading').prop('checked',false);
	$('#unloading').prop('checked',false);
	$("#helper")[0].innerText=0;
	$('#helperCount').hide();
    $('#helperDetails').hide();
}else{
	// remove fare calculation function on change event to goods type drop down
// divobj.addEventListener("change", calculateTotal);
	var divobjdistance = document.getElementById('distance');
	// add fare calculation function on input event to distance input box
// divobjdistance.addEventListener("input", calculateTotal);
	divobjdistance.style.display = 'block';
	var divobjservices = document.getElementById('services');
	divobjservices.style.display = 'block';
	$('#tnc').show();
}
}
function addDropdown(value) {
	var ddl = document.getElementById("goods_type");
	var option = document.createElement("OPTION");
	option.innerHTML = 'HL - '+value;
	option.value = value;
	ddl.options.add(option); 
	}
function hideTotal() {
	var divobj = document.getElementById('totalPrice');
	divobj.style.display = 'block';
	var divobjmodalOpenButton = document.getElementById('modalOpenButton');
	divobjmodalOpenButton.style.display = 'block';
}
function resetPrice() {
	var divobj = document.getElementById('totalPrice');
	divobj.style.display = 'block';
	divobj.innerHTML = "Calculate fare ?";
	var divobjmodalOpenButton = document.getElementById('modalOpenButton');
	divobjmodalOpenButton.style.display = 'none';
	
}
function setPrice(value){
	var divobj = document.getElementById('totalPrice');
	divobj.style.display = 'block';
	var theForm = document.forms["calculationform"];
	var selectedServicesType = theForm.elements["services_type"];
	if(value!=undefined&&value!=0){
	    $("#estimated_price").val(value);
	divobj.innerHTML = "Estimated Price =  ₹" + value;
	if(selectedServicesType.value=='Fabrication'){
	var divobjmodalOpenButton = document.getElementById('modalOpenButton');
	divobjmodalOpenButton.style.display = 'none';
	}else{
		var divobjmodalOpenButton = document.getElementById('modalOpenButton');
		divobjmodalOpenButton.style.display = 'block';
	}
}
	else{
	divobj.innerHTML = "Calculate fare ?";	
	var divobjmodalOpenButton = document.getElementById('modalOpenButton');
	divobjmodalOpenButton.style.display = 'none';
}
	
}
// to automatically populate data in modal
$(document).on("click", ".open-AddBookDialog", function () {
	var theForm = document.forms["calculationform"];
	document.getElementById('booking_success').style.display='none';
	document.getElementById('booking_error').style.display='none';
	var theBookingForm = document.forms["booking_form"];
	theBookingForm.style.display='block';
	// setting service type
	var selectedServicesType = theForm.elements["services_type"];
    var myserviceId = selectedServicesType.value;
    $(".modal-body #service").val( myserviceId );
    
    // setting goods type
    var selectedGoodType = theForm.elements["goods_type"];
    var myGoodTypeId = selectedGoodType.value;
    $(".modal-body #goodsType").val( myGoodTypeId );
    
    // setting source address
    var selectedSource = theForm.elements["txtSource"];
    var mySource = selectedSource.value;
    $(".modal-body #pickup").val( mySource );
    
    // setting destination address
    var selectedGoodType = theForm.elements["txtDestination"];
    var myGoodTypeId = selectedGoodType.value;
    $(".modal-body #drop").val( myGoodTypeId );
    
    // setting estimated distance
    var selectedEstimatedDistance = theForm.elements["txtDistance"];
    var myEstimatedDistance = selectedEstimatedDistance.value;
    $(".modal-body #estimatedDistance").val(myEstimatedDistance);
    
    
 // setting helper quantity
    
    var helperDetails= " No";
    
    if($('#toggle-trigger').prop('checked')){
    helperDetails= " Yes<br>";
    var helperSelected = false;
    if($('#loading').prop('checked')){
    	helperSelected=true;
    	helperDetails+="  <b>Loading :</b> Yes<br>";
    }
    else{
    	helperDetails+="  <b>Loading :</b> No<br>";
    }
    if($('#unloading').prop('checked')){
    	helperSelected=true;
    	helperDetails+="  <b>Un-loading :</b> Yes<br>";
    }else{    	
    	helperDetails+="  <b>Un-loading :</b> No<br>";
}
    if(!helperSelected){
    	helperDetails+="  <b style='color: red;'>Neither loading nor unloading selected by user. Kindly ask on call.</b>";
    }else{
    	helperDetails+="  <b>No. of helper :</b> " +parseInt($("#helper")[0].innerText);
    }
    
    }
    // add value in modal field
	 $(".modal-body #helper").val(helperDetails);
	
});

function addHelper(){

	var $this = $(this);
	var input = $("#helper")[0].innerText;
	var value = parseInt(input);
	if (value <=3) {
	value = value + 1;
	$("#helper")[0].innerText = value;
	calculateTotal();
	} else {
		value =4;
		$("#helper")[0].innerText = value;
	}
}

function removeHelper(){

	var $this = $(this);
	var input = $("#helper")[0].innerText;
	var value = parseInt(input);
		if (value >= 1) {
			value = value - 1;
			$("#helper")[0].innerText = value;
			calculateTotal();
		} else {
			value = 0;
			$("#helper")[0].innerText = value;
		}
}