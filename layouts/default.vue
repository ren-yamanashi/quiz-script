<script setup lang="ts">
import { useRouter } from '@nuxtjs/composition-api';

    
    const router = useRouter();
    const goHome = () => router.push("/")
</script>
<template>
    <v-app id="app">
        <!-- TODO: ログインしていたらこのヘッダーが出るようにする -->
        <template id="isUserLogin">
            <v-app-bar app clipped-right clipped-left color="background" flat height="60px" >
                <v-toolbar-title class="text-h5 d-flex" >
                    <v-btn  class="primary-button" @click="goHome" >
                        QuizScript
                    </v-btn>
                </v-toolbar-title>
            </v-app-bar>
        </template>
        <nuxt />
    </v-app>
</template>

<style >
.main-header {
    border: 3px solid white;
}
</style>