// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package sqlite

import (
	"time"
)

type Action struct {
	ID     int64
	Name   string
	Points int64
}

type Award struct {
	ID          int64
	Name        string
	Description string
}

type Ingredient struct {
	ID       int64
	RecipeID int64
	UnitID   int64
	Name     string
	Amount   float64
}

type MealPlan struct {
	ID        int64
	Date      string
	UserID    int64
	RecipeID  int64
	SortOrder int64
}

type PasswordReset struct {
	UserID    int64
	Token     string
	CreatedAt time.Time
}

type Recipe struct {
	ID          int64
	Name        string
	Servings    int64
	Minutes     int64
	Description string
	CreatedBy   int64
	CreatedAt   time.Time
}

type RecipeImage struct {
	ID        int64
	RecipeID  int64
	Path      string
	SortOrder int64
	CreatedAt time.Time
}

type RecipeTag struct {
	RecipeID int64
	TagID    int64
}

type RecipeVote struct {
	RecipeID int64
	UserID   int64
	Vote     int64
	VotedAt  time.Time
}

type Tag struct {
	ID   int64
	Name string
}

type Unit struct {
	ID   int64
	Code interface{}
	Name string
}

type User struct {
	ID           int64
	Email        string
	PasswordHash string
	IsConfirmed  bool
	CreatedAt    time.Time
}

type UserAward struct {
	UserID    int64
	RecipeID  int64
	AwardID   int64
	AwardedAt time.Time
}

type UserRegistration struct {
	UserID    int64
	Token     string
	CreatedAt time.Time
}

type UserReputation struct {
	UserID    int64
	RecipeID  int64
	ActionID  int64
	AwardedAt time.Time
}
