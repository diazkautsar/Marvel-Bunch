function checkSuperHero(numbers, heroes) {
    let totalPoint = 0
    numbers.forEach(data => {
        totalPoint += Number(data)
    })

    let totalHeroes = heroes.length

    let range = Math.floor(465/totalHeroes)
    let index = 0
    let hero = ''
    for (let i = 0; i < 465; i += range) {
        if (totalPoint < i) {
            hero = heroes[index].dataValues
            break;
        }
        index++
    }
    return hero.id
}

module.exports = checkSuperHero