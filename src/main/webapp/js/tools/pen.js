function Pen(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

Pen.prototype = {
	initialize: function(){
		//アイテム登録
		$('#toolIcons').append('<td id="toolPen"><img id="toolPenIcon" alt="penIcon" src="icon/hudeOFF.png" width="30" height="30"></td>');
		$('#toolsMenu').append('<li><a href="#" id="menuToolPen">ペン</a></li>');

		$('#toolPenIcon').click(function(){
			new Pen().onActive();
		})

		$('#menuToolPen').click(function(){
			new Pen().onActive();
		})
	},
	/**
	 * アクティブ
	 */
	onActive:function (){
		$('#toolSelect .select').attr('src', $('#toolSelect .select').attr('src').replace('ON', 'OFF')).attr('class', '');
		$('#toolPenIcon').attr('class', 'select').attr('src', 'icon/hudeON.png');
		new Tool().setActive(this);
	},
	setActive: function(tool){
		$('#toolPenIcon').attr('class', 'select').attr('src', 'icon/hudeON.png');
		tool.setActive(this);
	},
	/**
	 * マウスボタンを押したイベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseDown: function(x, y, size){
		this.sx = x;
		this.sy = y;
		this.mousedown = true;
	},
	/**
	 * マウス移動イベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseMove: function(x, y, size){
		if(this.mousedown){
				//通常
				var drawData = {
					l: new LayerManager().getActiveLayer().getId(),
					w: (new PenWidthManager().getWidth() * size),
					c: new ColorPicker().getColorRGBA(),
					x: this.sx,
					y: this.sy,
					tx: x,
					ty: y,
					user:new Storage().get('loginName')
				};
				
		}
		new Socket().draw(drawData);
		this.sx = x;
		this.sy = y;
	},
	/**
	 * マウスボタンを離したイベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseRelease: function(x, y, size){
		if(this.mousedown){
			var drawData = {
				l: new LayerManager().getActiveLayer().getId(),
				w: new PenWidthManager().getWidth() * size,
				c: new ColorPicker().getColorRGBA(),
				x: this.sx,
				y: this.sy,
				tx: x,
				ty: y,
				user:new Storage().get('loginName')
			};
			new Socket().draw(drawData);
			this.mousedown = false;
		}
	},
	/**
	 * マウスがキャンバスから離れた時のイベント
	 */
	onMouseOut: function(){
		if(this.mousedown){
			this.mousedown = false;
		}
	}
}