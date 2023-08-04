<div class="h-full w-full overflow-y-auto overflow-x-hidden">
    <div class="flex justify-between items-center">
        <div class="flex items-baseline gap-1">
            <h1 class="capitalize text-[2em] font-extrabold">{word.word}</h1>
            <span class="opacity-70 lowercase" class:memory-test={memoryTest}>{word.form}</span>
        </div>
    </div>

    {#if Array.isArray(word.defs) && word.defs.length > 0}
        <div class="mt-3 w-full d-html-word">
            <h2 class="text-[1.2em] opacity-70 font-medium w-full">Definitions</h2>
            <ol class="ml-5 mt-2 list-none word-list w-full flex gap-4 flex-col">
                {#each (word.defs ?? []) as def, index}
                    <li class:memory-test={memoryTest} class="flex gap-1 max-w-[95%]">
                        <span>{index + 1}.</span>
                        <div class="flex flex-col gap-2 flex-grow">
                            <p class="word-def-item">{@html parseMarkdown(def.def)}</p>
                            {#if Array.isArray(def.examples) && def.examples.length > 0}
                                <div class="p-2 rounded bg-white bg-opacity-10 border-white border border-opacity-20">
                                    <h3 class="text-md opacity-70 font-medium">Examples</h3>
                                    <ol class="ml-4 list-inside list-decimal">
                                        {#each def.examples as example}
                                            <li>
                                                {@html parseMarkdown(example)}
                                            </li>
                                        {/each}
                                    </ol>
                                </div>
                            {/if}
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    {/if}
    {#if Array.isArray(word?.otherForms) && word.otherForms.length > 0}
        <div class="mt-12 w-full d-html-word">
            <h2 class="text-[1.2em] opacity-70 font-medium w-full">Other Forms</h2>
            <ol class="ml-5 mt-2 w-full other-form-list">
                {#each word.otherForms as otherForm, index}
                    <li class:memory-test={memoryTest} class="flex gap-1 max-w-[95%]">
                        <span class="min-w-[1.5ch]">{index + 1}.</span>
                        <div class="capitalize flex gap-2 items-baseline">
                            {#if !isWordInList(otherForm.word)}
                                <span>{otherForm.word}</span>
                            {:else}
                                <a href={makeURL(otherForm.word)} on:click={() => onClick(makeURL(otherForm.word))}>{otherForm.word}</a>
                            {/if}
                            <span class="opacity-70 text-sm">({otherForm.form})</span>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    {/if}
    <div class="mt-12 w-full d-html-word">
        <div class="text-[1.2em] opacity-70 font-medium w-full flex items-center gap-1">
            <ExternalLink size={19} />
            <h2>Links</h2>
        </div>
        <ul class="ml-5 mt-2 w-full list-inside list-disc">
            {#each dictionaryLinks  as link (link.link)}
                <li class="max-w-[95%]">
                    <a href={`${link.link}/${word.word}`} target="_blank" class="text-sky-400 custom-a-tag no-underline hover:underline">{link.title}</a>
                </li>
            {/each}
            {#each (word.links ?? []) as link}
                <li class="max-w-[95%]">
                    <a href={link.link} target="_blank" class="text-sky-400 custom-a-tag no-underline hover:underline">{link.title}</a>
                </li>
            {/each}
        </ul>
    </div>
</div>


<script lang="ts">
	import type { WordSchema } from '../../model/wordsSchema';
    import { marked  } from 'marked';
    import { ExternalLink } from 'radix-icons-svelte';
    import { wordList } from '$lib/wordList';

    export let word: WordSchema;
    export let memoryTest: boolean = false;

    const dictionaryLinks = [
        {
            link: 'https://dictionary.cambridge.org/dictionary/english',
            title: 'Cambridge Dictionary'
        },
        {
            link: 'https://www.vocabulary.com/dictionary',
            title: 'Vocabulary.com'
        },
        {
            link: 'https://www.merriam-webster.com/dictionary',
            title: 'Merriam-Webster'
        },
    ]

    function parseMarkdown(text: string) {
        return marked.parseInline(text, {
            mangle: false,
            headerIds: false,
        });
    }

    function isWordInList(word: string) {
        const wordIndex = $wordList.find((w) => w.word === word);
        return Boolean(wordIndex);
    }

    function onClick(s: string) {
        window.location.hash = s;
    }

    function makeURL(word: string) {
        return `#${word}`;
    }

</script>

<style lang="postcss" scoped>
    .word-def-item {
        @apply font-medium;
    }

    .memory-test {
        @apply blur hover:blur-0;
    }
</style>