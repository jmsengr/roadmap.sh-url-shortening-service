# 📦 URL Shortening Service

https://roadmap.sh/projects/url-shortening-service

A simple RESTful API that shortens long URLs and provides basic CRUD operations along with usage statistics inspired by the roadmap.sh backend project idea.

---

# 🚀 Project Overview

- The URL Shortening Service is a backend application that:
- Takes long URLs and returns short, unique aliases.
- Lets users manage these short links through standard REST API operations.
- Tracks how many times each short URL has been accessed.
- This project is a practical exercise in API design, database modeling, and HTTP routing.

---

# ⚙️ Features

- Create short URLs via a POST request
- Retrieve original URLs using a short code
- Update URL mappings with PUT
- Delete short URLs using DELETE
- Get usage statistics such as access count
- Optional: Minimal frontend with client-side redirect logic

---

# 📡 API Endpoints

Method	Endpoint	Description
POST	/shorten	Create a new shortened URL
GET	/shorten/:shortCode	Retrieve original URL
PUT	/shorten/:shortCode	Update an existing short URL
DELETE	/shorten/:shortCode	Remove a short URL
GET	/shorten/:shortCode/stats	Get access statistics

Each endpoint should return meaningful HTTP status codes — e.g., 201 Created, 200 OK, 404 Not Found, 204 No Content.

---

# 📌 Example Response (Create URL)

```json
    {
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

---

# 🛠️ Tech Stack Recommendations

You’re free to choose your stack, but the following are commonly used: 

Layer	Options
Backend	Node.js + Express, Flask, Django, Spring Boot
Database	PostgreSQL, MySQL, MongoDB
Frontend (optional)	React, Vue, plain HTML/JS
DevOps / Deployment	Docker, Cloud hosting

The key requirement is implementing core API functionality; authentication is not required for this project.

---

# 🧪 What You’ll Learn

- Designing RESTful APIs
- Generating unique short codes
- CRUD operations with persistent storage
- Basic analytics and redirection logic