<script setup lang="ts">
import { ref } from "@nuxtjs/composition-api";
import {quizRepository} from '~/api/repo/queries/quiz';
import {quizCategoryRepository} from "~/api/repo/queries/category"
import {quizResultRepository} from "~/api/repo/queries/result"
import {userRepository} from "~/api/repo/queries/user"
import { Quiz, QuizCategory, QuizResult, User } from '~/types/graphql/schema';

const quizzes = ref<Quiz[]>([])
const quiz = ref<Quiz>()
const quizCategories = ref<QuizCategory[]>([])
const quizCategory = ref<QuizCategory>()
const quizResults = ref<QuizResult[]>([])
const quizResult = ref<QuizResult>()
const users = ref<User[]>([])
const user = ref<User>()

const getQuizzes = async () => {
  try {
    quizzes.value = await quizRepository.getQuizzes(true)
    console.log(quizzes.value)
  } catch(err) {
    throw new Error("クイズの取得に失敗しました")
  }
}

const getQuiz = async () => {
  try {
    quiz.value = await quizRepository.getQuiz("be8865db-e94e-4343-8b0c-56081874df38")
    console.log(quiz.value)
  } catch(err) {
    throw new Error("クイズの取得に失敗しました")
  }
}

const getQuizCategories = async () => {
  try {
    quizCategories.value = await quizCategoryRepository.getQuizCategories()
    console.log(quizCategories.value)
  } catch(err) {
    throw new Error("カテゴリの取得に失敗しました")
  }
}

const getQuizCategory = async() => {
  try{
    quizCategory.value = await quizCategoryRepository.getQuizCategoryById(2)
    console.log(quizCategory.value)
  } catch(err) {
    throw new Error("カテゴリの取得に失敗しました")
  }
}

const getQuizResults = async () => {
  quizResults.value = await quizResultRepository.getQuizResults()
  console.log(quizResults.value)
}

const getQuizResult = async () => {
  quizResult.value = await quizResultRepository.getQuizResultById(1)
  console.log(quizResult.value)
}

const getUsers = async () => {
  users.value = await userRepository.getUsers()
  console.log(users.value)
}

const getUser = async () => {
  user.value = await userRepository.getUserById("2c1bf16b-483d-4370-805f-6ff99361f747")
  console.log(user.value)
}
</script>

<template >
  <div>

    <button @click="getQuizzes">クイズ一覧取得</button>
    <br />
    <button @click="getQuiz">クイズ取得</button>
    <br />
    <button @click="getQuizCategories">クイズカテゴリ一覧取得</button>
    <br />
    <button @click="getQuizCategory">クイズカテゴリ取得</button>
    <br />
    <button @click="getQuizResults">クイズ結果一覧取得</button>
    <br />
    <button @click="getQuizResult">クイズ結果取得</button>
    <br />
    <button @click="getUsers">ユーザー一覧取得</button>
    <br />
    <button @click="getUser">ユーザー取得</button>
  </div>
</template>