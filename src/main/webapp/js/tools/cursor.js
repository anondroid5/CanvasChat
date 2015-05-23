function Cursor(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

Cursor.prototype = {
	initialize: function(){
		//アイテム登録
		this.canvas = new Canvas('Cursor', 1);
	},
	/**
	 * アクティブ
	 */
	onActive:function (){
	},
	/**
	 * マウスボタンを押したイベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseDown: function(x, y, size){
	},
	/**
	 * マウス移動イベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseMove: function(x, y, size){
		this.canvas.bomb();
		this.canvas.draw({
			w: (new PenWidthManager().getWidth() * size),
			c: new ColorPicker().getColorRGBA(),
			x: x,
			y: y,
			tx: x + 1,
			ty: y + 1,
			user:new Storage().get('loginName')
		});
	},
	/**
	 * マウスボタンを離したイベント
	 * @param x    X座標
	 * @param y    Y座標
	 * @param size 筆圧率
	 */
	onMouseRelease: function(x, y, size){

	},
	/**
	 * マウスがキャンバスから離れた時のイベント
	 */
	onMouseOut: function(){
		this.canvas.bomb();
	}
};