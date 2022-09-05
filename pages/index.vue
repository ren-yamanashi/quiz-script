<script setup lang="ts">
import { reactive, ref } from "@nuxtjs/composition-api";
import {quizRepository} from '~/api/repo/queries/quiz';
import {quizCategoryRepository} from "~/api/repo/queries/category"
import {quizResultRepository} from "~/api/repo/queries/result"
import {userRepository} from "~/api/repo/queries/user"
import {quizMutations} from  "~/api/repo/mutations/quiz"
import { AddQuizInput, Quiz, QuizCategory, QuizResult, User } from '~/types/graphql/schema';

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

// create
type AddQuizFormInput = {
  question:string,
  startCode:string,
  answerCode:string,
  answers:string[],
  hint:string,
  categoryId:number,
  isPublic:boolean
}
const addQuizDefaultInput = ():AddQuizFormInput => ({
  question:"",
  startCode:"",
  answerCode:"",
  answers:[],
  hint:"",
  categoryId:1,
  isPublic:false
})

const typeChangeForAddQuizInput = (
  {
    question,
    startCode,
    answerCode,
    answers,
    hint,
    categoryId,
    isPublic
  }:AddQuizFormInput
  ):AddQuizInput => ({
    question,
    startCode,
    answerCode,
    answers,
    hint,
    categoryId,
    isPublic
})

const addQuizInput = reactive<AddQuizFormInput>(addQuizDefaultInput())
const addQuiz = async()=> {
  try {
    await quizMutations.create(typeChangeForAddQuizInput(addQuizInput))
    Object.assign(addQuizInput,addQuizDefaultInput) // 初期化
    console.log("========クイズを作成========")
  } catch (error) {
    throw new Error("クイズの作成に失敗しました")
  }
}
</script>

<template >
  <div>
    <span>取得</span>
    <br />
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
    <br />
    <br />

    <v-form @submit.prevent="addQuiz">
      <span>作成</span>
      <br />
      <label>question</label>
      <input v-model="addQuizInput.question" />
      <br />
      <label>startCode</label>
      <input v-model="addQuizInput.startCode" />
      <br />
      <label>answerCode</label>
      <input v-model="addQuizInput.answerCode" />
      <br />
      <label>answers</label>
      <input v-model="addQuizInput.answers" />
      <br />
      <label>hint</label>
      <input v-model="addQuizInput.hint" />
      <br />
      <label>categoryId</label>
      <input v-model="addQuizInput.categoryId" type="number" />
      <br />
      <label>isPublic</label>
      <input v-model="addQuizInput.answers" type="checkbox" />
      <br />
      <button type="submit">OK</button>
    </v-form>
  </div>
</template>