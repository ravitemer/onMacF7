<script>
import { onMount } from "svelte";
export let gem = {}
export let subject = "Anatomy"
onMount(() => {

});
export let index = 1;

function next(params) {
    index = index + 1
    
}
function prev(params) {
    index = index - 1
    
}
$: imageSrc = `https://res.cloudinary.com/aceoet/image/upload/pg_${index}/v1641878811/PLAB/Gems/${subject.toUpperCase().split(" ").join("_")}.jpg`

    
</script>

<div class="gem-con">
 <!-- Image tag -->
    <img class="gem-image" src={imageSrc} alt="">
    <div class="buttons">
        <button class="button" on:click={() => prev()}> 
            Prev Gem
        </button>
        <button class="button" on:click={() => next()}> 
            Next Gem
        </button>
    
    </div>

</div>


<style class="postcss">
    .gem-con {
     @apply m-4 gap-4 flex flex-col items-center justify-center;
    }
    .gem-image {
        @apply object-contain h-96 w-96 rounded-3xl;
        
    }
    .buttons {
        @apply flex flex-row justify-center;
    }
    .button {
        @apply text-green-600 text-base md:text-xl  ;
    }

</style>