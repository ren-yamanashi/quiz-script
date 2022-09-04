export const users = `
	{
    users {
        id
        name
        email
        password
        role
        quizResults{
            id
            isCorrect
        }
    }
}
`;

export const quizzes = `
{
    quizzes {
        id
        question
        startCode
        answerCode
        answers
        answerComment
        isPublic
        categoryId
        category {
            id
            name
        }
        quizResults {
            id
            isCorrect
            quizId
        }
}
}`;
