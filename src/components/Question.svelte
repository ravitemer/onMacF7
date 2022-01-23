<script>
    import { onMount } from "svelte";
    import Google from './google.svelte';
    export let question = {}
    let showAnswer = true
    onMount(() => {

    });
    $: options = {A:question.A,B:question.B,C:question.C,D:question.D,E:question.E}
        
</script>
<div class="question-con">
    {#if question.question}
    <div class="buttons">
    <button class="button" on:click={() => question = question.prev()}> 
        Prev Question
    </button>
    <button class="button" on:click={() => question = question.next()}> 
        Next Question
    </button>

</div>
<div class="question">
    {question.question}
</div>
<div class="options">
    {#each Object.entries(options) as [option,value],i}
         <div class="option">
            {value}
         </div>
    {/each}
</div>
{#if showAnswer}
<Google queries={Object.values(options)}/>
    <div class="answer">
        {question.explanation}
    </div>
{/if}

{:else}
    <div class="question text-xl text-center">
        No Questions
    </div>
{/if}

</div>


<style lang="postcss">
    .question-con {
        @apply flex flex-col p-4 gap-4;
    }
    .question {
     @apply text-base md:text-xl  font-semibold
    }
    .options {
        @apply flex flex-wrap flex-col gap-4  justify-center  m-2;
    }
    .option {
        @apply text-base md:text-xl  ;
    }
    .answer {
    
        @apply text-base text-sm   ;
    }
    .buttons {
        @apply flex flex-row justify-center;
    }
    .button {
        @apply text-green-600 text-base md:text-xl  ;
    }
</style>