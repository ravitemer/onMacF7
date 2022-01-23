<script>
import { revision } from "../js/store";
import Question from "./Question.svelte";
import {onMount} from "svelte";
let todayQuestions = [];
let currentIndex = 0;
$: currentGem = todayQuestions[currentIndex] || {};
$: imageSrc = `https://res.cloudinary.com/aceoet/image/upload/pg_${currentGem.index}/v1641878811/PLAB/Gems/${currentGem.subject?.replace("&","").toUpperCase().split(" ").join("_")}.jpg`
let gemsOver = false
function next(params) {
    currentIndex++;
    if (currentIndex >= todayQuestions.length) {
      gemsOver = true;
    }
}
function prev(params) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = 0;
    }
}
onMount(async () => {
    todayQuestions = await revision.getTodayGems();
    console.log(todayQuestions);
});
</script>

<div class="gem-con">
    <!-- Image tag -->
    {#if !gemsOver}
       <img class="gem-image" src={imageSrc} alt="">
    {/if}
       <div class="buttons">
           <button class="button" on:click={() => prev()}> 
               Prev Gem
           </button>
           <button class="button" on:click={() => next()}> 
               Next Gem
           </button>
       
       </div>
   
   </div>
   

<!-- <Question question={todayQuestions[0]}/>     -->


<style lang="postcss">
    .gem-con {
        @apply m-4 gap-4 flex flex-col items-center justify-center;
       }
       .gem-image {
           @apply object-contain h-80 w-full rounded-3xl;
           
       }
       .buttons {
           @apply flex flex-row justify-center;
       }
       .button {
           @apply text-green-600 text-base md:text-xl  ;
       }
</style>