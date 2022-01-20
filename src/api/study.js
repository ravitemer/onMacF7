import {FirebaseDB  } from "./firebase";

export class Revision {
  constructor({ username }) {
    this.db = new FirebaseDB();
    this.username = username;
    this.subjects = [];
  }

  async getTodayGems({subject,username=this.username}={}) {
    try {
        let today = new Date().toDateString().split(" ").join("_");
        let gems = await this.db.getItem(`Users/${username}/revision/gems/dates/${today}`)
        return Object.values(gems)
    } catch (error) {
        throw error
        }
  }
}