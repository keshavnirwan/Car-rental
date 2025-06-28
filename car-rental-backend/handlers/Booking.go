package handlers

import (
	"carrental/db"
	"encoding/json"
	"net/http"
)

type Booking struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Address    string `json:"address"`
	CarName    string `json:"carName"`
	CarId      *int   `json:"carId"`
	CarPrice   string `json:"carPrice"`
	PickupDate string `json:"pickupDate"`
	ReturnDate string `json:"returnDate"`
}

func BookCar(w http.ResponseWriter, r *http.Request) {
	var b Booking
	if err := json.NewDecoder(r.Body).Decode(&b); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	res, err := db.DB.Exec(
		"INSERT INTO bookings (name, email, phone, address, car_name, car_id, car_price, pickup_date, return_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		b.Name, b.Email, b.Phone, b.Address, b.CarName, b.CarId, b.CarPrice, b.PickupDate, b.ReturnDate,
	)
	if err != nil {
		http.Error(w, "Failed to save booking", http.StatusInternalServerError)
		return
	}
	id, _ := res.LastInsertId()
	json.NewEncoder(w).Encode(map[string]interface{}{"message": "Booking successful", "bookingId": id})
}
