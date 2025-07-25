<script lang="ts">
    import * as Form from '$lib/components/ui/form/index.js'
    import {Input} from "$lib/components/ui/input/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import {Textarea} from "$lib/components/ui/textarea/index.js";
    import {formSchema, type FormSchema} from "./schema";
    import {type Infer, setMessage, superForm, type SuperValidated,} from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {toast} from "svelte-sonner";
    import {goto} from "$app/navigation";
    import {addRecipe} from "$lib/api/recipes/recipes.svelte";
    import { TagsInput } from '$lib/components/ui/tags-input';
    import ImageUpload from "$lib/components/recipes/ImageUpload.svelte";
    import UnitCombobox from "$lib/components/recipes/UnitCombobox.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import PlusIcon from "@lucide/svelte/icons/plus";
    import TrashIcon from "@lucide/svelte/icons/trash";
    import IngredientCombobox from "$lib/components/recipes/IngredientCombobox.svelte";

    let {data}: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();
    const form = superForm(data.form, {
        SPA: true,
        resetForm: false,
        validators: zodClient(formSchema),
        async onUpdate({form}) {
            if (form.valid) {
                try {
                    await addRecipe(form.data)
                    toast.success("Recipe added successfully")
                    await goto("/recipes")
                } catch (error) {
                    toast.error("Failed to save recipe")
                }
                setMessage(form, "Recipe added successfully");
            }
        }
    })
    const {form: formData, enhance} = form;


    const removeIngredientByIndex = (index: number) => {
        $formData.ingredients = $formData.ingredients.filter((_, i) => i !== index);
    }

    const addIngredient = () => {
        $formData.ingredients = [...$formData.ingredients, ""];
    }
</script>

<form class="p-6" method="POST" use:enhance>
    <ImageUpload />
    <div class="flex flex-col lg:flex-row gap-x-6 gap-y-3 mt-3">
        <div class="w-full flex flex-col gap-3">
            <Form.Field {form} name="name">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Name</Form.Label>
                        <Input {...props} bind:value={$formData.name} placeholder="My super tasty recipe"/>
                    {/snippet}
                </Form.Control>
                <Form.Description/>
                <Form.FieldErrors/>
            </Form.Field>
            <div class="grid grid-cols-2 gap-3">
                <Form.Field {form} name="servings">
                    <Form.Control>
                        {#snippet children({props})}
                            <Form.Label>Servings</Form.Label>
                            <Input {...props} bind:value={$formData.servings} type="number" placeholder="4"/>
                        {/snippet}
                    </Form.Control>
                    <Form.Description/>
                    <Form.FieldErrors/>
                </Form.Field>
                <Form.Field {form} name="minutes">
                    <Form.Control>
                        {#snippet children({props})}
                            <Form.Label>Time (min.)</Form.Label>
                            <Input {...props} bind:value={$formData.minutes} type="number" placeholder="45"/>
                        {/snippet}
                    </Form.Control>
                    <Form.Description/>
                    <Form.FieldErrors/>
                </Form.Field>
            </div>
            <Form.Field {form} name="tags">
                <Form.Control>
                    {#snippet children({props})}
                        <Form.Label>Tags</Form.Label>
                        <TagsInput {...props} bind:value={$formData.tags} placeholder="Add a tag" />
                    {/snippet}
                </Form.Control>
                <Form.Description/>
                <Form.FieldErrors/>
            </Form.Field>
        </div>

        <Form.Field class="w-full flex flex-col" {form} name="description">
            <Form.Control>
                {#snippet children({props})}
                    <Form.Label>Description</Form.Label>
                    <Textarea {...props}
                              class="flex-grow resize-none"
                              bind:value={$formData.description}
                              placeholder="Grandma's original pasta recipe handed down for generations."
                    />
                {/snippet}
            </Form.Control>
            <Form.Description class="sr-only">Test</Form.Description>
            <Form.FieldErrors/>
        </Form.Field>
    </div>

    <Separator class="my-3" orientation="horizontal" />

    <h1>Steps</h1>
    <Form.Fieldset {form} name="ingredients">
        <Form.Legend>Ingredients</Form.Legend>
        {#each $formData.ingredients as _, i}
            <Form.ElementField {form} name="ingredients[{i}]">
                <Form.Control>
                    {#snippet children({props})}
                        <div class="flex flex-col md:flex-row gap-1">
                            <Input {...props} class="w-auto" type="number" bind:value={$formData.ingredients[i]} placeholder="1" />
                            <UnitCombobox />
                            <IngredientCombobox class="flex-grow" />
                            {#if i === $formData.ingredients.length - 1}
                                <Button onclick={addIngredient} type="button">
                                    <PlusIcon />
                                </Button>
                            {:else}
                                <Button variant="destructive" onclick={() => removeIngredientByIndex(i)} type="button">
                                    <TrashIcon />
                                </Button>
                            {/if}
                        </div>
                    {/snippet}
                </Form.Control>
                <Form.Description class="sr-only" />
                <Form.FieldErrors/>
            </Form.ElementField>
        {/each}
        <Form.Description/>
        <Form.FieldErrors/>
        {#if $formData.ingredients.length === 0}
            <Button onclick={addIngredient} type="button">
                <PlusIcon />
                Add
            </Button>
        {/if}
    </Form.Fieldset>

    <Button class="w-full" type="submit">Create</Button>
</form>
