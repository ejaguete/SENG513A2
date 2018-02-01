function getStats(txt) {
    // replace punctuation with 1 space (" ")
    ctxt = txt.toLowerCase()
        .replace(/[^\w\s+]/g," ");
    return {
        nChars: txt.length,
        nWords: get_nWords(ctxt),
        nLines: get_nLines(ctxt),
        nNonEmptyLines: get_nNonemptyLines(ctxt),
        averageWordLength: get_averageWordLength(ctxt),
        maxLineLength: get_maxLineLength(txt),
        palindromes: get_palindromes(ctxt),
        longestWords: get_longestWords(ctxt),
        mostFrequentWords: get_mostFrequentWords(ctxt)
    };
}

// split words by " " and get rid of empty strings
function splitwords(txt) {
    return txt.split(/\s+\t+/)
        .filter(function(i) {
            return i !== "";
        });
}

// get all unique words from txt
function uniques(words) {
    let uniquewords = [];
    for(let i=0; i<words.length;i++) {
        if(!uniquewords.includes(words[i]))
            uniquewords.push(words[i]);
    }
    return uniquewords;
}

function get_nWords(txt) {
    return splitwords(txt).length;
}

function get_nLines(txt) {
    if(txt === "")
        return 0;
    else
        return txt.split(/\n/).length;
}

function get_nNonemptyLines(txt) {
    return txt.split(/\n/)
        .filter( function(i) {
            return i!=="";
        }).length;
}

function get_averageWordLength(txt) {
    let words = splitwords(txt);
    let total = 0;
    for (let i=0; i < words.length; i++)
        total += words[i].length;
    return (words.length !== 0) ? total/words.length : 0;
}

function get_maxLineLength(txt) {
    let lines = txt.split(/\n/),
        max = 0;

    for (let i=0; i<lines.length; i++) {
        if(lines[i].length > max)
            max = lines[i].length;
    }
    return max;
}

function get_palindromes(txt) {
    let words = uniques(splitwords(txt)),
        palin = [];
    for(let i=0;i<words.length;i++) {
        let mid = Math.round(words[i].length/2);
        console.log("middle=" + mid);
        let j = 0;
        while(j<mid) {
            if(words[i].charAt(j) !== words[i].charAt(words[i].length-j-1))
                break;
            j++;
        }
        if(j===mid)
            palin.push(words[i]);
    }
    return palin;
}

function get_longestWords(txt) {
    let words = splitwords(txt),
        uniquewords = uniques(words);

    // sort by length (descending) then alphabetically (ascending)
    return uniquewords.sort(function(a,b) {
        return (b.length - a.length) || (a.localeCompare(b));
    });
}

function get_mostFrequentWords(txt) {
    let words = splitwords(txt),
        unique = new Map(),
        uniquewords = [];

    // find unique words and record frequency
    for(let i=0; i<words.length; i++) {
        if(!unique.has(words[i])) {
            unique.set(words[i], 1);
            uniquewords.push(words[i]);
        } else
            unique.set(words[i], unique.get(words[i])+1);
    }
    // sort by frequency
    uniquewords.sort(function(a,b) {
       return (unique.get(b) - unique.get(a)) || a.localeCompare(b);
    });
    // concat frequency
    for(let i=0;i<uniquewords.length;i++)
        uniquewords[i] = uniquewords[i].concat("(" + unique.get(uniquewords[i]) + ")");
    return uniquewords;
}


