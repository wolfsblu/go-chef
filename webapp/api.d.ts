/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login a user */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logout a user */
        post: operations["logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Register a new user */
        post: operations["register"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/confirm": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confirm a user account after successful registration */
        post: operations["confirmUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Modify a user's password based on a reset token */
        post: operations["updatePassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/password/reset": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reset password for an existing user by email */
        post: operations["resetPassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the profile of the logged in user */
        get: operations["getUserProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recipes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all recipes */
        get: operations["getRecipes"];
        put?: never;
        /** Add a new recipe to the store */
        post: operations["addRecipe"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/recipes/{recipeId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Find a recipe by ID
         * @description Returns a single recipe
         */
        get: operations["getRecipeById"];
        put?: never;
        /** Updates a recipe in the store */
        post: operations["updateRecipe"];
        /** Deletes a recipe */
        delete: operations["deleteRecipe"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Credentials: {
            email: string;
            password: string;
        };
        /** @description Represents an error */
        Error: {
            message: string;
        };
        /**
         * @description Recipe status in the store
         * @enum {string}
         */
        RecipeStatus: "available" | "pending" | "sold";
        WriteRecipe: {
            name: string;
        };
        ReadRecipe: components["schemas"]["WriteRecipe"] & {
            /** Format: int64 */
            id: number;
        };
        ReadUser: {
            /** Format: int64 */
            id: number;
            email: string;
        };
        Token: {
            token: string;
        };
        UpdatePassword: components["schemas"]["Token"] & {
            password: string;
        };
    };
    responses: {
        /** @description Something went wrong */
        Error: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description User object returned as result */
        AuthenticatedUser: {
            headers: {
                "Set-Cookie": components["headers"]["SessionCookie"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ReadUser"];
            };
        };
        /** @description Recipe object returned as result */
        RecipeList: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ReadRecipe"][];
            };
        };
        /** @description Recipe object returned as result */
        Recipe: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ReadRecipe"];
            };
        };
        /** @description User object returned as result */
        User: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ReadUser"];
            };
        };
    };
    parameters: never;
    requestBodies: {
        /** @description User credentials */
        Credentials: {
            content: {
                "application/json": components["schemas"]["Credentials"];
            };
        };
        /** @description Recipe object that needs to be added to the store */
        Recipe: {
            content: {
                "application/json": components["schemas"]["WriteRecipe"];
            };
        };
        /** @description The user's new password as well as the required reset token */
        UpdatePassword: {
            content: {
                "application/json": components["schemas"]["UpdatePassword"];
            };
        };
        /** @description The user's new password as well as the required reset token */
        ConfirmUser: {
            content: {
                "application/json": components["schemas"]["Token"];
            };
        };
    };
    headers: {
        /** @description Sets the session for the logged in user */
        SessionCookie: string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Login a user with the provided credentials */
        requestBody: components["requestBodies"]["Credentials"];
        responses: {
            /** @description Successful operation */
            200: components["responses"]["AuthenticatedUser"];
            default: components["responses"]["Error"];
        };
    };
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation */
            200: {
                headers: {
                    "Set-Cookie": components["headers"]["SessionCookie"];
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
    register: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The new user credentials */
        requestBody: components["requestBodies"]["Credentials"];
        responses: {
            /** @description Registration was successful */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
    confirmUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["ConfirmUser"];
        responses: {
            /** @description Successful operation */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
    updatePassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["UpdatePassword"];
        responses: {
            /** @description Successful operation */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
    resetPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The user's email */
        requestBody: {
            content: {
                "application/json": {
                    email: string;
                };
            };
        };
        responses: {
            /** @description Successful operation */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
    getUserProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation */
            200: components["responses"]["User"];
            default: components["responses"]["Error"];
        };
    };
    getRecipes: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful operation */
            200: components["responses"]["RecipeList"];
            default: components["responses"]["Error"];
        };
    };
    addRecipe: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Create a new recipe in the store */
        requestBody: components["requestBodies"]["Recipe"];
        responses: {
            /** @description Successful operation */
            200: components["responses"]["Recipe"];
            default: components["responses"]["Error"];
        };
    };
    getRecipeById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the recipe to return */
                recipeId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: components["responses"]["Recipe"];
            default: components["responses"]["Error"];
        };
    };
    updateRecipe: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the recipe to update */
                recipeId: number;
            };
            cookie?: never;
        };
        requestBody: components["requestBodies"]["Recipe"];
        responses: {
            /** @description successful operation */
            200: components["responses"]["Recipe"];
            default: components["responses"]["Error"];
        };
    };
    deleteRecipe: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Recipe ID to delete */
                recipeId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            default: components["responses"]["Error"];
        };
    };
}
