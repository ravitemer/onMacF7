<script>
    import { onMount } from "svelte";
    import {Popup, Page, Navbar} from "framework7-svelte";
    export let question = {}
    let showAnswer = true
    const search = (term) => `https://www.google.com/search?q=${term}&igu=1`;
    onMount(() => {

    });
    $: options = {A:question.A,B:question.B,C:question.C,D:question.D,E:question.E}
    let currentQuery = ""
    let popup;
    $: src = `https://www.google.com/search?q=${currentQuery}&igu=1`;
    function onInfoClick(query) {
        currentQuery = query;
        popup.instance().open()

    }        
</script>
<Popup bind:this={popup} class='option-popup'>
    <Page>
     <iframe class="option-iframe" title="Option-popup" {src}></iframe>
    </Page>
</Popup>
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
        <div class="option-value link">
          {option}
          </div>
          <div class="option-label">
        {value}
          </div>
          <div on:click={() => onInfoClick(value)} class="option-info">
            <i class="f7-icons  link text-color-primary">info_circle</i>
          </div>
        
          </div>
        
    {/each}
</div>
{#if showAnswer}
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
        @apply w-full flex justify-start p-3 border rounded-2xl border-zinc-600 items-center; 
    }
    .option-value {
        @apply flex-shrink-0  flex items-center justify-center w-8 h-8 mr-4  font-semibold text-xl rounded-full bg-zinc-700  ; 
    }
    .option-label {
        @apply text-center text-sm font-medium flex-shrink text-ellipsis truncate;
    }
    .option-info {
        @apply text-sm font-medium ml-auto;
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