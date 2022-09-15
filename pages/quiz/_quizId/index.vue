<script setup lang="ts">
import { computed, reactive, useRoute, useRouter } from '@nuxtjs/composition-api';
import { quizRepository } from '~/api/repo/queries/quiz';
import { Quiz } from '~/types/graphql/schema';


const createDefaultQuiz = ():Quiz => ({
    __typename:"Quiz",
    answerCode:"",
    answerComment:"",
    inputFormat:"",
    outputFormat:"",
    inputExample:[],
    outputExample:[],
    inputDescription:[],
    outputDescription:[],
    conditions:"",
    categoryId:0,
    createdAt:"",
    id:"",
    isPublic:false,
    question:"",
    startCode:"",
    title:"",
    level:1,
})


const route = useRoute()
const router = useRouter()

const quizId = computed(() => route.value.params.quizId) 
const quiz = reactive<Quiz>(createDefaultQuiz())


const getQuiz = async() => {
    Object.assign(quiz,await quizRepository.getQuiz(quizId.value))
}

getQuiz()

</script>

<template>
    <div class="quiz-information">
        <div>
            <v-btn outlined class="ma-2 gray gray-text darken-2" @click="router.push('/')">HOME</v-btn>
        </div>
        <!-- タイトルと問題文 -->
        <v-container class="quiz-header">
            <div class="d-flex justify-left">
                <span class="text-h5 font-weight-bold pa-2">
                    {{quiz.title}}
                </span>
                <v-btn outlined class="ma-2 gray gray-text darken-2">
                    解説
                </v-btn>
            </div>
            <div class="d-block justify-left mt-10">
                <span class="text-h5 font-weight-bold pa-2">問題文</span>
                <br />
                <div class="text-sm pa-2 mt-1">{{quiz.question}}</div>
            </div>
        </v-container>

        <!-- 入力、出力詳細 -->
        <v-container class="input-and-output-container">
            <div class="d-block justify-left mt-7">
                <span class="text-h5 font-weight-bold pa-2">
                    入力
                </span>
                <br />
                <div class="text-sm pa-2 mt-1">入力は、以下の形式で与えられます</div>
                <div class="text-sm pa-2 ">{{quiz.inputFormat}}</div>
            </div>
            <div class="d-block justify-left mt-7">
                <span class="text-h5 font-weight-bold pa-2">
                    出力
                </span>
                <br />
                <div class="text-sm pa-2 mt-1">{{quiz.outputFormat}}</div>
            </div>
            <div class="d-block justify-left mt-7">
                <span class="text-h5 font-weight-bold pa-2">
                    条件
                </span>
                <br />
                <div class="text-sm pa-2 mt-1">{{quiz.conditions}}</div>
            </div>

            <!-- 入力例と出力例 -->
            <v-container class="example-contents-container">
                <div class="d-block justify-left mt-10">
                    <div v-for="(_,index) in quiz.inputExample" :key="index" class="mt-7">
                        <span class="text-h5 font-weight-bold pa-2">
                            入力例{{index+1}}
                        </span>
                        <br />
                        <div class="text-sm pa-2 mt-1">{{quiz.inputExample[index]}}</div>
                        <div class="text-sm pa-2 mt-1">{{quiz.inputDescription[index]}}</div>
                        <div class="mt-3">
                            <span class="text-h5 font-weight-bold pa-2 ">
                                出力例{{index+1}}
                            </span>
                            <br />
                            <div class="text-sm pa-2 mt-1">{{quiz.outputExample[index]}}</div>
                            <div class="text-sm pa-2 mt-1">{{quiz.outputDescription[index]}}</div>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-container>
        <v-container class="main-content-container">
            <div>
                <span class="text-h5 font-weight-bold pa-2">
                    解答欄
                </span>
                <div class="text-sm pa-2 mt-1">
                    {{quiz.startCode}}
                </div>
            </div>
        </v-container>
    </div>
</template>

<style >
.quiz-header {
    background-color: antiquewhite;
}

.input-and-output-container {
    background-color: rgb(255, 193, 193);
}

.example-contents-container {
    background-color: rgb(203, 241, 242);
}
</style>