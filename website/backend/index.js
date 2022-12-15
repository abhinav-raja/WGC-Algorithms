const express = require('express');

const Trie = require('./trie.js');
const trieData = require('./trie.json');
const AnagramTable = require('./anagramTable.js');
const anagramTableData = require('./anagramTable.json');

const trie = new Trie({
    fwTerminator: "$",
    bwTerminator: "#",
    root: trieData
})

const anagramTable = new AnagramTable(anagramTableData);

const app = express();

app.get('/checkValidity', (req, res)=>{
    if(!req.query.word){
        res.sendStatus(400);
    }
    res.send(trie.isValid(req.query.word));
});

app.get('/getCharades', (req, res)=>{
    try {
        const {word} = req.query;
        let result = [];
        const prefixIdxs = trie.validPrefixIdxs(word);
        const suffixIdxs = trie.validSuffixIdxs(word);
        const charades = trie.getCharades(word);
        res.send(charades);

    } catch (err) {
        res.send(err.message);
    }
})

app.get('/getAnagrams', (req, res)=>{
    try {
        const {word} = req.query;
        res.send(anagramTable.findAllAnagrams(word));
    } catch (err) {
        res.send(err.message);
    }
});

app.listen(3000, ()=>{
    console.log('Server up on port 3000!');
})