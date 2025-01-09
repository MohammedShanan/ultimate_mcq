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

        console.log("Quiz submitted:", payload);
        const res = await fetch("/api/quizzes", {
          method: "post",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log(data);
        this.showNotification("Quiz created successfully!", "success");
        this.router.push({ name: "home" });
      } catch (error) {
        console.error("Error creating quiz:", error);
        this.showNotification("Failed to create quiz!", "error");
      }
    },

    async UpdateQuiz(id, quiz) {
      try {
        // quiz.questions.forEach((question) => {
        //   question.correctAnswer = question.answers.findIndex(
        //     (answer) => answer.is_correct === true
        //   );
        // });
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
        const res = await fetch(`/api/quizzes/${id}`, {
          method: "put",
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log(data);
        console.log("Quiz submitted:", payload);
        this.showNotification("Quiz Updated successfully!", "success");
        this.router.push({ name: "home" });
      } catch (error) {
        console.error("Error creating quiz:", error);
        this.showNotification("Failed to update quiz!", "error");
      }
    },
    showNotification(message, type) {
      // Create the notification element
      const notification = document.createElement("div");
      notification.textContent = message;
      notification.className = `fixed top-5 right-5 px-4 py-2 rounded-md shadow-md z-50 text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`;

      // Append to the body
      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    },
  },
});
