package ws.app;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;

@SuppressWarnings("deprecation")
@WebServlet(name="DrawServlet",urlPatterns={"/DrawServlet"})
public class DrawServlet extends WebSocketServlet{
    private static final long serialVersionUID = 1L;
    private static List<DrawMessageInbound> messageList = new ArrayList<DrawMessageInbound>();
 
	private class DrawMessageInbound extends MessageInbound{
		WsOutbound drawOutbound;
 
        // 接続時の処理
        @Override
        public void onOpen(WsOutbound outbound){
            System.out.println("open");
            this.drawOutbound = outbound;
            messageList.add(this);
        }
 
        // 接続解除時の処理
        @Override
        public void onClose(int status){
            System.out.println("close");
            messageList.remove(this);
        }
 
        // メッセージ受信時の処理
        @Override
        public void onTextMessage(CharBuffer message) throws IOException{
            System.out.println("data("+ message +")");
            for(DrawMessageInbound in: messageList){
                CharBuffer buffer = CharBuffer.wrap(message);
                in.drawOutbound.writeTextMessage(buffer);
                in.drawOutbound.flush();
            }
        }
        // メッセージ受信時の処理
        @Override
        public void onBinaryMessage(ByteBuffer bb) throws IOException{
        }
    }
 
    @Override
    public StreamInbound createWebSocketInbound(String arg0, HttpServletRequest arg1) {
        return new DrawMessageInbound();
    }
}