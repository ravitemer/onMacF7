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
    //get questions from firebase in a subject 
    async getQuestions({username=this.username,subject}){
        try {
            let questions = await this.db.getItem(`/plabable/${subject}`)
            return questions
        } catch (error) {
            throw error
        }
    }
    //get bookmarked questions from firebase in a subject
    async getBookmarkedQuestions({username=this.username,subject}){
        try {
            let [subjectData,allQs] = await Promise.all([
                this.db.getItem(`/Users/${username}/plabable/subjects/${subject}`),
                this.db.getItem(`plabable/${subject}`),
            ]) 
            let questions = subjectData.bookmarks || {};
            let bookmarkedQs = Object.entries(questions).map(([id,value])=> {
                // let isWrong = Object.values(q).filter(x => !x.isCorrect).length > 0;
              return {...allQs[id],id,bookmarked: value}   
            })
            // let questions = (await this.db.getItem(`/Users/${username}/plabable/subjects/${subject}/bookmarks`))
            return bookmarkedQs
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