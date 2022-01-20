import {writable,get} from "svelte/store";
import {Plabable, Snippet} from '../api'

export let subject = writable({
 title : "ANATOMY",
 materials : {}
});
export let user = writable({
    username : "ravitemer",
});
export let subjects = writable({})

 export let plab = new Plabable({username: "ravitemer"});

 export let plabable = writable({
  subjects : plab.subjects,
  });
plab.getSubjects().then(
    async (subjects) => {
      plabable.set({subjects})
      let userval = get(user);
      console.log(userval);
      let currentSubject = await plab.db.getItem(`Users/${userval.username}/Plabable/currentSubject`)
      if (!currentSubject) {
        currentSubject = subjects[0].title
        await plab.db.setItem(`Users/${userval.username}/Plabable/currentSubject`,currentSubject)  
      }
			subject.set(subjects.filter(sub => sub.title === currentSubject.toUpperCase().replace("&","").trim().split(" ").join("_"))[0])
      
		}	
)



