import { defineStore } from "pinia";
import { data } from "autoprefixer";
export const useShowStore = defineStore("showStore", {
  state: () => {
    return { result: false, score: 0 };
  },
  actions: {
    async getQuiz(id) {
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();
      return data;
    },
    // Submit Quiz Logic
    submitQuiz(quiz, userAnswers) {
      // Simulate processing answers (API call will replace this)
      let answer = "";
      quiz.questions.forEach((question, index) => {
        answer = question.answers[userAnswers[index]];
        if (answer && answer.is_correct) {
          this.score += 1;
        }
      });
      console.log(this.score);
      alert("Quiz submitted! Check the console for details.");
      this.result = true;
    },
  },
});
