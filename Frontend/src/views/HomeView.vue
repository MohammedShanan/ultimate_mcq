<script setup>
import { useIndexStore } from "@/stores/Quiz/quiz";
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRoute } from "vue-router";

// Store imports
const { getQuizzes, deleteQuiz, goToRoute } = useIndexStore();
const { user } = useAuthStore();
const currentUserName = user ? user.name : ""; // Current logged-in user

// Reactive data
const quizzes = ref([]);
const route = useRoute();

// Function to fetch quizzes with try/catch
const loadQuizzes = async () => {
  try {
    quizzes.value = await getQuizzes(); // Fetch quizzes
  } catch (error) {
    console.error("Failed to load quizzes:", error);
    alert("There was an error fetching the quizzes. Please try again.");
  }
};

// Load quizzes on component mount
onMounted(() => {
  loadQuizzes(); // Trigger fetching of quizzes when mounted
});

// Watch for route changes to reload quizzes
watch(
  () => route.fullPath,
  () => {
    loadQuizzes(); // Reload quizzes when the route changes
  },
  { immediate: true } // Trigger immediately on mount
);
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">
        Available Quizzes
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Quiz Card -->
        <div
          v-for="quiz in quizzes"
          :key="quiz.id"
          class="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
          <div>
            <!-- Quiz Title -->
            <h2 class="text-lg font-bold text-gray-800 mb-2">
              {{ quiz.title }}
            </h2>

            <!-- Quiz Creator -->
            <p class="text-sm text-gray-600">
              Created by:
              <span class="font-semibold">{{ quiz.user.name }}</span>
            </p>
          </div>

          <!-- Action Buttons -->
          <div
            v-if="quiz.user.name === currentUserName"
            class="mt-4 flex justify-between items-center">
            <RouterLink
              :to="{ name: 'edit', params: { id: quiz.id } }"
              class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-center cursor-pointer">
              Edit
            </RouterLink>
            <RouterLink
              :to="{ name: 'show', params: { id: quiz.id } }"
              class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 text-center cursor-pointer">
              Take Quiz
            </RouterLink>
            <button
              @click="deleteQuiz(quizzes, quiz.id)"
              class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>

          <!-- "Take Quiz" Button for Non-Creators -->
          <div v-else class="mt-4 text-center">
            <RouterLink
              :to="{ name: 'show', params: { id: quiz.id } }"
              class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 text-center cursor-pointer">
              Take Quiz
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
