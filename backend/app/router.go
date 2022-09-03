package app

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/hitmain13/my-wallet/backend/controller/users"
)

func mapUrls() {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))
	router.POST("/api/register", users.Register)
	router.POST("/api/login", users.Login)
	router.GET("/api/user", users.Get)
	router.GET("/api/logout", users.Logout)
}
