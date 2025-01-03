<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();
const formData = reactive({
  name: "",
  password: "",
  password_confirmation: "",
});
onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>
    <form
      class="w-1/2 mx-auto space-y-6"
      @submit.prevent="authenticate('register', formData)">
      <div>
        <input type="text" placeholder="name" v-model="formData.name" />
        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password" />
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="confirm password"
          v-model="formData.password_confirmation" />
      </div>
      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
