import createClient from "openapi-fetch";
import type {paths} from "../../../api";

const client = createClient<paths>({
    baseUrl: import.meta.env.VITE_API_URL ?? '/api',
    credentials: "include",
})

export const confirmAccount = async (token: string) => {
    return client.POST("/user/confirm", {
        body: {token}
    })
}

export const fetchProfile = async () => {
    return client.GET("/user/profile")
}

export const fetchRecipes = async () => {
    return client.GET("/recipes")
}

export const createRecipe = (recipe: Recipe) => {
    return client.POST("/recipes", {
        body: {
            name: recipe.name,
            minutes: recipe.minutes,
            servings: recipe.servings,
        }
    })
}

export const login = (credentials: Credentials) => {
    return client.POST("/login", {
        body: {
            email: credentials.email,
            password: credentials.password,
        }
    })
}

export const register = (credentials: Credentials) => {
    return client.POST("/register", {
        body: {
            ...credentials
        }
    })
}

export const resetPassword = (email: string) => {
    return client.POST("/user/password/reset", {
        body: {email}
    })
}