<script setup lang="ts">
import MonacoEditor from "monaco-editor-vue"
import { computed, reactive, ref, useRoute } from '@nuxtjs/composition-api';
import { quizRepository } from '~/api/repo/queries/quiz';
import { Quiz } from '~/types/graphql/schema';
import { vm } from "~/plugins/vm";

const route = useRoute()

// constants
const QUIZ_MODE = {
    SOLVE_ANSWER: "SOLVE_ANSWER",
    CONFIRM_ANSWER: "CONFIRM_ANSWER"
} as const

type QuizMode = typeof QUIZ_MODE[keyof typeof QUIZ_MODE]

const createDefaultQuiz = (): Quiz => ({
    __typename: "Quiz",
    answerCode: "",
    answerComment: "",
    inputFormat: "",
    outputFormat: "",
    inputExample: [],
    outputExample: [],
    inputDescription: [],
    outputDescription: [],
    conditions: "",
    categoryId: 0,
    createdAt: "",
    id: "",
    isPublic: false,
    question: "",
    startCode: "",
    title: "",
    level: 1,
})

// monacoEditor
const monacoOptions = {
    minimap: { enabled: false },
    contextmenu: false,
    fontFamily: "SFMono-Regular, Fira code, Fira Mono, Consolas, Menlo, monospace",
    selectOnLineNumbers: true
}

// states
const currentRef = ref()
const quizId = computed(() => route.value.params.quizId)
const quiz = reactive<Quiz>(createDefaultQuiz())
const userResult = ref("")
const sidebar = ref(true)

const quizMode = ref<QuizMode>("SOLVE_ANSWER")
const isCorrected = ref(false)
const options = reactive(monacoOptions)



const getQuiz = async () => Object.assign(quiz, await quizRepository.getQuiz(quizId.value))
const onChange = (value: string) => { userResult.value = value }
getQuiz()

// ユーザーの記入を出力
// const context = vm.createContext({
//     myConsole: {
//         log(...args) {
//             console.log(...args)
//         }
//     }
// })


const replaceInput = () => quiz.inputExample.map((item) => item.replaceAll(/x|y|=/g, ""))

const getUserResult = () => {
    replaceInput().forEach((input, index) => {
        const vmResult = (input: string) => { return vm.runInThisContext(`${userResult.value}; solve(${input})`) }
        vmResult(input) === Number(quiz.outputExample[index]) ? isCorrected.value = true : isCorrected.value = false
    })
    quizMode.value = "CONFIRM_ANSWER"
    console.log(isCorrected.value)
}

// consoleを書き換える
// セキュリティ問題でできなかった
// const isPublic = ref(true)
// const iframe = ref()
// const pushConsole = (event: any) => {
//     userAnswers.value.push(event.message)
// }
// onMounted(() => {
//     isPublic.value = true
//     const _log = console.log
//     console.log = function (...rest) {
//         if (isPublic.value) _log(...rest)
//         window.postMessage(
//             {
//                 message: rest
//             },
//             window.location.origin
//         )
//     }
//     window.addEventListener("message", (event: any) => {
//         console.debug(event)
//         pushConsole(event)
//     })
// })
// onUnmounted(() => {
//     isPublic.value = false
// })
// iframe.value?.addEventListener("change",() => pushConsole)
</script>

