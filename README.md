# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Details](#details)
* [Dependencies](#dependencies)

## Instructions

This is a web version of the classical memory game. Open the file index.html in your favourite web browser to start playing. 
The rules are simple: find the pairs!
If you find all the pairs in less than 18 moves you will score 3 stars!
If you find them in less than 25 moves, you will score 2 stars.
And you get it, if you find all the pairs in more than 25 moves, you'll score 1 star.

All the logic and functionalities of the game is developed in Javascript, the code is located here js/app.js


## Details

The Memory game is about finding all the pair of cards with the same picture. A click on a card will show it, a second click on another card will turn it too. If the image matches, a pair is found and the cards stay turned. If the images do not match, the cards turn back.

## Dependencies

Dependencies are as follow:
- FlipClock-master: flip timer (http://flipclockjs.com)
- JQuery 3.4.1: Javascript library
- Prefix Free: lets you use only unprefixed CSS properties everywhere. It works behind the scenes, adding the current browser’s prefix to any CSS code, only when it’s needed.