$(document).ready(function() {

	// Write all page specific javascripts here.
	console.log("hello");

	var openPopup = false;

	$('html').click(function(pageEvent){
		$('#poppup_div').css({left:leftVal,top:topVal}).hide();
		$('.solutionsRow').removeClass('greyOut');
	});


	$('.solutionsRow').click(function(pageEvent){
		$('.solutionsRow').removeClass('greyOut');
		$(this).addClass('greyOut')
		var height = $('#poppup_div').height();
		var width = $('#poppup_div').width();
		//calculating offset for displaying popup message
		leftVal=pageEvent.pageX+20+"px"; //-(width/2)
		topVal=pageEvent.pageY-20+"px"; //-(height/2)
		//show the popup message and hide with fading effect
		$('#poppup_div').css({left:leftVal,top:topVal}).show();
		pageEvent.stopPropagation();
	});

	
});