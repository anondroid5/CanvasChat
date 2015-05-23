function Socket(connectEvent){
	var self = arguments.callee;
	if(self.instance == null){
		this.initialize.apply(this, [connectEvent]);
		self.instance = this;
	}
	return self.instance;
}

Socket.prototype = {
	/**
	 * コンストラクタ
	 */
	initialize: function(connectEvent){
		$('#connection').html('切断').css({
			backgroundColor:'#ff0000',
			color:'#ffffff'
		});
		Socket.isConnect = false;
		if(typeof(WebSocket) != 'undefined'){
			this.socket = new WebSocket("ws://localhost:8080/CanvasChat/DrawServlet");
			Socket.connectEvent = connectEvent;
			//イベントハンドラ設定
			this.socket.onopen = Socket.prototype.onConnect;
			this.socket.onerror = Socket.prototype.onError;
			this.socket.onmessage = Socket.prototype.onMessage;
			this.socket.onclose = Socket.prototype.onDisconnect;
		}else{
			$('#connection').html('使用不能').css({
				backgroundColor:'#000000',
				color:'#ff0000'
			});
		}
		Socket.isLogFinish = false;//ログ終了済みフラグ
		Socket.logList = new Array();   //再生待ちリスト

	},
	send: function(data, callback){
		if(this.socket !== undefined){
			if(callback !== undefined){
				this.callback = callback;
			}
			this.socket.send(JSON.stringify(data));
		}
	},
	/**
	 * ログイン
	 * @param name ハンドルネーム
	 * @param room ルーム名
	 */
	login: function(name, room){
		if(!Socket.isConnect){return;}
		this.send({
			cmd: 'login',
			name: name,
			room: room
		});
	},
	/**
	 * ログアウト
	 */
	logout: function(){
		if(!Socket.isConnect){return;}
		this.send({cmd: 'exit'});
	},
	/**
	 * 描写データ送信
	 * @param 描写データ
	 */
	draw: function(data){
		if(!Socket.isConnect){
			new Tool().draw(data);
			return;
		}
		this.send({
			cmd: 'pen',
			p: data
		});
	},
	erase: function(data){
		if(!Socket.isConnect){
			new LayerManager().erase(data);
			return;
		}
		this.send({
			cmd: 'ers',
			p: data
		});
	},
	bomb: function(){
		if(!Socket.isConnect){
			new LayerManager().bomb();
			return;
		}
		this.send({
			cmd: 'bomb'
		});
	},
	/**
	 * メッセージ送信
	 * @param message 送信するメッセージ
	 */
	message: function(message){
		if(!Socket.isConnect){return;}
		this.send({
			cmd: 'msg',
			msg: message
		});
	},
	/**
	 * 接続イベントハンドラ
	 */
	onConnect: function(){
		Socket.isConnect = true;
		$('#connection').html('接続').css({
			backgroundColor:'#00ff00',
			color:'#000000'
		});
		if(Socket.connectEvent !== undefined){
			Socket.connectEvent();
		}
		Socket.intervalId = setInterval(function(){
			if(!Socket.isConnect){
				clearInterval(Socket.intervalId);
				return;
			}
			new Socket().send({cmd: ''});
		}, 1000 * 10);//10秒ごとに空パケット送信
	},
	/**
	 * メッセージ受信イベントハンドラ
	 * @param event イベント情報
	 */
	onMessage: function(event){
		if(event.data == '')return;
		eval('data = ' + event.data);
		if(this.callback !== undefined){
			this.callback(data);
		}
		switch(data.cmd){
			case 'roomName':
				//ルーム名取得
				Socket.roomName = data.room;
			break;
			case 'addParticipant':
				//参加者取得
				data.names.forEach(function(participant){
					new Chat().addParticipant(participant.name, participant.hash);
				});
			break;
			case 'pen':
				//線引き
				new Tool().draw(data.p);
			break;
			case 'ers':
				//消しゴム
				new LayerManager().erase(data.p);
			break
			case 'bomb':
				//全部消去
				new LayerManager().bomb();
			break;
			case 'msg':
				//チャットメッセージ
				new Chat().receiveMessage(data.msg);
			break;
			case 'login':
				//ログイン
				new Chat().login(data.name, data.hash);
			break;
			case 'logout':
				//ログアウト
				new Chat().logout(data.name, data.hash);
			break;
			case 'log':
				//ログ再生
				if(data.logs !== undefined){
					//ログがあるならログ再生
						image = {};
						index = 0;
						data.logs.forEach(function(item){
							isLoading = true;
							image[index] = new Image();
							image[index].src = item.data;
							image[index].name = item.layer;
							image[index].onload = function(){
							new LayerManager().setImage(this.name, this);
						};
						index++;
					});

					while(Socket.logList.length > 0){
						item = Socket.logList[0];
						if(item[0] == 'pen'){
							new Tool().draw(item[1]);
						}else if(item[0] == 'ers'){
							new LayerManager().erase(item[1]);
						}
						Socket.logList.pop();
					}
				}
				Socket.isLogFinish = true;
			break;
			case 'getLog':
				//現状のキャンバスを取得
				new Socket().send({cmd: 'log', target: data.target, logs: new LayerManager().getLog()});
			break;
		}
	},
	/**
	 * 切断イベントハンドラ
	 */
	onDisconnect: function(){
		$('#connection').html('切断').css({
			backgroundColor:'#ff0000',
			color:'#ffffff'
		});
		Socket.isConnect = false;
	},
	onError: function(env){
		//alert("エラー発生:" + env.data);
	},
	close: function(){
		this.socket.close();
	}
}