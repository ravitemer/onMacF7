<script>
    import { Link } from "framework7-svelte";
    // $: src = `https://www.google.com/search?q=${value}&igu=1`;
    const search = (term) => `https://www.google.com/search?q=${term}&igu=1`;
    export let queries = [
    ]
</script>

<div class='hstack'>
{#each queries as item}
<div class="g-link">
    <!-- <iframe seamless lazy='true' src={search(item)} title='Google iframe'/> -->
    <Link  class="external bg-slate-900 space-x-2 m-1 px-2 py-1 rounded-3xl flex flex-wrap" href={search(item)}>
     <i style="font-size:20px;" class='flex items-center justify-center rounded-full f7-icons  text-color-primary'>link</i>
     <div class="text-lg truncate w-16 text-ellipsis ">{item}</div>
   </Link>
   </div>   
{:else}
<div class="iframe-con">
    <iframe seamless src={search("")} title='Google iframe'/>
    <Link  class="external absolute bottom-4 right-4 " href={search("")}>
     <div class='bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full f7-icons bg-color-primary text-white'>link</div>
   </Link>
   </div>
{/each}
</div>

<style lang="postcss">
 .iframe-con {
      @apply bg-gray-800 h-full md:w-9/12 w-max  overflow-hidden snap-center rounded-3xl relative flex-shrink-0 ml-4;
 }
 iframe {
        @apply w-full h-full border-0;
 }
 .hstack {
    @apply w-full min-w-max min-h-max flex flex-wrap items-center;
 }
</style>