<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, onMounted } from "vue";
const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();
const formData = reactive({
  name: "",
  password: "",
});
onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Login to your account</h1>
    <form
      class="w-1/2 mx-auto space-y-6"
      @submit.prevent="authenticate('login', formData)">
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
      <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
