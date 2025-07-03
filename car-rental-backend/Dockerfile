# Start from the latest golang image
FROM golang:1.24 AS builder

# Set the working directory
WORKDIR /app

# Copy go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the Go app
RUN go build -o main .

# Final minimal image
FROM alpine:latest

WORKDIR /root/
COPY --from=builder /app/main .

EXPOSE 8000
CMD ["./main"]
