function saveIMG(){
	//レイヤーを取得
	var can0 = $('#NormalLayer_0__canvas0').get(0);//キャンバス0
	var can1 = $('#NormalLayer_1__canvas1').get(0);//キャンバス1
	var can2 = $('#NormalLayer_2__canvas2').get(0);//キャンバス2
	
	//新規に一時的に保存用のレイヤーを作成する(3枚のレイヤーを統合するため)
	$('#NormalLayer_2__canvas2').append('<canvas></canvas>');
	$('#NormalLayer_2__canvas2 canvas').addClass('layer');
	$('#NormalLayer_2__canvas2 canvas').attr('id','saveLayer');
	$('#saveLayer').attr('width',can0.width);
	$('#saveLayer').attr('height',can0.height);
	
	//保存用のレイヤーの取得
	var can = $('#saveLayer').get(0);//セーブ用レイヤー
	var cnx = can.getContext("2d");
	cnx.drawImage(can0,0,0,can0.width,can0.height);//レイヤー1読み込み
	cnx.drawImage(can1,0,0,can0.width,can0.height);//レイヤー2読み込み
	cnx.drawImage(can2,0,0,can0.width,can0.height);//レイヤー3読み込み
	
	var data = can.toDataURL("image/png");
	var data = data.replace("image/png", "image/octet-stream");
	window.open(data, "save");
	
	//保存用レイヤーの削除する
	$('#saveLayer').remove();
	
	//確認用
	//document.getElementById("gallery").src = data;
}