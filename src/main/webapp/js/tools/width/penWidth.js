function PenWidth(index){
	this.index = index;
	this.id = 'penWidthItem_' + index;
	this.canvasId = 'penWidthItemSample' + index;
	this.widthTextId = 'penWidthItemLabel' + index;
	//html生成
	$('#penWidthItems').append('<div class="penWidthItem" id="' + this.id + '">太さ<span id="' + this.widthTextId + '">1</span>px<br><canvas id="' + this.canvasId + '" width="60" height="60"></canvas></div>')
	$('#' + this.id).click(function(){
		id = $(this).attr('id').replace('penWidthItem_', '');
		new PenWidthManager().setActive(id);
	});

	width = new Storage().get('pen.' + this.id);
	if(width === undefined){
		this.updateWidth(1);
	}else{
		this.updateWidth(parseInt(width));
	}

}

PenWidth.prototype = {
	/**
	 * アップデート
	 * @param width 新しい幅
	 */
	updateWidth: function(width){
		$('#' + this.widthTextId).html(width);
		new Storage().set('pen.' + this.id, width);
		color = new ColorPicker().getColorRGBA();
		var canvas = $('#' + this.canvasId).get(0);
		if(canvas !== undefined && canvas.getContext !== undefined){
			var context = canvas.getContext('2d');
			//一旦消去
			var composition = context.globalCompositeOperation;
			context.globalCompositeOperation = "destination-out";
			context.strokeStyle = 'rgba(0, 0, 0, 1)';
			context.fillRect(0, 0, 60, 60);
			context.globalCompositeOperation = composition;

			//線の設定
			context.lineWidth = width;
			context.lineCap = 'round';
			context.strokeStyle = color;
			//線を引く
			context.beginPath();
			context.moveTo(30, 30);
			context.lineTo(31, 31);
			context.stroke();
		}else{
			alert('canvaserror');
		}
	},
	/**
	 * ペン幅を取得
	 * @return ペン幅
	 */
	getWidth: function(){
		return parseFloat($('#' + this.widthTextId).html());
	},
	/**
	 * 自身をアクティブにする
	 */
	setActive: function(){
		$('.penWidthItemSelect').attr('class', 'penWidthItem');
		$('#' + this.id).attr('class', 'penWidthItemSelect');
	}

}