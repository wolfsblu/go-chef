<script lang="ts">
    import Dropdown from "../dropdown/Dropdown.svelte";
    import NavButton from "./NavButton.svelte";
    import Plus from "../../icons/Plus.svelte";
    import User from "../../icons/User.svelte";
    import UserDropdown from "./UserDropdown.svelte";
    import logo from "../../../assets/images/logo.svg"
    import {t} from "../../i18n/i18n.svelte"
</script>

<div class="flex items-center justify-between bg-orange-200 px-3 py-2">
    <a class="flex items-center gap-x-3" href="/">
        <span class="block bg-orange-50 rounded-full w-11 h-11 p-2">
            <img src={logo} alt="Logo">
        </span>
    </a>

    <div class="flex items-center gap-2">
        <NavButton text={t("navigation.actions.newRecipe")} href="/recipes/create" icon={Plus} />

        <Dropdown>
            {#snippet button()}
                <NavButton icon={User} />
            {/snippet}
            <UserDropdown />
        </Dropdown>
    </div>
</div>