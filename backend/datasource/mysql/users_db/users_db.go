package users_db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var (
	Client   *sql.DB
	username = "user"
	password = "qwe123"
	host     = "127.0.0.1:3306"
	schema   = "user_db_02"
)

func init() {
	// username:password@tcp(host)/user_schema
	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8", username, password, host, schema)

	var err error

	Client, err = sql.Open("mysql", dataSourceName)
	if err != nil {
		panic(err)
	}

	if err := Client.Ping(); err != nil {
		panic(err)
	}

	log.Println("database successfully configured")
}
