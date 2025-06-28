package handlers

import (
	"carrental/db"
	"encoding/json"
	"net/http"
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func SubmitContact(w http.ResponseWriter, r *http.Request) {
	var form ContactForm
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	_, err = db.DB.Exec("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", form.Name, form.Email, form.Message)
	if err != nil {
		http.Error(w, "Failed to save message", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Message received"})
}
