package main

import (
	"carrental/db"
	"carrental/handlers"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	db.InitDB()

	r := mux.NewRouter()
	r.HandleFunc("/api/signup", handlers.Signup).Methods("POST")
	r.HandleFunc("/api/login", handlers.Login).Methods("POST")
	r.HandleFunc("/api/contact", handlers.SubmitContact).Methods("POST")
	r.HandleFunc("/api/mybookings", handlers.GetMyBookings).Methods("GET")
	r.HandleFunc("/api/book", handlers.BookCar).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // your frontend origin
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
	})

	handler := c.Handler(r)
	log.Println("Server started on :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
