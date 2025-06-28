package handlers

import (
	"carrental/db"
	"carrental/models"
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Password hashing failed", http.StatusInternalServerError)
		return
	}

	_, err = db.DB.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		user.Name, user.Email, hashedPassword)
	if err != nil {
		http.Error(w, "User creation failed: "+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created"})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	var storedHash string
	var userID int
	row := db.DB.QueryRow("SELECT id, password FROM users WHERE email = ?", user.Email)
	err := row.Scan(&userID, &storedHash)
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(user.Password))
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Set a simple session cookie (for demo, use JWT or secure session in production)
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    user.Email, // In production, use a secure random value or JWT
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		// Secure: true, // Uncomment if using HTTPS
	})

	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
}
