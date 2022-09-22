<script setup lang="ts">
import { ref,useRouter } from "@nuxtjs/composition-api";
import { quizRepository } from '~/api/repo/queries/quiz';
import { Quiz } from '~/types/graphql/schema';
import DataTable from "~/components/DataTable.vue";

const router = useRouter()
const quizzes = ref<Quiz[]>([])
const headers = [
  {
    text: 'カテゴリ',
    value: 'category.name'
  },
  {
    text: '名前',
    value: 'title',
  },
  {
    text: '問題',
    value: 'question'
  },
  {
    text: '',
    value: 'actions'
  },

]
const openQuizPage = (id: string) => router.push(`/quiz/${id}/`)
const getQuizzes = async () => {
  try {
    quizzes.value = await quizRepository.getQuizzes()
  } catch (err) {
    throw new Error("クイズの取得に失敗しました")
  }
}

getQuizzes()

</script>
    
<template >
  <div class="pt-16">
    <DataTable :headers="headers" :items="quizzes" :disable-hover-effect="true">
      <template #actions="{id}">
        <v-btn color="primary" @click="openQuizPage(id)">
          問題を解く
        </v-btn>
      </template>
    </DataTable>
  </div>
</template>