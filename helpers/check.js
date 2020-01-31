function check(userAnswer, questions) {

    if (Array.isArray(userAnswer)) {
        let answerUser = userAnswer.join('')
        for (let i = 0; i < questions.length; i++) {
            
            if (questions[i].answer === answerUser) {
                return true
            }
        }
        return false
    } else {
        for (let i = 0; i < questions.length; i++) {
            
            if (questions[i].answer === userAnswer) {
                return true
            }
        }
        return false
    }
    
}

module.exports = check