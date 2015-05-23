function PenWidthManager(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

PenWidthManager.prototype = {
	/**
	 * コンストラクタ
	 */
	initialize: function(){
		$('#penWidth').css({
			width: '80%',
			marginLeft: 'auto',
			marginRight: 'auto'
		}).slider({
			min: 1,
			max: 50,
			step: 1,
			value: 1,
			slide: function(event, ui){
				var width = ui.value;
				new PenWidthManager().itemList[new PenWidthManager().activeItem].updateWidth(width);
			}
		});
		$('#penWidth').slider({value: 1});
		//3つぶん作成
		this.itemList = new Array();
		for(i = 0; i < 3; i++){
			this.itemList[i] = new PenWidth(i);
		}
		//初期アクティブの設定
		active = new Storage().get('pen.width.active');
		if(active === undefined){
			this.activeItem = 0;
			this.setActive(0);
		}else{
			this.activeItem = parseInt(active);
			this.setActive(parseInt(active));
		}
	},
	/**
	 * ペン幅を取得
	 */
	getWidth: function(){
		return this.itemList[this.activeItem].getWidth();
	},
	/**
	 * サンプルを更新
	 */
	updatePenSample: function(){
		for(i = 0; i < this.itemList.length; i++){
			this.itemList[i].updateWidth(this.itemList[i].getWidth());
		}
	},
	/**
	 * アクティブペン幅を設定
	 * @param id アクティブにするID
	 */
	setActive: function(id){
		if(id < this.itemList.length){
			this.activeItem = id;
			new Storage().set('pen.width.active', id);
			this.itemList[this.activeItem].setActive();
			$('#penWidth').slider({value: this.itemList[this.activeItem].getWidth()});
		}
	}
};