import { gql } from '@apollo/client/core';
import { client } from '~/api/client';
import { Query, Quiz } from '~/types/graphql/schema';

export const quizRepository = {
  getQuizzes: async (isPublic?: boolean) => {
    const { data } = await client.query<Query>({
      variables: { isPublic },
      query: gql`
        query getQuizzes($isPublic: Boolean) {
          quizzes(isPublic: $isPublic) {
            id
            title
            question
            startCode
            answerCode
            answers
            hint
            answerComment
            isPublic
            createdAt
            categoryId
            quizResults {
              id
              isCorrect
              quizId
              user {
                id
                name
                email
                role
              }
            }
            category {
              id
              name
            }
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quizzes)) as Quiz[];
  },
  getQuiz: async (id: string) => {
    const { data } = await client.query<Query>({
      variables: { id },
      query: gql`
        query getQuizById($id: String!) {
          quiz(id: $id) {
            id
            title
            question
            startCode
            answerCode
            answers
            hint
            answerComment
            isPublic
            createdAt
            categoryId
            quizResults {
              id
              isCorrect
              quizId
              user {
                id
                name
                email
                role
              }
            }
            category {
              id
              name
            }
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quiz)) as Quiz;
  },
};
