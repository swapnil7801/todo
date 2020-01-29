$(document).ready(function(){
	var element = $('meta[name="active-menu"]').attr('content');
	$('#' + element).addClass('active');
});
console.log("client file loaded",)