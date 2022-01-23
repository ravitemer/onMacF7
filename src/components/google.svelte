<script>
    import { Link } from "framework7-svelte";
    export let value = 'hello'
    $: src = `https://www.google.com/search?q=${value}&igu=1`;
    const search = (term) => `https://www.google.com/search?q=${term}&igu=1`;
    let items = [
        "Apple",
        "Banana",
        "Orange",
        "Watermelon",
        "Pear",
    ]
</script>

<div class='hstack'>
{#each items as item}
<div class="iframe-con">
    <iframe seamless src={search(item)} title='Google iframe'/>
    <Link  class="external absolute bottom-4 right-4 " href={search(item)}>
     <div class='bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full f7-icons bg-color-primary text-white'>link</div>
   </Link>
   </div>   
{:else}
<div class="iframe-con">
    <iframe seamless src={search("")} title='Google iframe'/>
    <Link  class="external absolute bottom-4 right-4 " href={src}>
     <div class='bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full f7-icons bg-color-primary text-white'>link</div>
   </Link>
   </div>
   
{/each}
</div>

<style lang="postcss">
 .iframe-con {
      @apply bg-gray-800 h-full w-6/12  snap-center rounded-3xl relative flex-shrink-0 ml-4;
 }
 iframe {
        @apply w-full h-full border-0;
 }
 .hstack {
    @apply h-3/4 w-full flex overflow-scroll snap-x snap-mandatory;
 }
</style>