// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"github.com/wolfsblu/go-chef/api"
	"github.com/wolfsblu/go-chef/domain"
	"github.com/wolfsblu/go-chef/infra/handler"
	"github.com/wolfsblu/go-chef/infra/job"
	"github.com/wolfsblu/go-chef/infra/routing"
	"github.com/wolfsblu/go-chef/infra/smtp"
	"github.com/wolfsblu/go-chef/infra/sqlite"
	"net/http"
)

// Injectors from wire.go:

func InitializeRecipeService() (*domain.RecipeService, error) {
	mailer := smtp.NewSMTPMailer()
	store, err := sqlite.NewSqliteStore()
	if err != nil {
		return nil, err
	}
	recipeService := domain.NewRecipeService(mailer, store)
	return recipeService, nil
}

func InitializeWebServer(service *domain.RecipeService) (*http.ServeMux, error) {
	recipeHandler := handler.NewRecipeHandler(service)
	securityHandler := handler.NewSecurityHandler(service)
	server, err := api.NewAPIServer(recipeHandler, securityHandler)
	if err != nil {
		return nil, err
	}
	handlerHandler, err := handler.NewUploadHandler(service)
	if err != nil {
		return nil, err
	}
	serveMux := routing.NewServeMux(server, handlerHandler)
	return serveMux, nil
}

func InitializeScheduler(service *domain.RecipeService) *job.Scheduler {
	scheduler := job.NewScheduler(service)
	return scheduler
}
