<script>
import { onMount } from 'svelte';
import {f7,Popup, Page,NavLeft,NavRight,Navbar,NavTitle,Link} from "framework7-svelte"
export let subject = "Anatomy";
export let username = "ravitemer";
import Question from './Question.svelte';
import Gem from './Gem.svelte';
import { FirebaseDB,Plabable} from "../api";

//svg url to show on card
// let url = "https://cdn-icons-png.flaticon.com/512/6643/6643396.png";  
//random number generator
let random = 6643396 ;
let x = 0
function driveUrl(id = "") {
		return `https://drive.google.com/uc?export=download&id=${id}`;
	}
let url  = () => {
    x++ 
    console.log(x)
    return `https://cdn-icons-png.flaticon.com/512/6643/${random + Math.floor(Math.random() * 10)}.png`;};
let materials = [
  {index:1,title:"Plabable",icon:"person",url:url()},
    {index:2,title:"Plabverse",icon:"bookmark",url:url()},
    {index:3,title:"Plab Keys",icon:"person",url:url()},
]

$: questionBanks = [
    {index:1,title:"Plabable",icon:"person",url:url()},
        {index:2,title:"Bookmarks",icon:"bookmark",url:url()},
        {index:3,title:"Gems",icon:"person",url:url()},
        {index:3,title:"Wrong",icon:"wrong",url:url()},
    ]

let plabable = new Plabable({username});
let tailwindColors = ["bg-red-400","bg-green-400","bg-blue-400","bg-indigo-400","bg-purple-400","bg-pink-400"]
let tailwindTextColors = ["text-red-500","text-green-500","text-blue-500","text-indigo-500","text-purple-500","text-pink-500"]
let wrongQuestions = [];
let allQuestions = [];
let bookmarkedQuestions = [];

let currentIndex = 0;
let normalQIndex = 0
let bookmarkIndex = 0
function onQBankClick(item){
 console.log(item.popup.instance().open())
}
function onMaterialClick(item){
 console.log(item.popup.instance().open())
}
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

<div class="block-title-medium mx-4 mt-4">
Materials
</div>
<div class="HStack">
  {#each materials as item, i  (i)} 
  <div on:click={() => onMaterialClick(item)} class="card-con">
    <div  style="background-image: url({item.url});" class="card link {tailwindColors[i]}">
    </div>
    <div class="card-stats">
        <div class="card-subtitle {tailwindTextColors[i]}">
            
        </div>
        <div class="card-title link">
            {item.title}
            </div>
    </div>

       </div>
       <Popup bind:this={item.popup}>
        <Page>
            <Navbar noHairline noShadow>
                <NavTitle>
                    {item.title}
                </NavTitle>
                <NavRight>
                    <Link popupClose>Close</Link>
                </NavRight>
            </Navbar>
            <iframe title="pdf" src={`https://drive.google.com/file/d/${item.driveId}/preview`} width="100%" height="100%" />
        </Page>
    </Popup>
  {:else}
       <div class="card">
           No Materials
       </div>
  {/each}
</div>

<!-- <Question question={bookmarkQuestion}/>
    <Question question={plabQuestion}/>
    <Gem  {subject}/>
    <Question {question}/> -->

<div class="block-title-medium mx-4 mt-4">
Questions
    </div>
    <div class="HStack">
      {#each questionBanks as item, i  (i)} 
      <div on:click={() => onQBankClick(item)} class="card-con">
        <div  style="background-image: url({item.url});" class="card link {tailwindColors[i+3]}">
        </div>
        <div class="card-stats">
            <div class="card-subtitle {tailwindTextColors[i + 3]}">
                {item.title}
            </div>
            <div class="card-title link">
                {item.title}
                </div>
        </div>
        
      </div>
           
           <Popup bind:this={item.popup}>
            <Page>
                <Navbar>
                    <NavTitle>
                        {item.title}
                    </NavTitle>
                    <NavRight>
                        <Link popupClose>Close</Link>
                    </NavRight>
                </Navbar>
                {#if item.title == "Plabable"}
                <Question question={plabQuestion}/>
                {:else if item.title == "Bookmarks"}
                <Question question={bookmarkQuestion}/>
                {:else if item.title == "Gems"}
                <Gem  {subject}/>
                {:else}
                <Question {question}/>
                {/if}
            </Page>
        </Popup>
      {:else}
           <div class="card">
               No Question Banks
           </div>
      {/each}
    </div>

    <!--Framework7 Popup svelte-->
    

    
    
    
    
    

</div>






<style lang='postcss'> 
    .container {
        @apply h-full w-full overflow-y-scroll;
    }
    .HStack{
        @apply overflow-x-scroll w-full  flex  p-4;
    }
    .card {
        @apply md:w-1/3 w-44 p-4 max-w-md h-24 bg-contain bg-center bg-no-repeat bg-blend-multiply flex items-center justify-center flex-shrink-0 text-xl rounded-xl font-medium  md:rounded-2xl border overflow-hidden break-all border-zinc-800 m-0; 
    }
    .card-con {
        @apply flex flex-col justify-center items-start mr-4 gap-1;
    }
    .card-stats {
        @apply flex flex-col justify-center items-start;
    }
    .card-subtitle {
        @apply text-sm font-semibold;
    }
    .card-title {
        @apply text-center text-lg font-medium;
    }
</style>
