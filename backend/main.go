package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/abrshDev/chatapp/pkg/websocket"
)

func servews(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	ws, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println(err)
	}
	go websocket.Writer(ws)
	websocket.Reader(ws)
}

func setupRoutes() {

	http.HandleFunc("/ws", servews)

}
func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
