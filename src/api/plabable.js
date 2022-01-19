import { FirebaseDB} from "./firebase";

export class Plabable {
    constructor({username}) {
        this.db = new FirebaseDB()
        this.username = username
        this.subjects = {}
       }
    async getSubjects() {
        try {
            let subjects = await this.db.getItem(`/Users/${this.username}/plabable/subjects`)
            this.subjects = subjects
            return subjects
        } catch (error) {       
            throw error
        }   
    }




       async  getWrongQuestions({username=this.username,subject}){
        let [subjectData,allQs] = await Promise.all([
            this.db.getItem(`/Users/${username}/plabable/subjects/${subject}`),
            this.db.getItem(`plabable/${subject}`),
        ]) 
        let questions = subjectData.questions;
        // filter questions by !isCorrect
        let wrongQs = questions.reduce((res,q,i) => {
            let isWrong = Object.values(q).filter(x => !x.isCorrect).length > 0;
            return isWrong ? {...res,...{
                [i]: {...q,id: i}
            }} : res;
        },{})
        wrongQs = Object.keys(wrongQs).map(x => ({...allQs[x],userAnswers : wrongQs[x],id: wrongQs[x].id}));
      return wrongQs;
    }
    
}