#Server Explanation

The server is made up of three, RDBMS tables focused around Players, Locations, and Games:

Players- Each individual who uses the website is given their attributes through Google and API
references. They each have profile data, where they can display important attributes like position,
height, and weight. They can also confirm game appearances through their profile, giving them
a one to many connection between them and a given game. Certain users also have administrator privileges.

Locations- A given area can be designated as a pickup location upon creation by a given user. In the future,
this spot will be available from a drop down list or nearby analysis in order to select it. The location stores
its own address and name so that it can be accessed by players who want to use it. It also keeps whether or not a
current game is open at the location for joining. Location is connected to the Game variable in a one to one or one to many relationship, based off of how many courts are accessible at a given spot.

Games- Each game has a stored ID and acts as a go-between for Players and Locations. It only exists within the
database for as long as the game needs players: if a spot is filled but then left after the game's openings are
closed, the individual will need to create another game. The game stores its location, along with how many players are
needed for a given game. Currently, this value will be based on the type selected by the user (1 vs. 1, 2 vs. 2, etc.).
In the future, new formats may force the app to encourages users to put in a value for what is the preferred amount
of players. Start times and dates are used to take games out of the database when necessary.

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:3001>. Alternately, to enable hot reloading of changes to the server, you can use `npm run watch`. In general, though, you should launch the client and server concurrently from the "top-level" package.

## Setup

You should install the dependencies from the "top-level" package as described in its README or via `npm install` in this directory.
