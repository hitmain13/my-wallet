package users_db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	dotenv "github.com/hitmain13/my-wallet/backend/utils/variables"
)

var (
	Client   *sql.DB
	username = dotenv.GetVariableByName("DATABASE_USERNAME")
	password = dotenv.GetVariableByName("DATABASE_PASSWORD")
	host     = dotenv.GetVariableByName("DATABASE_HOST")
	schema   = dotenv.GetVariableByName("DATABASE_SCHEMA")
)

func init() {
	// os package
	envValue := dotenv.EnvVariable("name")
	fmt.Printf("\nos package: name = %s \n", envValue)
	fmt.Printf("environment = %s \n\n", os.Getenv("APP_ENV"))

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

	log.Printf("database successfully configured \n\n")
}
