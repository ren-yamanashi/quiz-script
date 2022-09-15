<script setup lang="ts">
import { computed, reactive, useRoute, useRouter } from '@nuxtjs/composition-api';
import { quizRepository } from '~/api/repo/queries/quiz';
import { Quiz } from '~/types/graphql/schema';

const createDefaultQuiz = ():Quiz => ({
    __typename:"Quiz",
    answerCode:"",
    answerComment:"",
    input:[],
    output:[],
    categoryId:0,
    createdAt:"",
    id:"",
    isPublic:false,
    question:"",
    startCode:"",
    title:"",
    level:1
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
            <v-btn @click="router.push('/')">HOME</v-btn>
        </div>
        <div class="d-flex justify-left">
            <span class="text-h5 font-weight-bold pa-2">
                {{quiz.title}}
            </span>
            <v-btn outline class="ma-2 gray gray-text darken-2">
                解説
            </v-btn>
        </div>
        <div class="d-block justify-left mt-10">
            <span class="text-h5 font-weight-bold pa-2">問題文</span>
            <br />
            <div class="text-sm pa-2 mt-1">{{quiz.question}}</div>
        </div>
        <div class="d-block justify-left mt-10">
            <div :v-for="item in quiz.inputExample">
                <div>
                    入力例{{item}}
                </div>
            </div>
        </div>
    </div>
</template>
    