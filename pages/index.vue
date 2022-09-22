<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";

const router = useRouter()
const goQuizListPage = () => router.push("/quiz/")
</script>

<template >
  <div class="pt-16 d-flex justify-center">
    <v-btn  class="primary-button " @click="goQuizListPage">クイズ一覧へ</v-btn>
  </div>
</template>