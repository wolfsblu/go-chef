package main

import (
	"github.com/wolfsblu/go-chef/infra/env"
	"github.com/wolfsblu/go-chef/infra/routing"
	"log"
	"net/http"
)

func main() {
	env.Load()

	scheduler, err := InitializeScheduler()
	if err != nil {
		log.Fatal("failed to initialize scheduler:", err)
	}
	scheduler.Start()

	apiServer, err := InitializeAPIServer()
	if err != nil {
		log.Fatalln("failed to initialize API server:", err)
	}
	mux := routing.NewServeMux(apiServer)

	host := env.MustGet("HOST")
	err = http.ListenAndServe(host, mux)
	if err != nil {
		log.Fatalln("failed to start web server:", err)
	}
}
