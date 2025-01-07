import { defineStore } from "pinia";

export const useCreateStore = defineStore("createStore", {
  state: () => {
    return { name: "" };
  },
  actions: {
    // Function to add a new question
    addQuestion(quiz) {
      quiz.questions.push({
        question_text: "",
        answers: [
          { answer_text: "", is_correct: false },
          { answer_text: "", is_correct: false },
          { answer_text: "", is_correct: false },
          { answer_text: "", is_correct: false },
        ],
        correctAnswer: 0,
      });
    },
    // Function to remove a question
    removeQuestion(quiz, index) {
      quiz.questions.splice(index, 1);
    },

    // Function to add an answer to a specific question
    addAnswer(quiz, questionIndex) {
      quiz.questions[questionIndex].answers.push({
        answer_text: "",
        is_correct: false,
      });
    },
    // Function to remove an answer from a specific question
    removeAnswer(quiz, questionIndex, answerIndex) {
      quiz.questions[questionIndex].answers.splice(answerIndex, 1);
    },
    // Function to submit the quiz
    async submitQuiz(quiz) {
      try {
        // Prepare the payload
        const payload = {
          title: quiz.title,
          questions: quiz.questions.map((question) => ({
            question_text: question.question_text,
            answers: question.answers.map((answer, index) => ({
              answer_text: answer.answer_text,
              is_correct: index === question.correctAnswer,
            })),
          })),
        };

        // Simulate an API call (replace this with your actual API logic)
        console.log("Quiz submitted:", payload);
        alert("Quiz created successfully!");
        const res = await fetch("/api/quizzes", {
          method: "post",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log(data);
        this.router.push({ name: "home" });
      } catch (error) {
        console.error("Error creating quiz:", error);
        alert("Failed to create quiz. Please try again.");
      }
    },

    async UpdateQuiz(id, quiz) {
      try {
        // Prepare the payload
        const payload = {
          title: quiz.title,
          questions: quiz.questions.map((question) => ({
            question_text: question.question_text,
            answers: question.answers.map((answer, index) => ({
              answer_text: answer.answer_text,
              is_correct: index === question.correctAnswer,
            })),
          })),
        };

        // Simulate an API call (replace this with your actual API logic)
        console.log("Quiz submitted:", payload);
        alert("Quiz created successfully!");
        const res = await fetch(`/api/quizzes/${id}`, {
          method: "put",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log(data);
        // this.router.push({ name: "home" });
      } catch (error) {
        console.error("Error creating quiz:", error);
        alert("Failed to create quiz. Please try again.");
      }
    },
  },
});
