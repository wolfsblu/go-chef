import router, {type Callback} from "page"
import {type Component} from "svelte"
import About from "../pages/About.svelte"
import CreateRecipe from "../pages/recipes/Create.svelte"
import Index from "../pages/Index.svelte"
import Login from "../pages/Login.svelte";
import NotFound from "../pages/errors/404.svelte"
import Register from "../pages/Register.svelte";
import {createUser} from "./auth/user.svelte";

let page: Component | null = $state(null);

const user = createUser()

export const createRouter = () => {
    const redirectToHome = () => router.redirect("/")
    const redirectToLogin = () => router.redirect("/login")

    const requireLogin: Callback = async (_, next) => {
        if (user.profile) {
            next()
        } else {
            redirectToLogin()
        }
    }

    const requireGuest: Callback = async (_, next) => {
        if (user.profile) {
            redirectToHome()
        } else {
            next()
        }
    }

    const setPage: (c: Component) => Callback = (nextPage) => {
        return (_ctx, _next) => {
            page = nextPage
        }
    }

    const registerRoutes = () => {
        router("/", setPage(Index))
        router("/about", setPage(About))
        router("/login", requireGuest, setPage(Login))
        router("/register", requireGuest, setPage(Register))
        router("/recipes/create", requireLogin, setPage(CreateRecipe))
        router("*", setPage(NotFound))

        router.start()
    }

    return {
        get page() {
            return page
        },
        registerRoutes,
    }
}