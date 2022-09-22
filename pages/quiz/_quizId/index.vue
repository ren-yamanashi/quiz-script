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
const currentTab = ref()
const quizId = computed(() => route.value.params.quizId)
const quiz = reactive<Quiz>(createDefaultQuiz())
const userResult = ref("") // userのコーディング結果
const userOutputs = ref<string[]>([]) // userの出力
const sidebar = ref(true)

const quizMode = ref<QuizMode>("SOLVE_ANSWER")
const isCorrected = ref(false)
const options = reactive(monacoOptions)



const getQuiz = async () => Object.assign(quiz, await quizRepository.getQuiz(quizId.value))
const onChange = (value: string) => { userResult.value = value }
getQuiz()


const replaceInput = () => quiz.inputExample.map((item) => item.replaceAll(/x|y|=/g, ""))


const getUserResult = () => {
    replaceInput().forEach(async (input, index) => {
        try {
            userOutputs.value = [];
            const result = await vm.runInThisContext(`${userResult.value}; solve(${input})`)
            userOutputs.value.push(result);

            // フラグの切り替えと、正誤判断
            quizMode.value = "CONFIRM_ANSWER"
            result === Number(quiz.outputExample[index]) ? isCorrected.value = true : isCorrected.value = false

            if (userOutputs.value.some((item) => !item)) throw new Error("return is not defined")
        } catch (err: unknown) {
            if (err instanceof Error) {
                userOutputs.value.push(err.toString())
                throw new Error(err.toString())
            }
        }
    })
    quizMode.value = "CONFIRM_ANSWER"
}

// ユーザーの記入を出力
// const context = vm.createContext({
//     myConsole: {
//         log(...args) {
//             console.log(...args)
//         }
//     }
// })
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
    <div class='d-flex pt-16'>
        <v-navigation-drawer v-model="sidebar" width="400" chipped permanent color="white"
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
            <div id="user-editor" class="d-flex justify-center ">
                <MonacoEditor width="calc(100vw - 400px)" height="500px" theme="vs-dark" language="typescript"
                    :value="quiz.startCode" :options="options" @change="onChange" />
            </div>
            <v-tabs v-model="currentTab" height="30px" background-color="black" dark>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab>コンソール</v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentTab">
                <v-tab-item class="user-terminal full-height pt-1">
                    <v-btn class="d-flex ma-2 white--text ml-auto bg-primary font-weight-bold execution-button"
                        @click="getUserResult">実行
                    </v-btn>
                    <div v-for="(log,index) in userOutputs" :key="index" class="white--text  mr-auto d-block">
                        <span class="white--text ml-2 mr-auto">{{log}}</span>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<style lang="scss">
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
    height: 297px;

    .execution-button {
        z-index: 100;
        position: absolute;
        right: 0;
    }
}
</style>