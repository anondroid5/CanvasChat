$(function(){
	$('#topLayer').after('<span id="zoomInfo"></span>');
	$('#zoomInfo').css({
		'font-size':'12px',
		'color':'red',
		'font-family':'Times New Roman',
		'user-select':'none',
		'-webkit-user-select':'none',
		'-moz-user-select':'none',
		'-ms-user-select':'none',
		'position':'relative'
	});
});