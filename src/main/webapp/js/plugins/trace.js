/**
 * Copyright (c) 2013 mattyan

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.

   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.

   3. This notice may not be removed or altered from any source
   distribution.
 */
/**
 * トレース台クラス
 */

function Trace(){
	if(File !== undefined && FileReader !== undefined){
		jQuery.event.props.push('dataTransfer');
		pluginForm = new PluginForm('トレース');
		pluginForm.html('<div style="text-align:center;" id="traceDropArea"><form><label><input type="checkbox" id="traceEnable">有効にする</label></form><div>画像をここにドロップ</div><button id="traceClear">クリア</button></div>');
		$('#traceDropArea').attr('draggable', 'true').bind("drop", function(event){
			event.stopPropagation();
			event.preventDefault();
			if($('#traceEnable').is(':checked')){
				if(event.dataTransfer.files[0].type.match(/image\/*/)){
					fileReader = new FileReader();
					fileReader.onload = function(event){
						$('#canvas').css({
							backgroundImage: 'url(' + event.target.result + ')',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center center'
						});
					}
					fileReader.readAsDataURL(event.dataTransfer.files[0]);
				}else{
					alert('画像ファイルをドロップしてください。[' + event.dataTransfer.files[0].type + ']');
				}
			}
	    }).bind("dragenter dragover", false).css('background-color', '#cccccc');
		$('#traceEnable').click(function(){
			if(!$(this).is(':checked')){
				$('#canvas').css({
					backgroundImage: 'none',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center'
				});
			}
		});
		$('#traceClear').click(function(){
			$('#canvas').css({
				backgroundImage: 'none',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center'
			});
		});
	}
}
//プラグイン実行
(function(){Trace();})();