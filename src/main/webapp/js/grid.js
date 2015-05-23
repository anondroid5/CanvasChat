function GridManager(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

GridManager.prototype = {
	/**
	 * コンストラクタ
	 */
	initialize: function(){
		this.canvas = new Canvas('grid', -1);
		storage = new Storage();
		this.boldInterval = storage.get('grid.bold.Interval');///<太線間隔
		this.narrowInterval = storage.get('grid.narrow.Interval');///<細線間隔
		//デフォ値設定
		if(this.boldInterval === undefined){
			this.boldInterval = 30;
			new storage.set('grid.bold.interval', this.boldInterval);
		}
		if(this.narrowInterval === undefined){
			this.narrowInterval = 10;
			storage.set('grid.narrow.Interval', this.narrowInterval);
		}
		//チェックボックスイベント設定
		$('#enableGrid').change(function(){
			check = $(this).is(':checked');
			if(!check){
				//チェック外れた
				$('#' + new GridManager().canvas.getId()).css('display', 'none');
				new Storage().set('grid.enable', 'false');
			}else{
				//チェックされた
				$('#' + new GridManager().canvas.getId()).css('display', 'block');
				new Storage().set('grid.enable', 'true');
			}
		});
		//有効設定
		enableGrid = storage.get('grid.enable');
		if(enableGrid === 'true'){
			$('#enableGrid').attr('checked', true);
			$('#' + this.canvas.getId()).css('display', 'block');

		}else{
			$('#enableGrid').attr('checked', false);
			$('#' + this.canvas.getId()).css('display', 'none');
		}
		this.updateGrid();

	},
	/**
	 * グリッド描写
	 */
	updateGrid: function(){
		for(x = 0; x < this.canvas.getWidth(); x+= parseInt(this.narrowInterval)){
			this.canvas.draw({
				w: 1,
				c: 'rgba(255, 113, 180, 0.5)',
				x: x,
				y: 0,
				tx: x,
				ty: this.canvas.getHeight(),
				cap: 'butt'
				
			});
		}
		for(x = 0; x < this.canvas.getWidth(); x+= parseInt(this.boldInterval)){
			this.canvas.draw({
				w: 3,
				c: 'rgba(255, 113, 180, 0.5)',
				x: x,
				y: 0,
				tx: x,
				ty: this.canvas.getHeight(),
				cap: 'butt'
			});
		}
		for(y = 0; y < this.canvas.getHeight(); y+= parseInt(this.narrowInterval)){
			this.canvas.draw({
				w: 1,
				c: 'rgba(255, 113, 180, 0.5)',
				x: 0,
				y: y,
				tx: this.canvas.getWidth(),
				ty: y,
				cap: 'butt'
			});
		}
		for(y = 0; y < this.canvas.getHeight(); y+= parseInt(this.boldInterval)){
			this.canvas.draw({
				w: 3,
				c: 'rgba(255, 113, 180, 0.5)',
				x: 0,
				y: y,
				tx: this.canvas.getWidth(),
				ty: y,
				cap: 'butt'
			});
		}
	}

}