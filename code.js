function getStats(txt) {
    // convert to lowercase
    // & replace all non-alphanumeric characters with 1 space (" ")
    // used for stats looking at words
    ctxt = txt.toLowerCase().replace(/[\W]+/g," ");
    return {
        nChars: txt.length,
        nWords: get_nWords(ctxt),
        nLines: get_nLines(txt),
        nNonEmptyLines: get_nNonemptyLines(txt),
        averageWordLength: get_averageWordLength(ctxt),
        maxLineLength: get_maxLineLength(txt),
        palindromes: get_palindromes(ctxt),
        longestWords: get_longestWords(ctxt),
        mostFrequentWords: get_mostFrequentWords(ctxt)
    };
}

// split words delimited by one " " & get rid of empty strings
function splitwords(txt) {
    return txt.split(/\s+/)
        .filter(function(i) {
            return i!=="";
        });
}

// get list of all unique words
function uniques(words) {
    let uniquewords = [];
    for(let i=0; i<words.length;i++) {
        if(!uniquewords.includes(words[i]))
            uniquewords.push(words[i]);
    }
    return uniquewords;
}

// get list of words & return length
function get_nWords(txt) {
    return splitwords(txt).length;
}

// if string is empty return 0 else
// get list of lines & return length of array
function get_nLines(txt) {
    return (txt === "") ? 0 : txt.split(/\n/).length;
}

// get list of lines
// replace all white space & get rid of empty strings
// return length of array
function get_nNonemptyLines(txt) {
    let lines = txt.split(/\n/);
    for(let i=0;i<lines.length;i++)
        lines[i] = lines[i].replace(/[\s\t]+/g, "");
    return lines.filter(function(i) {
        return i!=="";
    }).length;
}

// get list of words
// return 0 if string is empty else return avg length
function get_averageWordLength(txt) {
    let words = splitwords(txt),
        total = 0;
    for (let i=0; i < words.length; i++)
        total += words[i].length;
    return (words.length === 0) ? 0 : total/words.length;
}

// get list of lines & get max line length
function get_maxLineLength(txt) {
    let lines = txt.split(/\n/),
        max = 0;
    for (let i=0; i<lines.length; i++) {
        if(lines[i].length > max)
            max = lines[i].length;
    }
    return max;
}

// get list of unique words
// find & return palindromes
function get_palindromes(txt) {
    let words = uniques(splitwords(txt)),
        palin = [];
    for(let i=0;i<words.length;i++) {
        if(words[i].length<3)
            continue;
        let mid = Math.round(words[i].length/2),
            j = 0;
        while(j<mid) {
            if(words[i].charAt(j) !== words[i].charAt(words[i].length-j-1))
                break;
            j++;
        }
        if(j===mid) palin.push(words[i]);
    }
    return palin;
}

// get list of unique words
// sort by length (descending) then alphabetically (ascending)
// return top 10 words
function get_longestWords(txt) {
    return words = uniques(splitwords(txt))
        .sort(function(a,b) {
            return (b.length - a.length) || (a.localeCompare(b));
        }).slice(0,10);
}

// get list of words
// get unique words & record frequencies
// sort by frequency (descending) then alphabetically (ascending)
// return top 10 words
function get_mostFrequentWords(txt) {
    let words = splitwords(txt),
        unique = new Map(),
        uniquewords = [];
    for(let i=0; i<words.length; i++) {
        if(!unique.has(words[i])) {
            unique.set(words[i], 1);
            uniquewords.push(words[i]);
        } else
            unique.set(words[i], unique.get(words[i])+1);
    }
    uniquewords = uniquewords.sort(function(a,b) {
       return (unique.get(b) - unique.get(a)) || a.localeCompare(b);
    }).slice(0,10);
    for(let i=0;i<uniquewords.length;i++)
        uniquewords[i] = uniquewords[i] + "(" + unique.get(uniquewords[i]) + ")";
    return uniquewords;
}


