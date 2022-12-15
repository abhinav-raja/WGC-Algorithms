const express = require('express');

const Trie = require('./trie.js');
const trieData = require('./trie.json');

const trie = new Trie({
    fwTerminator: "$",
    bwTerminator: "#",
    root: trieData
})

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
        res.sendStatus(400).send(err.message);
    }
})

app.listen(3000, ()=>{
    console.log('Server up on port 3000!');
})