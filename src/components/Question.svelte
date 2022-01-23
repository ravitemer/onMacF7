<script>
    import { onMount } from "svelte";
    import {f7,Popup, Page, Navbar} from "framework7-svelte";
    export let question = {}
    let showAnswer = true
    const search = (term) => `https://www.google.com/search?q=${term}&igu=1`;
    onMount(() => {

    });
    $: options = {A:question.A,B:question.B,C:question.C,D:question.D,E:question.E}
    let currentQuery = ""
    let popup;
    let iframeHTML = ""
    function onInfoClick(query) {
        currentQuery = query;
        iframeHTML = `<iframe src="https://www.google.com/search?q=${currentQuery}&igu=1" style="width:100%;height:100%;border:none;"></iframe>`
        if (false) {
        popup = f7.popup.create({
            content: `
            <div class="popup">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-inner">
                            <div class="title">${query}</div>

                        </div>
                        <div class="right">
                                <a href="#" class="link popup-close">Close</a>
                            </div>
                    </div>
                    <div class="page-content">
                        <iframe src="https://www.google.com/search?q=${query}&igu=1" style="width:100%;height:100%;border:none;"></iframe>
                    </div>
                </div>
            `,
            cssClass: 'popup-iframe',
            backdrop: true,
            animate: true,
            closeByBackdropClick: true,
            closeByOutsideClick: true,
            push : true,
            swipeToClose: "to-bottom",
            on: {
                open: () => {
                    console.log('Popup opened');
                },
                opened: () => {
                    console.log('Popup opened');
                },
                close: () => {
                    console.log('Popup closed');
                },
                closed: () => {
                    // popup.destroy();
                }
            }
        });}

        popup.instance().open()

    }        
</script>
<Popup  push swipeToClose closeByBackdropClick closeOnEscape bind:this={popup}>
    <Page>
        <Navbar title={currentQuery} sliding>
            <div class="right">
                <a href="#" class="link popup-close">Close</a>
            </div>
        </Navbar> 
        {#if !!currentQuery}
         {@html iframeHTMl}
        {/if}
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