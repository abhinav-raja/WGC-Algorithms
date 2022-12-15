module.exports = class Trie {

    constructor({root, fwTerminator, bwTerminator}){
        this.root = root;
        this.fwTerminator = fwTerminator;
        this.bwTerminator = bwTerminator;
    }

    isValid(word){
        word = word.toLowerCase();
        word += this.fwTerminator;
        let curr = this.root;
        for(const char of word){
            if(char in curr){
                curr = curr[char];
            } else {
                return false;
            }
        }
        return true;
    }

    validPrefixIdxs(word){
        word = word.toLowerCase();
        let curr = this.root;
        let result = [];
        for(let i = 0; i < word.length; i++){
            const char = word[i];
            if(char in curr){
                curr = curr[char];
                if(this.fwTerminator in curr){
                    result.push(i);
                }
            } else {
                return result;
            }
        }
        return result;
    }

    validSuffixIdxs(word){
        word = word.toLowerCase();
        let curr = this.root;
        let result = [];
        for(let i = word.length - 1; i >= 0; i--){
            const char = word[i];
            if(char in curr){
                curr = curr[char];
                if(this.bwTerminator in curr){
                    result.push(i);
                }
            } else {
                return result;
            }
        }
        return result;
    }

    getCharades(word){
        word = word.toLowerCase();
        let prefixIdxs = this.validPrefixIdxs(word);
        let result = [];
        if(this.isValid(word)){
            result.push(word);
        }
        for(const idx of prefixIdxs){
            const pref = word.substring(0, idx+1);
            for(const charade of this.getCharades(word.substring(idx+1))){
                result.push([pref].concat(charade));
            }
        }
        return result;
    }
}