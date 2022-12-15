module.exports = class AnagramTable {

    constructor(data){
        this.table = data;
    }

    //find the key under which the word would be stored in the table
    _findKey(word){
        word = word.toLowerCase();
        let key = Array(26).fill(0);
        for(const char of word){
            if(char.charCodeAt(0) >= 'a'.charCodeAt(0) && char.charCodeAt(0) - 'a'.charCodeAt('0') < 26){
                key[char.charCodeAt(0)-'a'.charCodeAt(0)]++;
            }
        }
        const hash = this._hash(key);
        return hash;
    }

    _hash(key){
        const hash = key.map(el => el.toString()).join(',');
        return hash;
    }

    //finds words that are anagrams of the given word (only returns words and not phrases!)
    _findUnitAnagrams(word){
        const key = this._findKey(word);
        return this.table[key] || [];
    }

    //finds all anagrams of the given word, including multiword phrases
    findAllAnagrams(word){
        word = word.toLowerCase();
        let result = this._findUnitAnagrams(word).map(el => [el]);
        for(let i = 0; i < word.length-1; i++){
            const pref = word.substring(0, i+1);
            const suff = word.substring(i+1, word.length);
            const prefAnagrams = this._findUnitAnagrams(pref);
            const suffAnagrams = this.findAllAnagrams(suff);
            //console.log([word, i, prefAnagrams, suffAnagrams]);
            if(prefAnagrams.length*suffAnagrams.length == 0) continue;
            for(const prefAnagram of prefAnagrams){
                for(const suffAnagram of suffAnagrams){
                    result.push([prefAnagram].concat(suffAnagram));
                }
            }
        }
        /*
        //let dp[i] -> findAllAnagrams(word.substring(i))
        let dp = Array(word.length).fill([]);
        //base case
        dp[word.length-1] = this._findUnitAnagrams(word).map(el=>[el]);
        //transition:
        for(let i = word.length-2; i >= 0; i--){
            let partialWord = word.substring(i);
            dp[i] = this._findUnitAnagrams(partialWord);
            for(let j = i; j < word.length-1; j++){
                const pref = word.substring(i, j+1);
                const prefixAnagrams = this._findUnitAnagrams(pref);
                const suffixAnagrams = dp[j+1];
                for(const prefixAnagram of prefixAnagrams){
                    for(const suffixAnagram of suffixAnagrams){
                        dp[i].push([prefixAnagram].concat(suffixAnagram))
                    }
                }
            }
        }
        result = dp[0];
        */
        return result;
    }
};