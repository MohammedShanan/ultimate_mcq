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
    async deleteQuiz(quizzes, quizId) {
      if (confirm("Are you sure you want to delete this quiz?")) {
        const res = await fetch(`api/quizzes/${quizId}`, {
          method: "delete",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Quiz deleted successfully.");
        window.location.reload(); // Reload the page after the alert
      }
    },
    goToRoute(routeName, quizId) {
      this.router.push({ name: routeName, params: { id: quizId } });
    },
  },
});
