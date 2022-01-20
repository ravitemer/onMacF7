import {writable} from "svelte/store";
import {Plabable, Snippet} from '../api'

export let subject = writable({
 title : "Anatomy",
 materials : {}
});
export let user = writable({
    username : "ravitemer",
});
export let subjects = writable({})

 let plab = new Plabable({username: "ravitemer"});
 export let plabable = writable({
  subjects : plab.subjects,
  });

plab.getSubjects().then(
    (subjects) => {
      plabable.set({subjects})}
)



