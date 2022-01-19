<script>
import { onMount } from 'svelte';
import {f7,BlockTitle} from "framework7-svelte"
export let subject = "Anatomy";
export let username = "ravitemer";
import Question from './Question.svelte';
import { FirebaseDB,Plabable} from "../api";
let items = [
  {index:1,title:"Plabable",icon:"person"},
    {index:2,title:"Plabverse",icon:"bookmark"},
    {index:3,title:"Plab Keys",icon:"person"},
]
let plabable = new Plabable({username});
let tailwindColors = ["bg-red-400","bg-green-400","bg-blue-400","bg-indigo-400","bg-purple-400","bg-pink-400"]
let wrongQuestions = [];
let currentIndex = 0;
$: question = {...wrongQuestions[currentIndex], next() {
  currentIndex++;
  if(currentIndex >= wrongQuestions.length){
    currentIndex = 0;
  }
  return wrongQuestions[currentIndex]

},
  prev() {
    currentIndex--;
    if(currentIndex < 0){
      currentIndex = wrongQuestions.length - 1;
    }
    return wrongQuestions[currentIndex]
  }
}
onMount(async () => {
   wrongQuestions = await plabable.getWrongQuestions({subject:subject})
})



</script>
<div class="container">

<div class="block-title-large mx-4 mt-4">
Materials
</div>
<div class="HStack">
  {#each items as item, i  (i)} 
       <div class="card link {tailwindColors[i]}">
{item.title}
       </div>
  {:else}
       <div class="card">
           No Materials
       </div>
  {/each}
</div>

<div class="block-title-large mx-4 mt-4">
Revision
    </div>
<Question {question}/>

</div>






<style lang='postcss'> 
    .container {
        @apply h-full w-full overflow-y-scroll;
    }
    .HStack{
        @apply overflow-x-scroll w-full  flex flex-shrink-0;
    }
    .card {
        @apply w-1/3 h-24  flex items-center justify-center flex-shrink-0 text-xl rounded-xl font-medium  md:rounded-2xl border overflow-hidden break-all border-zinc-800; 
    }
</style>
