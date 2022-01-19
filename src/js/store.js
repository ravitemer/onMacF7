import {writable} from "svelte/store";
import {Plabable, Snippet} from '../api'

export let subject = writable({
 title : "Anatomy",
});
export let user = writable({
    username : "ravitemer",
});

 let plab = new Plabable({username: "ravitemer"});
await plab.getSubjects()


export let plabable = writable({
subjects : plab.subjects,
});
