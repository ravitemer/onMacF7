<Page name="home">
  <!-- Top Navbar -->
  <Navbar noHairline  sliding={false}>
    <NavLeft>
      <span class='ml-w logo'>Snippets</span>
    </NavLeft>
    <NavRight>
      <Link searchbarEnable=".searchbar-demo"><i class="f7-icons text-slate-400">search</i></Link>
    </NavRight>
      <Searchbar class="searchbar-demo" expandable bind:value={searchBarValue} customSearch onInput="{onSearchBarChange}"/>


  </Navbar>

  <List>
    {#each filteredItems as {properties},i (i)}
       <ListItem title='{properties.title}'  after='{properties.category}'></ListItem>
    {:else}
       Emoty
    {/each}
    
  </List>
  <!-- Toolbar -->
  <Toolbar bottom>
    <i class="f7-icons m-1 size-22 text-rose-400">house_fill</i>
    <i class="f7-icons text-slate-400">logo_apple</i>

    <i class="f7-icons text-slate-400">cat</i>
    <i class="f7-icons text-slate-400">pencil</i>
    <i class="f7-icons text-slate-400">logo_github</i>


  </Toolbar>
  <!-- Page content -->
  
</Page>
<script>
  import {onMount} from "svelte";
  import {Snippet} from '../api'
  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Subnavbar,
    Searchbar,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button
  } from 'framework7-svelte';
  let searchBarValue = ""
  let snippet = new Snippet()
  let snippets = []
 
  $ : filteredItems = snippets
  function onSearchBarChange(e){
    //console.log(e.target.value);
    filteredItems = snippets.filter(snip => snip.properties.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)

  }
  onMount(async () => {
    snippets = await snippet.getAll()
  })
</script>
<style>

  .logo {
    @apply font-bold font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600;
  }
</style>