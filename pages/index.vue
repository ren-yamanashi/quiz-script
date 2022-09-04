<script setup lang="ts">
import { gql } from '@apollo/client/core';
import { client } from '~/api/client'

const users = `
	{
    users {
      name
    }
  }
`

const fetchData = async () => { 
  const data =	await client.query({ query: gql(users) }); console.log(data)
}
</script>

<template >
  <div>
    <span>test</span>
    <button @click="fetchData">データ取得</button>
  </div>
</template>∏