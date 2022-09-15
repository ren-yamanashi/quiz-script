export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface AddQuizCategoryInput {
  name: Scalars['String'];
}

export interface AddQuizInput {
  answerCode: Scalars['String'];
  answerComment?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['Int'];
  conditions?: InputMaybe<Scalars['String']>;
  inputDescription?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  inputExample: Array<Scalars['String']>;
  inputFormat: Scalars['String'];
  isPublic: Scalars['Boolean'];
  level: Scalars['Int'];
  outputDescription?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  outputExample: Array<Scalars['String']>;
  outputFormat: Scalars['String'];
  question: Scalars['String'];
  startCode: Scalars['String'];
  title: Scalars['String'];
}

export interface AddQuizResultInput {
  isCorrect: Scalars['Boolean'];
  quizId: Scalars['String'];
  userId: Scalars['String'];
}

export interface AuthPayload {
  __typename: 'AuthPayload';
  errors: Array<Error>;
  user?: Maybe<User>;
}

export interface Error {
  __typename: 'Error';
  message: Scalars['String'];
}

export interface Mutation {
  __typename: 'Mutation';
  addQuiz: QuizPayload;
  addQuizCategory: QuizCategoryPayload;
  addQuizResult: QuizResultPayload;
  deleteQuiz: QuizPayload;
  deleteQuizCategory: QuizCategoryPayload;
  deleteQuizResult: QuizResultPayload;
  deleteUser: AuthPayload;
  signIn: AuthPayload;
  signup: AuthPayload;
  updateQuiz: QuizPayload;
  updateQuizCategory: QuizCategoryPayload;
  updateQuizResult: QuizResultPayload;
  updateUser: AuthPayload;
}


export interface MutationAddQuizArgs {
  input: AddQuizInput;
}


export interface MutationAddQuizCategoryArgs {
  input: AddQuizCategoryInput;
}


export interface MutationAddQuizResultArgs {
  input: AddQuizResultInput;
}


export interface MutationDeleteQuizArgs {
  id: Scalars['String'];
}


export interface MutationDeleteQuizCategoryArgs {
  id: Scalars['Int'];
}


export interface MutationDeleteQuizResultArgs {
  id: Scalars['Int'];
}


export interface MutationDeleteUserArgs {
  id: Scalars['String'];
}


export interface MutationSignInArgs {
  email: Scalars['String'];
  password: Scalars['String'];
}


export interface MutationSignupArgs {
  input: SignupInput;
}


export interface MutationUpdateQuizArgs {
  id: Scalars['String'];
  input: UpdateQuizInput;
}


export interface MutationUpdateQuizCategoryArgs {
  id: Scalars['Int'];
  input: UpdateQuizCategoryInput;
}


export interface MutationUpdateQuizResultArgs {
  id: Scalars['Int'];
  input: UpdateQuizResultInput;
}


export interface MutationUpdateUserArgs {
  id: Scalars['String'];
  input: UpdateUserInput;
}

export interface Query {
  __typename: 'Query';
  quiz?: Maybe<Quiz>;
  quizCategories: Array<QuizCategory>;
  quizCategory?: Maybe<QuizCategory>;
  quizResult?: Maybe<QuizResult>;
  quizResults: Array<QuizResult>;
  quizzes: Array<Maybe<Quiz>>;
  user?: Maybe<User>;
  users: Array<User>;
}


export interface QueryQuizArgs {
  id: Scalars['String'];
}


export interface QueryQuizCategoryArgs {
  id: Scalars['Int'];
}


export interface QueryQuizResultArgs {
  id: Scalars['Int'];
}


export interface QueryQuizzesArgs {
  isPublic?: InputMaybe<Scalars['Boolean']>;
}


export interface QueryUserArgs {
  id: Scalars['String'];
}

export interface Quiz {
  __typename: 'Quiz';
  answerCode: Scalars['String'];
  answerComment?: Maybe<Scalars['String']>;
  category?: Maybe<QuizCategory>;
  categoryId: Scalars['Int'];
  conditions?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  inputDescription?: Maybe<Array<Maybe<Scalars['String']>>>;
  inputExample: Array<Scalars['String']>;
  inputFormat: Scalars['String'];
  isPublic: Scalars['Boolean'];
  level: Scalars['Int'];
  outputDescription?: Maybe<Array<Maybe<Scalars['String']>>>;
  outputExample: Array<Scalars['String']>;
  outputFormat: Scalars['String'];
  question: Scalars['String'];
  quizResults?: Maybe<Array<Maybe<QuizResult>>>;
  startCode: Scalars['String'];
  title: Scalars['String'];
}

export interface QuizCategory {
  __typename: 'QuizCategory';
  id: Scalars['Int'];
  name: Scalars['String'];
  quizzes?: Maybe<Array<Maybe<Quiz>>>;
}

export interface QuizCategoryPayload {
  __typename: 'QuizCategoryPayload';
  errors: Array<Error>;
  quizCategory: QuizCategory;
}

export interface QuizPayload {
  __typename: 'QuizPayload';
  errors: Array<Error>;
  quiz?: Maybe<Quiz>;
}

export interface QuizResult {
  __typename: 'QuizResult';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isCorrect: Scalars['Boolean'];
  quiz: Quiz;
  quizId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
}

export interface QuizResultPayload {
  __typename: 'QuizResultPayload';
  errors: Array<Error>;
  quizResult: QuizResult;
}

export interface SignInInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface SignupInput {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
}

export interface UpdateQuizCategoryInput {
  name?: InputMaybe<Scalars['String']>;
}

export interface UpdateQuizInput {
  answerCode?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  conditions?: InputMaybe<Scalars['String']>;
  inputDescription?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  inputExample?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  inputFormat?: InputMaybe<Scalars['String']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<Scalars['Int']>;
  outputDescription?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  outputExample?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  outputFormat?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['String']>;
  startCode?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}

export interface UpdateQuizResultInput {
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  quizId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
}

export interface UpdateUserInput {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}

export interface User {
  __typename: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  quizResults?: Maybe<Array<Maybe<QuizResult>>>;
  role?: Maybe<UserRole>;
}

export type UserRole =
  | 'ADMIN'
  | 'USER';