<template>
    <div class='quiz-information d-flex'>
        <v-navigation-drawer id="side-navigation" v-model="sidebar" width="400" permanent color="white"
            class="side-navigation-content">
            <v-container class="quiz-navigation">
                <v-container>
                    <div class="text-h5 font-weight-bold pa-2 ">
                        {{quiz.title}}
                    </div>
                    <div class="d-block justify-left mt-10">
                        <div class="text-h5 font-weight-bold px-2 py-3">説明</div>
                        <v-divider light />
                        <div class="question-text">{{quiz.question}}</div>
                    </div>
                </v-container>
                <!-- 入力、出力詳細 -->
                <v-container class="input-and-output-container">
                    <div class="d-block justify-left mt-7">
                        <div class="text-h5 font-weight-bold px-2 py-3 georgia-font">
                            入力
                        </div>
                        <v-divider />
                        <div class="text-sm pa-2 mt-1">入力は、以下の形式で与えられます</div>
                        <div class="text-sm pa-2 codeblock-style serif-font">{{quiz.inputFormat}}</div>
                    </div>
                    <div class="d-block justify-left mt-7">
                        <div class="text-h5 font-weight-bold pa-2">
                            出力
                        </div>
                        <v-divider />
                        <div class="text-sm pa-2 mt-1">{{quiz.outputFormat}}</div>
                    </div>
                    <div class="d-block justify-left mt-7">
                        <div class="text-h5 font-weight-bold pa-2">
                            条件
                        </div>
                        <v-divider />
                        <div class="text-sm pa-2 mt-1">{{quiz.conditions}}</div>
                    </div>
                    <div class="d-block justify-left mt-7">
                        <div class="text-h5 font-weight-bold pa-2 ">
                            例
                        </div>
                        <v-divider />
                        <div v-for="(_,index) in quiz.inputExample" :key="index" class="mt-7">
                            <span class="text-sm font-weight-bold pa-2">
                                例{{index+1}}
                            </span>
                            <div class="codeblock-style">
                                <div class="d-flex justify-left">
                                    <span class="pa-1 pr-5 georgia-font">入力 : </span>
                                    <span class="pa-1 serif-font">{{quiz.inputExample[index]}}</span>
                                </div>
                                <div class="d-flex justify-left">
                                    <span class="pa-1 pr-5 georgia-font">出力 : </span>
                                    <span class="pa-1 serif-font">{{quiz.outputExample[index]}}</span>
                                </div>
                                <div v-if="quiz.outputDescription[index]" class="d-flex justify-left  mt-2">
                                    <span class="pa-1 serif-font">{{quiz.outputDescription[index]}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-container>
            </v-container>
        </v-navigation-drawer>

        <!-- タイトルと問題文 -->
        <div class="solve-quiz-contents">
            <!-- <v-btn class="pa-0 ma-0 secondary-button font-weight-bold"  @click="getUserResult">実行</v-btn> -->
            <!-- <div class="mt-1 d-flex justify-space-between">
                <div v-if="quizMode === 'CONFIRM_ANSWER' ">
                    <span v-if="isCorrected" class="text-h6 font-weight-bold ">
                        正解
                    </span>
                    <span v-else>
                        不正解
                    </span>
                </div>
            </div> -->
            <div id="user-editor" class="d-flex justify-center ">
                <MonacoEditor width="calc(100vw - 400px)" height="500px" theme="vs-dark" language="typescript"
                    :value="quiz.startCode" :options="options" @change="onChange" />
            </div>
            <v-tabs v-model="currentTab" height="30px" background-color="black" dark>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab color="white">入力</v-tab>
                <v-tab>出力</v-tab>
                <v-tab>コンソール</v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentTab">
                <v-tab-item class="user-terminal full-height full-width">
                    
                        <v-btn class="d-flex ma-2 white--text ml-auto bg-primary font-weight-bold" @click="getUserResult">実行</v-btn>
                    
                    <!-- <span class="white--text py-1 px-2">入力</span> -->
                
                </v-tab-item>
                <v-tab-item class="user-terminal full-height">
                    <span class="white--text py-1 px-2">出力</span>
                </v-tab-item>
                <v-tab-item class="user-terminal full-height">
                    <span class="white--text py-1 px-2">コンソール</span>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<style >
.quiz-information {
    background-color: #363636 !important;
    margin-top: 62px;
}

.quiz-navigation {
    background-color: #363636;
    color: white;
    overflow-y: scroll;
    max-height: calc(100vh - 60px);
}

.solve-quiz-contents {
    margin: 0px;
    padding: 0px;
}

.question-text {
    font-size: h6;
    padding: 10px;
}

.codeblock-style {
    font-size: 15px;
    color: black;
    background-color: #f5f5f5;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
}

.user-terminal {
    border-top: 1px solid grey;
    background-color: rgba(6, 6, 6, 0.87);
    height: 300px;
}
</style>