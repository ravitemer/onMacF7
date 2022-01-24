<script>
	import {initAuth} from "./auth.js"
	export let loginWithProvider = () => {}
		export let loginWithEmailPassword = () => {}
			export let signUp = () => {}
export let providers = []
let email = ""
let password = ""
let icons = {
	"google" : "google_logo",
		"github" : "github_logo",
		"twitter" : "twitter_logo",
}

</script>

{#if providers.includes("email")}
<div>
  <label for="email">Email</label>
  <input id="email" bind:value={email}/>
	</div>
<div>
  <label for="password">Password</label>
  <input id="password" bind:value={password}/>
	</div>
<button on:click={() => loginWithEmailPassword(email,password)}>
	  Signin
	</button>
<div>
	New member? Sign up instead!
</div>
<button on:click={() => signUp(email,password)}>
		SignUp
</button>	

{/if}

<div class="buttons">
{#each providers.filter(p => p !== "email") as provider,i (i)}
<button on:click={() => loginWithProvider(provider)}>
		Sign in with {provider.slice(0,1).toUpperCase() + provider.slice(1)}
	</button>	
{/each}
</div>
<style>
	.buttons {
		display : flex;
		flex-direction:column;
		
	}
</style>