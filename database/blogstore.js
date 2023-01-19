const mongoose = require('mongoose')

const express = require('express')

const bschema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    btitle:{
        type:String,
        required:true,
    },
    keywords:{
        type:String,
        required:true
    },
    his:{
        type:String,
        required:true
    },
    imglinke:{
        type:String,
        required:true
    },
    imglinks:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

bschema.index({btitle:'text',keywords:'text'});

const bmodel =  mongoose.model('probs',bschema);

module.exports = bmodel;