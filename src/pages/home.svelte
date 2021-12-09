<Page name="home">
  <!-- Top Navbar -->
  <Navbar noHairline  sliding={false}>
    <NavLeft>
      <span class='ml-w logo'>Snippets</span>
    </NavLeft>

  </Navbar>
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
  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button
  } from 'framework7-svelte';
</script>
<style>

  .logo {
    @apply font-bold font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600;
  }
</style>