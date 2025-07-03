# Use the official Golang image as a build stage
FROM golang:1.24


WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o car-rental-app main.go

# Use a minimal base image for the final container
FROM debian:bookworm-slim

WORKDIR /app

COPY --from=builder /app/car-rental-app .
COPY --from=builder /app/.env . # Optional: copy .env if needed

EXPOSE 10000

CMD ["./car-rental-app"]