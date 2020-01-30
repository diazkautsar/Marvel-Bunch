function check(userAnswer, questions) {
    let answerUser = userAnswer.join('')
    for (let i = 0; i < questions.length; i++) {
        
        console.log(questions[i].answer, answerUser)
        if (questions[i].answer === answerUser) {
            return true
        }
    }
    return false
}

module.exports = check