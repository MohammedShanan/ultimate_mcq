<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCreateStore } from "@/stores/Quiz/create";
import { useShowStore } from "@/stores/Quiz/show";
import { useRoute } from "vue-router";
const { addQuestion, removeQuestion, addAnswer, removeAnswer, UpdateQuiz } =
  useCreateStore();
const { getQuiz } = useShowStore();
const route = useRoute();
// Reactive state for the quiz
const quiz = reactive({
  title: "",
  questions: [
    {
      question_text: "",
      answers: [
        { answer_text: "", is_correct: false },
        { answer_text: "", is_correct: false },
        { answer_text: "", is_correct: false },
        { answer_text: "", is_correct: false },
      ],
      correctAnswer: 0, // Index of the correct answer
    },
  ],
});
onMounted(async () => {
  const fetchedQuiz = await getQuiz(route.params.id);
  Object.assign(quiz, fetchedQuiz);
});
</script>

<template>
  <main>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-semibold text-gray-700 mb-6">Edit Quiz</h1>

      <form @submit.prevent="UpdateQuiz(route.params.id, quiz)">
        <!-- Quiz Title -->
        <div class="mb-6">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Quiz Title</label
          >
          <input
            type="text"
            id="title"
            v-model="quiz.title"
            placeholder="Enter quiz title"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Questions -->
        <div
          v-for="(question, questionIndex) in quiz.questions"
          :key="questionIndex"
          class="mb-8 border-t pt-4">
          <div class="flex justify-between items-center mb-4">
            <label
              :for="'question_' + questionIndex"
              class="block text-sm font-medium text-gray-700">
              Question {{ questionIndex + 1 }}
            </label>
            <button
              type="button"
              @click="removeQuestion(quiz, questionIndex)"
              class="text-red-500 hover:text-red-700 text-sm">
              Remove
            </button>
          </div>
          <input
            type="text"
            :id="'question_' + questionIndex"
            v-model="question.question_text"
            placeholder="Enter question text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4" />

          <!-- Answers -->
          <div
            v-for="(answer, answerIndex) in question.answers"
            :key="answerIndex"
            class="flex items-center mb-2">
            <input
              type="text"
              v-model="answer.answer_text"
              placeholder="Enter answer text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mr-2" />
            <label class="flex items-center">
              <input
                type="radio"
                :name="'correct_answer_' + questionIndex"
                v-model="question.correctAnswer"
                :value="answerIndex"
                :checked="answer.is_correct"
                class="form-radio h-4 w-4 text-blue-500 focus:ring-blue-500" />
              <span class="ml-2 text-sm text-gray-600">Correct</span>
            </label>
            <button
              type="button"
              @click="removeAnswer(quiz, questionIndex, answerIndex)"
              class="text-red-500 hover:text-red-700 text-sm ml-2">
              Remove
            </button>
          </div>

          <!-- Add Answer Button -->
          <button
            type="button"
            @click="addAnswer(quiz, questionIndex)"
            class="text-blue-500 hover:text-blue-700 text-sm">
            + Add Answer
          </button>
        </div>

        <!-- Add Question Button -->
        <button
          type="button"
          @click="addQuestion(quiz)"
          class="mb-6 text-blue-500 hover:text-blue-700 text-sm">
          + Add Question
        </button>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
          Update Quiz
        </button>
      </form>
    </div>
  </main>
</template>
