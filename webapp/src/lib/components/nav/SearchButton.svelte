<script lang="ts">
    import { Kbd } from '$lib/components/ui/kbd';
    import { Button } from '$lib/components/ui/button';
    import { cn } from '$lib/utils/utils';
    import { cmdOrCtrl } from '$lib/hooks/is-mac.svelte';
	import { commandContext } from "$lib/context";
	import SearchIcon from '@lucide/svelte/icons/search';

    type Props = {
        class?: string;
    };

    let { class: className }: Props = $props();

    const commandState = commandContext.get();
</script>

<Button
        variant="outline"
        class={cn('flex place-items-center justify-between px-2', className)}
        onclick={commandState.setTrue}
>
	<span class="text-muted-foreground flex place-items-center gap-2">
		<SearchIcon class="inline size-4" />
		Go to
	</span>
    <Kbd size="sm" variant="secondary">
        {cmdOrCtrl} + K
    </Kbd>
</Button>