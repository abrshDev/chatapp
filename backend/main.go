package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/abrshDev/chatapp/pkg/websocket"
)

func servews(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}
	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		servews(pool, w, r)
	})

}
func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
