import { gql } from '@apollo/client/core';
import { client } from '~/api/client';
import { Query, User } from '~/types/graphql/schema';

export const userRepository = {
  getUsers: async () => {
    const { data } = await client.query<Query>({
      query: gql`
        query getUsers {
          users {
            id
            name
            email
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.users)) as User[];
  },
  getUserById: async (userId: string) => {
    const { data } = await client.query<Query>({
      variables: { userId },
      query: gql`
        query getUserById($userId: String!) {
          user(id: $userId) {
            id
            email
            name
          }
        }
      `,
    });
    return JSON.parse(JSON.stringify(data.user)) as User;
  },
};
