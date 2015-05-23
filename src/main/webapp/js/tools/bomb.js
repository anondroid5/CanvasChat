function initBomb(){
	//全削除ボタン
	$('#bombDialog').html('<strong>使用上の注意</strong><br>キャンバスのイラストを削除します。<br>削除すると復元出来ません。<br>削除しますか?').dialog({
		autoOpen: false,
		title: '警告',
		modal: true,
		width: 'auto',
		resizable: false,
		buttons: {
		    'はい': function(event) {
		        new Socket().bomb();
		        $(this).dialog('close');
		    },
		    'いいえ': function() {
		    	$(this).dialog('close');
		    }
		}
	});
	$('#bombButtonIcon').click(function(){
		$('#bombDialog').dialog('open');
	});
}