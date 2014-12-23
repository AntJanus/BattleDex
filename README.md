BattleDex
=========

Pokedex for battling. Built in Angular, using PokeApi.

###Functionality

This is more for me while I'm working on it than for anyone else:

1. pull up single pokemon stats by name
2. compare two pokemon match ups (weakness/strength)

###Architecture

1. use a singular service to get and store a list of ALL pokemon (this is for type ahead-like functionality) and to look up pokemon by IDs
2. a service for retrieving a single pokemon
3. a service for retrieving resistance/weakness
