<script>
import { data } from "dom7";


    import { onMount } from "svelte";
    export let question = {}
    let showAnswer = true
    onMount(() => {

    });
        
</script>
<div class="question-con">
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
    {#each Object.entries({A:question.A,B:question.B,C:question.C,D:question.D,E:question.E}) as [option,value],i}
         <div class="option">
            {value}
         </div>
    {/each}
</div>
{#if showAnswer}
    <div class="answer">
        {question.explanation}
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