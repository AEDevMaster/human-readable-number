 module.exports = function toReadable (num) {
    if(num === 0) return 'zero';

    const units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
    const tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
    const scalesD = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

    const numStr = num.toString().split('').reverse().join('')
    let scalesV = [];
    let n = 0;

    // Делим на разряды
    for(let i = 0; i < Math.ceil(numStr.length / 3); i++) {
        scalesV.push(numStr.substring(n, n + 3))
        n += 3;
    }

    let result = [];

    // Перебираем разряды. в каждом из них может быть число от 1 символа до 3. То есть 1, 12, 123
    scalesV.forEach((scale, i) => {
        let subStr = [];

        if(scale[2]) subStr.push(units[scale[2]] + ' hundred');

        const scaleReversed = +scale.split('').reverse().join('');

        if(scale[1]) {
            let tensWords = scaleReversed % 100 < 20 ? units[scaleReversed % 100] : tens[scale[1]] + (units[scale[0]] ? ' ' : '') + units[scale[0]];
            if(tensWords) subStr.push(tensWords)
        }
        else subStr.push(units[scale[0]])

        if(scalesD[i]) {
            subStr.push(scalesD[i])
        }

        result.push(subStr.join(' '));
    });

    return result.join(' ');
}
