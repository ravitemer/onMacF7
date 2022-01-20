<script>
import { onMount } from 'svelte';
import {f7,BlockTitle} from "framework7-svelte"
export let subject = "Anatomy";
export let username = "ravitemer";
import Question from './Question.svelte';
import Gem from './Gem.svelte';
import { FirebaseDB,Plabable} from "../api";
let items = [
  {index:1,title:"Plabable",icon:"person"},
    {index:2,title:"Plabverse",icon:"bookmark"},
    {index:3,title:"Plab Keys",icon:"person"},
]
let questionBanks = [
    {index:1,title:"Plabable",icon:"person"},
        {index:2,title:"Bookmarks",icon:"bookmark"},
        {index:3,title:"Gems",icon:"person"},
        {index:3,title:"Wrong",icon:"wrong"},
    ]

let plabable = new Plabable({username});
let tailwindColors = ["bg-red-400","bg-green-400","bg-blue-400","bg-indigo-400","bg-purple-400","bg-pink-400"]

let wrongQuestions = [];
let allQuestions = [];
let bookmarkedQuestions = [];

let currentIndex = 0;
let normalQIndex = 0
let bookmarkIndex = 0

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
$: bookmarkQuestion = {...bookmarkedQuestions[bookmarkIndex], next() {
  bookmarkIndex++;
  if(bookmarkIndex >= bookmarkedQuestions.length){
    bookmarkIndex = 0;
  }
  return bookmarkedQuestions[bookmarkIndex]

},
  prev() {
    bookmarkIndex--;
    if(bookmarkIndex < 0){
      bookmarkIndex = bookmarkedQuestions.length - 1;
    }
    return bookmarkedQuestions[bookmarkIndex]
  }
}
$: plabQuestion = {...allQuestions[normalQIndex], next() {
    normalQIndex++;
  if(normalQIndex >= allQuestions.length){
    normalQIndex = 0;
  }
  return allQuestions[normalQIndex]

},
  prev() {
    normalQIndex--;
    if(normalQIndex < 0){
        normalQIndex = allQuestions.length - 1;
    }
    return allQuestions[normalQIndex]
  }
}
onMount(async () => {
   wrongQuestions = await plabable.getWrongQuestions({subject:subject})
   allQuestions = await plabable.getQuestions({subject:subject})
   bookmarkedQuestions = await plabable.getBookmarkedQuestions({subject:subject})
   normalQIndex = await plabable.db.getItem(`Users/${username}/plabable/subjects/${subject}/index`) || 0
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
Questions
    </div>
    <div class="HStack">
      {#each questionBanks as item, i  (i)} 
           <div class="card link {tailwindColors[i]}">
    {item.title}
           </div>
      {:else}
           <div class="card">
               No Questions
           </div>
      {/each}
    </div>
    
<div class="block-title-large mx-4 mt-4">
    Bookmarks
        </div>
    <Question question={bookmarkQuestion}/>


<div class="block-title-large mx-4 mt-4">
    Plabable
        </div>
    <Question question={plabQuestion}/>

<div class="block-title-large mx-4 mt-4">
    Gems
        </div>
    <Gem/>
    

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
        @apply w-1/3 p-4 max-w-md min-w-max h-24  flex items-center justify-center flex-shrink-0 text-xl rounded-xl font-medium  md:rounded-2xl border overflow-hidden break-all border-zinc-800; 
    }
</style>
