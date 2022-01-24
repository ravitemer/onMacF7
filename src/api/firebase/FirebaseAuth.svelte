<!-- Auth.svelte -->

<script>

	import {onMount } from "svelte"
		import {initAuth} from "./auth.js"
	const {user,loginWithEmailPassword,loginWithProvider,signUp,logout} = initAuth({useRedirect:false})

</script>

<!-- we will expose all required methods and properties on our slot -->
<div>
  <slot {loginWithProvider} user={$user} {loginWithEmailPassword} {logout} {signUp}/>
</div>