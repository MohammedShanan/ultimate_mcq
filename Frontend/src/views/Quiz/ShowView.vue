<script setup>
import { useShowStore } from "@/stores/Quiz/show";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { result, score } = storeToRefs(useShowStore());
const { getQuiz, submitQuiz } = useShowStore();
// Mock quiz data
const quiz = ref({});
const route = useRoute();
let userAnswers = reactive([]);

// Load quiz data
const loadQuizData = async () => {
  quiz.value = await getQuiz(route.params.id);
  userAnswers = Array(quiz.value.questions.length).fill(null);
  result.value = false;
  score.value = 0;
};

// Initial load
onMounted(loadQuizData);

// Watch for route parameter changes
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadQuizData(); // Reload quiz data only if the ID changes
    }
  },
  { immediate: true } // Ensure it's called on mount as well
);
</script>
<template>
  <main>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div v-if="result" class="text-center mt-4">
        <h2 class="text-2xl font-bold text-gray-800">
          Your Score: {{ score + "/" + quiz.questions.length }}
        </h2>
      </div>
      <h1 v-else class="text-2xl font-semibold text-gray-700 mb-6">
        Take the Quiz
      </h1>

      <!-- Quiz Title -->
      <h2 class="text-xl font-bold text-blue-600 mb-4">{{ quiz.title }}</h2>

      <form @submit.prevent="submitQuiz(quiz, userAnswers)">
        <!-- Questions -->
        <div
          v-for="(question, questionIndex) in quiz.questions"
          :key="questionIndex"
          class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ questionIndex + 1 }}. {{ question.question_text }}
          </h3>

          <!-- Answer Options -->
          <div
            v-for="(answer, answerIndex) in question.answers"
            :key="answerIndex"
            class="mb-3"
            :class="{
              'bg-green-300': result && answer.is_correct,
              'bg-red-300':
                result &&
                userAnswers[questionIndex] === answerIndex &&
                !answer.is_correct,
              'bg-transparent': !result,
            }">
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                :name="'question_' + questionIndex"
                v-model="userAnswers[questionIndex]"
                :value="answerIndex"
                class="form-radio h-5 w-5 text-blue-500 focus:ring-blue-500" />
              <span class="ml-3 text-gray-700">{{ answer.answer_text }}</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          v-if="!result"
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Submit Quiz
        </button>
      </form>
    </div>
  </main>
</template>
