import {initializeApp} from 'firebase/app';
import {readable,writable} from "svelte/store"
import {getAuth,signInWithRedirect,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword} from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyDiHX-1gxvke-HIj6WGxuOWEkEl9K57xk0",
  authDomain: "test-558.firebaseapp.com",
  databaseURL: "https://test-558-default-rtdb.firebaseio.com",
  projectId: "test-558",
  storageBucket: "test-558.appspot.com",
  messagingSenderId: "712415353562",
  appId: "1:712415353562:web:233dae7162a314a420e3e3"
};
export const app = initializeApp(firebaseConfig)
let auth = getAuth(app) 
const userMapper = claims => ({
    id: claims.user_id,
    name: claims.name,
    email: claims.email,
    picture: claims.picture
  });

export function initAuth({useRedirect}={}){
async  function loginWithEmailPassword (email, password) 
{
	try {
		
		await  signInWithEmailAndPassword(auth,email, password);
		console.log("logging In ")
	} catch (e){
		console.log(e.message)
		throw e
	}
	  
} 
	
async 	function loginWithProvider(provider){
    const providers = {
			google : new GoogleAuthProvider
		}
try {
	if (useRedirect) {
					let currentProvider = providers[provider]
					
      return await signInWithRedirect(auth,currentProvider);
    } else {
			let currentProvider = providers[provider]
// 					currentProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      return await signInWithPopup(auth,currentProvider);
    }
} catch (e){
	console.log(e)
	throw e
}
    
  };

async	 function logout(){
	try {
				await signOut(auth);
				console.log("Logged Out")
	} catch (e){
		console.log(e)
		throw e
	}

	}
	async function signUp(email,password){
	try {
		console.log("signing Up")
await	createUserWithEmailAndPassword(auth,email,password)
		console.log("signed Up")
	} catch (e) {
		console.log(e.message)
		throw e
	}
}
 let user = readable(null,set => {
		  onAuthStateChanged(auth,async fireUser => {
    if (fireUser) {
      const token = await fireUser.getIdTokenResult();
      user = userMapper(token.claims);
			set(user)
    } else {
      user = null;
			set(user)
    }
  })
	
})
	return {
		user,
		signUp,
		logout,
		loginWithProvider,
		loginWithEmailPassword,
	}

}


