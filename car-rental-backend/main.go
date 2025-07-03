package main

import (
	"carrental/db"
	"carrental/handlers"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found or error loading .env")
	}
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // fallback for local dev
	}
	log.Printf("Server started on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
