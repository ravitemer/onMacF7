<script>
	//import {initAuth} from "./auth.js"
	export let loginWithProvider = () => {}
	export let loginWithEmailPassword = () => {}
	export let signUp = () => {}
	export let providers = [{title: "google" ,logo:"logo_google",color:"#4285f4"},
							{title: "facebook" ,logo:"logo_facebook",color:"#3b5998"},
							{title: "twitter",logo:"logo_twitter",color:"#55acee"},
							{title:"github",logo:"logo_github",color:"#333"}]	
	let email = ""
	let password = ""
	let icons = {
		"google" : "google_logo",
		"github" : "github_logo",
		"twitter" : "twitter_logo",
	}
	let isSignUp = false
</script> 
<div class="auth-con">
	<div class="header">
	  <img class="header-img" src="https://picsum.photos/300" />
	  <div class="header-text">
		{isSignUp ? "Create " : "Sign in to"} your account
		<div on:click={() => isSignUp = true } class="header-subtitle">Or <span  class="link a"> start your 14 day trail</span></div>
	  </div>
	</div>
  
	<!--  -->
	<div class="inputs-con">
	  <div class="inputbox">
		  <div class="input-con">
		  <label class="input-label">Email address</label>
		  <input class="input" type="email" bind:value={email}/>
		</div>
		<div class="input-con">
		  <label for="d" class="input-label">Password</label>
		  <input class="input" type="password" bind:value={password}/>
		</div>
	  </div>
	  <div class="input-foot">
		<div class="a forgot">Forgot your password?</div>
	  </div>
	  <div on:click={() => loginWithEmailPassword(email,password)} class="signin">Sign in</div>
  
	  <div class="divider">Or continue with</div>
	  <div class="providers">
		  {#each providers as provider}
		  <div class="provider" on:click={() => loginWithProvider(provider.title) }>
			<i class="f7-icons" >logo_{provider.logo}</i>
		  </div>
		  {/each}
	  </div>
	</div>
  </div>
  
<style lang="postcss">

.auth-con {
  @apply w-full h-full absolute bg-gray-100 flex flex-col py-6 space-y-10 items-center;
}
.header {
  @apply flex flex-col items-center justify-center space-y-4;
  
}
.header-img {
  @apply w-12 h-12 rounded-bl-3xl rounded-br-2xl rounded-tr-3xl;
}
.header-text {
  @apply text-2xl font-extrabold;
}
.header-text .header-subtitle {
  @apply text-sm font-normal text-center;
}
.header-text .header-subtitle .a {
  @apply text-purple-600 text-sm font-semibold;
}

.providers {
  @apply flex justify-center space-x-4 ;
}
.provider {
  @apply text-zinc-500 flex items-center justify-center flex-shrink-0 flex-auto h-10 border-[1px] border-gray-300 shadow rounded-lg;
}
.divider {
  @apply text-center text-gray-500 py-4  text-sm;
}
.inputs-con {
@apply shadow w-full bg-gray-50 p-6 max-w-md rounded-xl;
}
.inputbox {
  @apply mb-2 space-y-3;
}
.input-foot{
  @apply my-2 text-right text-sm text-purple-600;
}
.input-con {
  @apply flex flex-col items-start;
}
.input-label {
  @apply text-gray-500  font-semibold text-sm my-1;
}
.input {
  @apply appearance-none rounded-md border-gray-600 shadow h-10 w-full;
}
.signin {
  @apply w-full bg-purple-600 text-center text-white py-1.5 my-6 h-10 flex items-center justify-center font-semibold rounded-md;
}

</style>