import { gql } from '@apollo/client/core';
import { client } from '~/api/client';
import { AddQuizInput, Mutation } from '~/types/graphql/schema';

export const quizMutations = {
  create: async (input: AddQuizInput) => {
    const { data } = await client.mutate<Mutation>({
      variables: { input },
      mutation: gql`
        mutation AddQuiz($input: AddQuizInput!) {
          addQuiz(input: $input) {
            quiz {
              id
              question
              startCode
              answerCode
              inputFormat
              outputFormat
              inputExample
              outputExample
              inputDescription
              inputDescription
              conditions
              answerComment
              isPublic
              createdAt
              categoryId
              level
            }
          }
        }
      `,
    });
    if (data) return data.addQuiz;
  },
};
