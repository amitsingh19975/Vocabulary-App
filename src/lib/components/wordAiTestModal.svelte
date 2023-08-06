<Dialog {open} let:close>
    <Card class="min-w-[30rem] max-h-[80vh]">
        <div slot="header" class="flex justify-between items-center">
            <div>
                <h1 class="text-xl opacity-70 capitalize">{currentWord}</h1>
                <span class="opacity-50 text-sm">Test your knowledge using AI</span>
            </div>
            <button
                class="text-rose-200 hover:bg-rose-500 hover:bg-opacity-50 active:bg-rose-600 active:bg-opacity-50 font-bold w-fit h-fit rounded-full p-2"
                on:click={close}
            >
                <Cross1 size={12} />
            </button>
        </div>
        <Tabs {items} activeIndex={0} useHash={false}>
            <div slot="tab" let:key class="p-1 flex flex-col gap-4 w-[30rem]">
                {#if key === "sentence"}
                    <div>
                        <div class="flex justify-end">
                            <Checkbox reverse bind:checked={spellcheck} classWrapper="w-fit">
                                <span class="text-sm">Spellcheck</span>
                            </Checkbox>
                        </div>
                        <div>
                            <div class="text-sm opacity-50">Sentence</div>
                            {#if isEditable}
                                <InputArea label="User" hideLabel placeholder="Enter a sentence" {spellcheck} rows={4} autofocus bind:value={sentence} />
                            {:else}
                                <div class="h-[7.5rem] p-2 overflow-auto bg-white bg-opacity-5 border border-white border-opacity-10 rounded">
                                    {sentence}
                                </div>
                            {/if}
                        </div>
                    </div>
                {/if}
                {#if isAIWorking || aiResponse.trim()}
                    <div in:fade>
                        <div class="text-sm opacity-50 mt-4">AI Response</div>
                        <div class="h-[7.5rem] p-2 overflow-auto bg-white bg-opacity-5 border border-white border-opacity-10 rounded relative">
                            <output aria-label="Ai response">
                                {@html parseMarkdown(aiResponse)}
                            </output>
                            {#if !aiResponse.trim()}
                                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span class="text-sm opacity-50">
                                        No response
                                    </span>   
                                </span>
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </Tabs>
        <div slot="footer">
            <Button fill="ghost" color={isAIWorking ? 'danger' : undefined} expand on:click={onAiButtonClick}>
                <div class="flex items-center gap-2 justify-center">
                    {#if !isAIWorking}
                        <MagicWand size={18} />
                        <span>Ask AI</span>
                    {:else}
                        <Cross1 size={18} />
                        <span>Cancel</span>
                    {/if}
                </div>
            </Button>
        </div>
    </Card>
</Dialog>

<script lang="ts">
    import Dialog from './dialog.svelte';
    import Card from './card.svelte';
    import Tabs from './tabs.svelte';
    import InputArea from './inputArea.svelte';
    import Checkbox from './checkbox.svelte';
	import Button from './button.svelte';
    import { MagicWand, Cross1 } from 'radix-icons-svelte';
    import { marked } from 'marked';
    import { fade } from 'svelte/transition';

    export let open = false;
    export let currentWord: string;
    
    let isAIWorking = false;
    
    let spellcheck = false;
    let sentence = '';
    let isEditable = true;
    let aiResponse = '';

    const items = [
        {
            key: 'sentence',
            value: 'Sentence',
        },
        {
            key: 'definition',
            value: 'Definition',
        }
    ];

    function onAiButtonClick() {
        isAIWorking = !isAIWorking;
        if (isAIWorking) {
            isEditable = false;
        } else {
            isEditable = true;
        }
    }

    function parseMarkdown(text: string) {
        return marked.parseInline(text, {
            mangle: false,
            headerIds: false,
        });
    }
</script>