<script>
	//import {initAuth} from "./auth.js"
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

<!-- <div class="auth-con">

	<div class="email-con">
{#if providers.includes("email")}
<div class="input">
  <label for="email">Email</label>
  <input id="email" bind:value={email}/>
	</div>
<div class="input">
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
</div>
<div class="buttons">
{#each providers.filter(p => p !== "email") as provider,i (i)}
<button on:click={() => loginWithProvider(provider)}>
		Sign in with {provider.slice(0,1).toUpperCase() + provider.slice(1)}
	</button>	
{/each}
</div>
</div> -->
<div class="auth-con">
	<div class="header">

	</div>
	<!--  -->
	<div class="providers">

	</div>
	<!--  -->
	<div class="divide-text">

	</div>
	<!--  -->
	<div class="inputs-con">
		<div class="inputbox">

		</div>
		<div class="input-foot">

		</div>
	</div>
	<!--  -->
	<div class="submitbutton">
		SignIn
	</div>
</div>

<style lang="postcss">
	.auth-con {
		@apply min-h-full min-w-full absolute bg-gray-200 text-black p-8;
	}
	.submitbutton {
		
	}
</style>