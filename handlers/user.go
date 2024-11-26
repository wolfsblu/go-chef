package handlers

import (
	"context"
	"fmt"
	"github.com/wolfsblu/go-chef/api"
	"github.com/wolfsblu/go-chef/db"
	"github.com/wolfsblu/go-chef/security"
)

func (h *RecipeHandler) Login(ctx context.Context, req *api.Credentials) (r *api.AuthenticatedUserHeaders, _ error) {
	user, err := h.DB.GetUserByEmail(ctx, req.GetEmail())
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrSecurity, err)
	}
	ok, err := security.ComparePasswordAndHash(req.GetPassword(), user.PasswordHash)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrSecurity, err)
	} else if !ok {
		return nil, fmt.Errorf("hallo welt: %w", &ErrInvalidCredentials)
	}

	cookie, err := security.NewSessionCookie(user.ID)
	if err != nil {
		return nil, &ErrSecurity
	}
	return &api.AuthenticatedUserHeaders{
		SetCookie: api.OptString{
			Set:   true,
			Value: cookie,
		},
		Response: api.ReadUser{
			ID:    user.ID,
			Email: user.Email,
		},
	}, nil
}

func (h *RecipeHandler) Logout(_ context.Context) (*api.LogoutOK, error) {
	cookie := security.ExpireSessionCookie()
	return &api.LogoutOK{
		SetCookie: api.OptString{
			Set:   true,
			Value: cookie,
		},
	}, nil
}

func (h *RecipeHandler) Register(ctx context.Context, c *api.Credentials) (*api.ReadUser, error) {
	hash, err := security.CreateHash(c.Password, security.DefaultHashParams)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrSecurity, err)
	}
	creds := db.CreateUserParams{
		Email:        c.Email,
		PasswordHash: hash,
	}
	user, err := h.DB.CreateUser(ctx, creds)
	if err != nil {
		return nil, fmt.Errorf("%w: %w", &ErrRegistration, err)
	}
	return &api.ReadUser{
		ID:    user.ID,
		Email: user.Email,
	}, nil
}

func (h *RecipeHandler) GetUserProfile(ctx context.Context) (*api.ReadUser, error) {
	user := ctx.Value(ctxKeyUser).(*db.User)
	return &api.ReadUser{
		ID:    user.ID,
		Email: user.Email,
	}, nil
}
