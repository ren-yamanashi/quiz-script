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

const monacoOptions = {
    minimap: { enabled: false },
    contextmenu: false,
    fontFamily: "SFMono-Regular, Fira code, Fira Mono, Consolas, Menlo, monospace",
    selectOnLineNumbers: true
} as const

// types 
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

// states
const tabRef = ref()
const sidebarRef = ref(true)
const snackbarRef = ref(false)
const isCorrected = ref(false)
const userResult = ref("") // userのコーディング結果
const userOutputs = ref<string[]>([]) // userの出力
const quiz = reactive<Quiz>(createDefaultQuiz())
const quizMode = ref<QuizMode>("SOLVE_ANSWER")
const quizId = computed(() => route.value.params.quizId)

// quiz
const getQuiz = async () => Object.assign(quiz, await quizRepository.getQuiz(quizId.value))
const changeEditorValue = (value: string) => { userResult.value = value }
const replaceInput = () => quiz.inputExample.map((item) => item.replaceAll(/x|y|=/g, ""))
const executionUserResult = () => {
    replaceInput().forEach(async (input, index) => {
        try {
            userOutputs.value = [];
            const result = await vm.runInThisContext(`${userResult.value}; solve(${input})`)
            userOutputs.value.push(result);
            if (userOutputs.value.some((item) => !item)) throw new Error("return is not defined")

            // フラグの切り替えと、正誤判断
            quizMode.value = "CONFIRM_ANSWER"
            result === Number(quiz.outputExample[index]) ? isCorrected.value = true : isCorrected.value = false
            snackbarRef.value = true
        } catch (err: unknown) {
            if (err instanceof Error) {
                userOutputs.value.push(err.toString())
                throw new Error(err.toString())
            }
        }
    })
    quizMode.value = "CONFIRM_ANSWER"
}

getQuiz()
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
    <div id="page-solve-quiz" class='d-flex pt-16'>
        <v-navigation-drawer v-model="sidebarRef" width="400" chipped permanent color="white"
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
        <div class="solve-quiz-contents p">
            <!-- エディター -->
            <div id="user-editor" class="d-flex justify-center ">
                <!-- MEMO: heightは、ヘッダーの高さ(60px) - コンソールの高さ(300px) - タブの高さ(30px)  -->
                <MonacoEditor width="calc(100vw - 400px)" height="calc(100vh - 390px)" theme="vs-dark"
                    language="typescript" :value="quiz.startCode" :options="monacoOptions"
                    @change="changeEditorValue" />
            </div>
            <!-- ターミナル -->
            <v-tabs v-model="tabRef" height="30px" background-color="black" dark>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab>コンソール</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabRef">
                <v-tab-item class="user-terminal full-height pt-1">
                    <v-btn class="d-flex ma-2 white--text ml-auto bg-primary font-weight-bold execution-button"
                        @click="executionUserResult">実行
                    </v-btn>
                    <div v-for="(log,index) in userOutputs" :key="index" class="white--text  mr-auto d-block">
                        <span class="white--text ml-2 mr-auto">{{log}}</span>
                    </div>
                </v-tab-item>
            </v-tabs-items>
            <transition name="animation">
                <div v-if="snackbarRef" class="quiz-toast  bg-white d-flex">
                    <div class="mt-2">
                        <span class="text-h5 font-weight-bold ma-3" :class="isCorrected ? 'primary--text': 'red--text'">
                            {{isCorrected ? "正解!!" : "不正解..."}}</span>
                    </div>
                    <v-btn class="d-flex  ma-0 white--text ml-auto close-icon" color="grey" icon @click="snackbarRef = false">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>

                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss">
#page-solve-quiz {
    .side-navigation-content {
        padding: 0;
        margin: 0;
        background-color: #363636 !important;

        .quiz-navigation {
            background-color: #363636;
            color: white;
            overflow-y: scroll;
            max-height: calc(100vh - 60px);

            .quiz-navigation {
                background-color: #363636;
                color: white;
                overflow-y: scroll;
                max-height: calc(100vh - 60px);
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
        }
    }

    .solve-quiz-contents {
        margin: 0px;
        padding: 0px;
    }

    .user-terminal {
        border-top: 1px solid grey;
        background-color: rgba(0, 0, 0, 0.87);
        height: 300px;

        .execution-button {
            z-index: 100;
            position: absolute;
            right: 0;
        }
    }

    .quiz-toast {
        height: 100px;
        width: calc(100vw - 400px);
        position: absolute;
        bottom: 0;
        .close-icon::before{
            background-color: #ffff;
        }
    }

    .effect-in {
        opacity: 1;
    }
    .animation-enter-active {
        animation: slide 0.5s;
    }
    .animation-leave-active {
        animation: slide 0.5s reverse;
    }
    @keyframes slide {
        from {
            transform: translateY(100px);
        }
        to {
            transform: translateY(0);
        }
    }
}
</style>