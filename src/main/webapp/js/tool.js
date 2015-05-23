function Tool(){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this);
		self.instance = this;
	}
	return self.instance;
}

Tool.prototype = {
	/**
	 * コンストラクタ
	 */
	initialize: function(){
		Tool.items = {};
	},
	/**
	 * アクティブアイテムの設定
	 * @param アクティブにするツールアイテムの名前
	 */
	setActive: function(item){
		icon = 'icon/' + Tool.items[item].getIconName() + 'ON.png';
		itemId = $('#toolSelect .select').attr('id');
		$('#toolSelect .select').attr('src', $('#toolSelect .select').attr('src').replace('ON', 'OFF')).attr('class', '');
		$('#toolItem_' + item).attr('class', 'select').attr('src', icon);

		if(Tool.items[item].onActive !== undefined){
			Tool.items[item].onActive(itemId.replace('toolItem_', ''));
		}
		Tool.activeItem = Tool.items[item];
	},
	/**
	 * Wacomプラグインの確認
	 */
	checkWacomPlugin: function(){
		Tool.wacom = document.Wacom;

		if(Tool.wacom === undefined){
			Tool.wacom = document.embeds['Wacom'];
		}
		if(Tool.wacom !== undefined && Tool.wacom.pressure !== undefined){
			$('#enableWacomPlugin').html('有効').css({
				backgroundColor: '#00ff00',
				color: '#000000'
			});
			$('#enablePentab').attr('checked', 'chcked');
		}else{
			$('#enableWacomPlugin').html('無効').css({
				backgroundColor: '#ffff00',
				color: '#000000'
			});
			$('#enablePentab').attr('checked', false);
		}
	},
	/**
	 * ツールアイテムプラグインの登録
	 */
	addItem: function(name, item){
		Tool.items[name] = item;
	},
	/**
	 * ツールのセットアップ
	 */
	setup: function(){

		initBomb();
		
		//メニューイベント設定
		$('#menuSaveIllust').click(function(){
			saveIMG();
		});
		$('#menuSaveChat').click(function(){
			saveCHAT();
		});
		$('#menuBombButton').click(function(){
			$('#bombDialog').dialog('open');
		});
		
		//ペンタブ取得
		this.checkWacomPlugin();

		//キャンバス上のイベントハンドラ
		$('#canvas').mousedown(function(event){
			//マウスのボタンを押した
			Tool.wacom = document.Wacom;
			var size = Tool.wacom.pressure;
			if(!$('#enablePentab').is(':checked') || size === undefined){
				size = 1.0;
			}
			Tool.activeItem.onMouseDown(event.pageX - $('#canvas').position().left, event.pageY - $('#canvas').position().top, size);
		}).mousemove(function(event){
			var x = event.pageX - $('#canvas').position().left;
			var y = event.pageY - $('#canvas').position().top;
			var size = Tool.wacom.pressure;
			if(!$('#enablePentab').is(':checked') || size === undefined){
				size = 1.0;
			}
			Tool.activeItem.onMouseMove(x, y, size);
			Tool.cursor.onMouseMove(x, y, size);
			//マウス移動
		}).mouseup(function(event){
			//マウスのボタンを離した
			var x = event.pageX - $('#canvas').position().left;
			var y = event.pageY - $('#canvas').position().top;
			var size = Tool.wacom.pressure;
			if(!$('#enablePentab').is(':checked') || size === undefined){
				size = 1.0;
			}
			Tool.activeItem.onMouseRelease(x, y, size);
		}).mouseout(function(){
			Tool.activeItem.onMouseEscape();
		});
		itemNum = 0;
		itemsIconElementId = '';
		for(itemName in Tool.items){
			icon = 'icon/' + Tool.items[itemName].getIconName() + 'OFF.png';
			name = Tool.items[itemName].getName();
			//6つごとに改行
			className = ''
			if(itemNum % 6 == 0){
				if(itemNum == 0){
					Tool.activeItem = Tool.items[itemName];
					icon = icon.replace('OFF', 'ON');
					className = 'select'
				}
				itemsIconElementId = 'toolItemIcon_' + itemNum;
				$('<tr>').appendTo($('#toolSelect')).attr('id', itemsIconElementId);
			}
			$('<td>').attr('id', 'toolPluginIcon_' + itemNum).appendTo($('#' + itemsIconElementId))
			$('<img>').attr({'src': icon, 'alt': name, 'id': 'toolItem_' + itemName, 'class': className}).click(function(){new Tool().setActive($(this).attr('alt'));}).appendTo('#toolPluginIcon_' + itemNum);
			//初期化
			if(Tool.items[itemName].init !== undefined){
				Tool.items[itemName].init();
			}
			itemNum++;
		}
		//カーソルアイテムの登録
		Tool.cursor = new Cursor();
	},
	/**
	 * ツールアイテムに描写要請
	 * @param data 描写データ
	 */
	draw: function(data){
		Tool.items[data.type].draw(data);
	}
};