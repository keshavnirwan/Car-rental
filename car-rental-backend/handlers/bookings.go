package handlers

import (
	"carrental/db"
	"encoding/json"
	"net/http"
)

type BookingRow struct {
	ID         int    `json:"id"`
	CarName    string `json:"car_name"`
	PickupDate string `json:"pickup_date"`
	ReturnDate string `json:"return_date"`
	CarPrice   string `json:"car_price"`
	Phone      string `json:"phone"`
	Address    string `json:"address"`
}

func GetMyBookings(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Email required", http.StatusBadRequest)
		return
	}
	rows, err := db.DB.Query("SELECT id, car_name, pickup_date, return_date, car_price, phone, address FROM bookings WHERE email = ?", email)
	if err != nil {
		http.Error(w, "Failed to fetch bookings", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var bookings []BookingRow
	for rows.Next() {
		var b BookingRow
		if err := rows.Scan(&b.ID, &b.CarName, &b.PickupDate, &b.ReturnDate, &b.CarPrice, &b.Phone, &b.Address); err == nil {
			bookings = append(bookings, b)
		}
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"bookings": bookings})
}
