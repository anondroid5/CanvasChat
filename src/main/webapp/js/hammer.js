// ダブルタップ(ダブルクリック)で二倍に拡大
$('#ExtraLayer_Cursor__canvasCursor').dblclick(function(e){
	console.log('aa');
	var scaleFactor = 1;
	scaleFactor = 3 - scaleFactor; // 2なら1、1なら2
	if(scaleFactor === 2){
		var topLeftX = e.gesture.center.pageX - $(this).offset().left -(canvas.width/4);
		var topLeftY = e.gesture.center.pageY - $(this).offset().top -(canvas.height/4);
		if(topLeftX < 0){
			topLeftX = 0;
		}else if(topLeftX > canvas.width/2){
			topLeftX = canvas.width/2;
		}
		if(topLeftY < 0){
			topLeftY = 0;
		}else if(topLeftY > canvas.height/2){
			topLeftY = canvas.height/2;
		}
		
		var transformStyle = 'scale(%{scale}) translate(%{tx}px, %{ty}px)';
		transformStyle = transformStyle.replace('%{scale}', scaleFactor)
		transformStyle = transformStyle.replace('%{tx}', -topLeftX);
		transformStyle = transformStyle.replace('%{ty}', -topLeftY);
		$(this).css('transform', transformStyle);
	}else{
		$(this).css('transform', '');
	}
});