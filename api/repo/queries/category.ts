import { gql } from '@apollo/client/core';
import { client } from '~/api/client';
import { Query, QuizCategory } from '~/types/graphql/schema';

export const quizCategoryRepository = {
  getQuizCategories: async () => {
    const { data } = await client.query<Query>({
      query: gql`
        query getQuizCategories {
          quizCategories {
            id
            name
            quizzes {
              id
            }
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quizCategories)) as QuizCategory[];
  },
  getQuizCategoryById: async (id: number) => {
    const { data } = await client.query<Query>({
      variables: { id },
      query: gql`
        query getQuizCategoryById($id: Int!) {
          quizCategory(id: $id) {
            id
            name
            quizzes {
              id
            }
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.quizCategory)) as QuizCategory;
  },
};
