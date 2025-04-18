<script lang="ts">
    import {
        DarkMode, Indicator,
        Sidebar,
        SidebarDropdownItem,
        SidebarDropdownWrapper,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Tooltip,
    } from "flowbite-svelte";
    import {
        ArrowLeftToBracketOutline,
        ArrowRightToBracketOutline,
        EditOutline,
        ShoppingBagSolid,
        UserCircleSolid,
        ReceiptSolid,
        SearchOutline,
        RulerCombinedOutline,
        CartOutline,
        BellOutline,
    } from "flowbite-svelte-icons";
    import { page } from "$app/state";
    import { isAuthenticated, logout } from "$lib/auth/user.svelte";
    import Notifications from "../notifications/Notifications.svelte";

    interface Props {
        onNavigate?: () => void;
    }

    const { onNavigate }: Props = $props();

    const onLogout = (_: MouseEvent) => {
        logout();
        onNavigate?.();
    };

    let bubbleClass =
        "inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300";
    let iconClass =
        "w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
    let spanClass = "flex-1 ms-3 whitespace-nowrap";
    let activeUrl = $derived(page.url.pathname);
    const isActive = (url: string) => {
        return activeUrl.endsWith(url);
    };

    let showNotifications = $state(false);
</script>

<Notifications bind:open={showNotifications} />

<Sidebar {activeUrl} asideClass="w-full h-full shadow">
    <SidebarWrapper class="h-full flex flex-col justify-between rounded-l-none">
        <SidebarGroup>
            <SidebarItem
                label="Browse"
                href="/"
                on:click={() => onNavigate?.()}
            >
                <svelte:fragment slot="icon">
                    <SearchOutline class={iconClass} />
                </svelte:fragment>
            </SidebarItem>
            {#if isAuthenticated()}
                <SidebarDropdownWrapper label="Recipes" isOpen>
                    <svelte:fragment slot="icon">
                        <ReceiptSolid class={iconClass} />
                    </svelte:fragment>
                    <SidebarDropdownItem
                        label="My Recipes"
                        href="/recipes"
                        onclick={() => onNavigate?.()}
                        active={isActive("/recipes")}
                    />
                    <SidebarDropdownItem
                        label="Planned Recipes"
                        href="/recipes/plan"
                        onclick={() => onNavigate?.()}
                        active={isActive("/recipes/plan")}
                    />
                    <SidebarDropdownItem
                        label="Saved Recipes"
                        href="/recipes/saved"
                        onclick={() => onNavigate?.()}
                        active={isActive("/recipes/saved")}
                    />
                </SidebarDropdownWrapper>
                <SidebarItem
                    label="Ingredients"
                    {spanClass}
                    href="/ingredients"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <ShoppingBagSolid class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                    label="Measurements"
                    {spanClass}
                    href="/measurements"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <RulerCombinedOutline class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                    label="Shopping List"
                    {spanClass}
                    href="/shopping"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <CartOutline class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
            {/if}
        </SidebarGroup>
        <SidebarGroup border>
            {#if !isAuthenticated()}
                <SidebarItem
                    label="Sign In"
                    href="/auth/login"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <ArrowRightToBracketOutline class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                    label="Sign Up"
                    href="/auth/register"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <EditOutline class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
            {:else}
                <SidebarItem
                    label="Account"
                    href="/user/account"
                    on:click={() => onNavigate?.()}
                >
                    <svelte:fragment slot="icon">
                        <UserCircleSolid class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                    spanClass="flex-1 ms-3"
                    label="Notifications"
                    href="/user/notifications"
                    onclick={(e) => { e.preventDefault(); showNotifications = true}}
                >
                    <svelte:fragment slot="icon">
                        <div class="relative">
                            <BellOutline class={iconClass} />
                            <Indicator color="red" size="xs" placement="bottom-right" />
                        </div>
                    </svelte:fragment>
                    <svelte:fragment slot="subtext">
                        <span class={bubbleClass}> 3 </span>
                    </svelte:fragment>
                </SidebarItem>

                <SidebarItem
                    label="Sign Out"
                    href="/auth/login"
                    on:click={onLogout}
                >
                    <svelte:fragment slot="icon">
                        <ArrowLeftToBracketOutline class={iconClass} />
                    </svelte:fragment>
                </SidebarItem>
            {/if}
            <section class="flex justify-center">
                <DarkMode class="cursor-pointer" />
                <Tooltip>Toggle dark mode</Tooltip>
            </section>
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>