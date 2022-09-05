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
              answers
              hint
              answerComment
              isPublic
              createdAt
              categoryId
              #   quizResults {
              #     id
              #     isCorrect
              #     quizId
              #     user {
              #       id
              #       name
              #       email
              #       role
              #     }
              #   }
              #   category {
              #     id
              #     name
              #   }
            }
          }
        }
      `,
    });
    if (data) return data.addQuiz;
  },
};
