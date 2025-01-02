import { FC, ReactNode, useCallback, useEffect, useState } from "react";

const ApiComponent: FC<ReactNode> = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(
      "wss://ws-feed-public.sandbox.exchange.coinbase.com"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
      // Subscribe to a channel after connection is established
      ws.send(
        JSON.stringify({
          type: "subscribe",
          channels: ["level2_batch"],
          product_ids: ["BTC-USD"],
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log({ message });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectWebSocket]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const closeWebSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <div>
      This is my API Component
      <button onClick={closeWebSocket}>Close WS</button>
    </div>
  );
};

export default ApiComponent;
