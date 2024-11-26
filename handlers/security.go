package handlers

import (
	"context"
	"fmt"
	"github.com/wolfsblu/go-chef/api"
	"github.com/wolfsblu/go-chef/db"
	"github.com/wolfsblu/go-chef/security"
)

type contextKey string

const (
	ctxKeyUser = contextKey("User")
)

type SecurityHandler struct {
	DB *db.Queries
}

func NewSecurityHandler(query *db.Queries) *SecurityHandler {
	return &SecurityHandler{
		DB: query,
	}
}

func (h *SecurityHandler) HandleCookieAuth(ctx context.Context, _ string, t api.CookieAuth) (context.Context, error) {
	userId, err := security.GetUserFromSessionCookie(t.APIKey)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrSecurity, err)
	}
	user, err := h.DB.GetUser(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrSecurity, err)
	}
	return context.WithValue(ctx, ctxKeyUser, &user), nil
}
