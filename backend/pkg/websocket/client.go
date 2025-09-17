package websocket

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type Client struct {
	Id   string
	Conn *websocket.Conn
	Pool *Pool
}
type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()
	for {
		messagetype, p, err := c.Conn.ReadMessage()

		if err != nil {
			fmt.Println("error in read:", err)
			return
		}
		message := Message{Type: messagetype, Body: string(p)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}

}
