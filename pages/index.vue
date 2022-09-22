<script setup lang="ts">
import { useRouter } from "@nuxtjs/composition-api";

const router = useRouter()
const goQuizListPage = () => router.push("/quiz/")
</script>

<template >
  <div>
    <button @click="goQuizListPage">クイズ一覧へ</button>
  </div>
</template>