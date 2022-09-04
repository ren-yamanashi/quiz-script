import { gql } from '@apollo/client/core';
import { client } from '~/api/client';
import { Query, QuizResult } from '~/types/graphql/schema';

export const quizResultRepository = {
  getQuizResults: async () => {
    const { data } = await client.query<Query>({
      query: gql`
        query getQuizResults {
          quizResults {
            id
            isCorrect
            createdAt
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quizResults)) as QuizResult[];
  },
  getQuizResultById: async (id: number) => {
    const { data } = await client.query<Query>({
      variables: { id },
      query: gql`
        query getQuizResultById($id: Int!) {
          quizResult(id: $id) {
            id
            isCorrect
            createdAt
            user {
              id
              name
              email
            }
            quiz {
              id
            }
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quizResult)) as QuizResult;
  },
};
