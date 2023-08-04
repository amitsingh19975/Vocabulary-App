<div class="h-full flex justify-center items-center">
    <Card>
        <div class="p-4 px-8 w-[25rem] flex gap-4 flex-col">
            <Input
                label="Amount of Words"
                placeholder="Words to be quizzed"
                class="text-sm"
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                type="number"
                hint="like 20, 15, ..."
                step="1"
                bind:value={amountOfWords}
                bind:error={amountOfWordsError}
            />
            <Input
                label="Random Seed"
                placeholder="Randomize words"
                class="text-sm"
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                hint="like 'my awesome seed', '12312', ..."
                bind:value={randomSeed}
                bind:error={randomSeedError}
            />
            <Input
                label="% of history"
                placeholder="Percentage of history to be reused"
                class="text-sm" 
                labelClass="text-[0.7em]"
                wrapperClass="py-1"
                type="number"
                step="any"
                hint="like 20, 15, ..."
                bind:value={historyPercentage}
                bind:error={historyPercentageError}
            />
        </div>
        <div slot="footer">
            <Button expand fill="solid" on:click={onQuizStartClick}>
                Quiz Me
            </Button>
        </div>
    </Card>
</div>

<script lang="ts">
    import Card from '$lib/components/card.svelte';
    import Input from '$lib/components/input.svelte';
    import Button from '$lib/components/button.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

    let amountOfWords = '20';
    let randomSeed: string | undefined = undefined;
    let historyPercentage: string = '20';

    let amountOfWordsError = '';
    let randomSeedError = '';
    let historyPercentageError = '';

    function onQuizStartClick() {
        const query = new URLSearchParams({
            amt_words: amountOfWords,
            seed: randomSeed ?? '',
            history_percentage: historyPercentage,
        });
        goto(`${base}/quiz-mode/quiz?${query.toString()}`);
    }

</script>