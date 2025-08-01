// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.29.0

package sqlite

import (
	"time"
)

type Ingredient struct {
	ID   int64
	Name string
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

type RecipeIngredient struct {
	ID           int64
	StepID       int64
	IngredientID int64
	UnitID       int64
	Amount       float64
	SortOrder    int64
}

type RecipeStep struct {
	ID           int64
	RecipeID     int64
	Instructions string
	SortOrder    int64
}

type RecipeTag struct {
	RecipeID int64
	TagID    int64
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

type UserRegistration struct {
	UserID    int64
	Token     string
	CreatedAt time.Time
}
