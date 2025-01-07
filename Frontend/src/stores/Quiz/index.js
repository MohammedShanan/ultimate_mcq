import { defineStore } from "pinia";

export const useIndexStore = defineStore("indexStore", {
  state: () => {
    return {
      quizzes: [],
    };
  },
  actions: {
    async getQuizzes() {
      const res = await fetch("api/quizzes");
      const data = await res.json();
    //   console.log(data);
      return data;
    },
    // Function to handle delete action
    deleteQuiz(quizId) {
      if (confirm("Are you sure you want to delete this quiz?")) {
        this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
        alert("Quiz deleted successfully.");
      }
    },
  },
});
