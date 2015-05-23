function saveCHAT(){
	var href = "data:application/octet-stream," + encodeURIComponent($('#messages').val());//メッセージを取得
	window.open(href, "save");
}