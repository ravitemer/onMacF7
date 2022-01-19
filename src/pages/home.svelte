<Page  name="home">
  <!-- Top Navbar -->
  <Navbar noHairline  sliding={false}>
    <NavLeft>
      <span class='ml-w logo'>{$subject.title}</span>
    </NavLeft>
    <NavRight>
      <Link  popupOpen=".popup-subjects"><i class="f7-icons text-slate-400">arrow_swap</i></Link>
    </NavRight>
      <!-- <Searchbar class="searchbar-demo" expandable bind:value={searchBarValue} customSearch onInput="{onSearchBarChange}"/> -->
  </Navbar>
{#key $subject.title}
<Custom {...custom}/>
{/key}
  
  <!-- Toolbar -->
  <Toolbar bottom>
    <i class="f7-icons m-1 size-22 text-rose-400">house_fill</i>
    <i class="f7-icons text-slate-400">logo_apple</i>

    <i class="f7-icons text-slate-400">cat</i>
    <i class="f7-icons text-slate-400">pencil</i>
    <i class="f7-icons text-slate-400">logo_github</i>


  </Toolbar>
  <!--svelte each block for categories-->
  <Popup swipeToClose push bind:this={popup} class="popup-subjects">
     <Page>
        <Navbar title="Subjects" sliding={false}>
        </Navbar>
        <List inset>
          {#each Object.entries($plabable.subjects) as [sub,value],i}
          <ListItem title={sub} href="#" onClick={ async () => await changeSubject(sub)} />
          {/each}
        </List>
     </Page>
  </Popup>

  
</Page>
<script>
  import {onMount} from "svelte";
  import { Snippet} from '../api'
  import {subject,user,plabable} from '../js/store'
  import Custom from '../components/Custom.svelte'
  import {
    Page,
    Popup,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Fab,
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
  $ : custom = {
     subject : $subject.title,
  }
  let popup 
   async function changeSubject(sub){
    $subject = {title:sub}
    if (popup){
      popup.instance().close()
    }
    
  }


  let colors = ["bg-red-400","bg-orange-400","bg-yellow-400","bg-green-400","bg-teal-400","bg-blue-400","bg-indigo-400","bg-purple-400","bg-pink-400"]
</script>
<style>

  .logo {
    @apply font-bold font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600;
  }

/*apply horizontal tailwind grid scroll to .horizontal-scroll-view*/


/*horizontal scrolling div*/
  
    .horizontal-scroll-view {
      @apply w-full flex overflow-x-scroll;
    }
    .card {
width: 161px;
height: 157px;

flex-shrink: 0;
background: #ED6949;
border-radius: 30px;
    }


</style>
