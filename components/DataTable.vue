<script setup lang="ts">
import { ref, watch } from "@nuxtjs/composition-api"
type Props = {
    headers: [],
    items:[]
    disableHoverEffect:boolean
}

const props = defineProps<Props>()
const headers = ref([])
const items = ref([])
const disableHoverEffect = ref(false)

watch(props,() => {
    headers.value = props.headers
    items.value = props.items
    disableHoverEffect.value = props.disableHoverEffect
})



</script>
<template>
    <div class="data-table-component" :class="{ 'disable-hover-effect': disableHoverEffect }">
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1" hide-default-footer>
            <template #item.actions="items">
                <slot :id="items.item.id" name="actions" />
            </template>
        </v-data-table>
    </div>
</template>

<style scoped>
.v-data-table.disable-hover-effect>>>.v-data-table__wrapper>table>tbody>tr:hover {
    background-color: transparent !important;
}
</style>