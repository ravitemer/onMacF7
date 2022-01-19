<script>
import {f7,BlockTitle} from "framework7-svelte"

let items = [
  {index:1,title:"Plabable",icon:"person"},
    {index:2,title:"Plabverse",icon:"bookmark"},
    {index:3,title:"Plab Keys",icon:"person"},
]
let tailwindColors = ["bg-red-400","bg-green-400","bg-blue-400","bg-indigo-400","bg-purple-400","bg-pink-400"]
</script>
<div class="container">

<div class="block-title-large mx-4 mt-4">
Materials
</div>
<div class="HStack">
  {#each items as item, i  (i)} 
       <div class="card {tailwindColors[i]}">
{item.title}
       </div>
  {:else}
       <div class="card">
           No Materials
       </div>
  {/each}
</div>


</div>






<style lang='postcss'> 
    .container {
        @apply h-full w-full;
    }
    .HStack{
        @apply overflow-x-scroll w-full  flex flex-shrink-0;
    }
    .card {
        @apply w-1/3 h-24 flex items-center justify-center flex-shrink-0 text-xl rounded-xl font-medium  md:rounded-2xl border border-zinc-800; 
    }
</style>
