/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(attrs) {
  this.createdAt = attrs.createdAt
  this.dimensions = attrs.dimensions
}

GameObject.prototype.destroy = function() {
  return `${this.name || 'Object' } was removed from the game.`
}

// let tes = new GameObject({
//   createdAt: new Date(),
//   dimensions: 5
// })

// console.log(tes.destroy())

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(attrs) {
  GameObject.call(this, attrs);
  this.healthPoints = attrs.healthPoints
  this.name = attrs.name
}

// explicitly setting the CharacterStats.prototype to a GameObject.prototype
CharacterStats.prototype = Object.create(GameObject.prototype);
// set CharacterStats.prototype.constructor to the proper function, so that it knows to create a CharacterStats and not a GameObject
// CharacterStats.prototype.constructor = CharacterStats

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage. ${this.healthPoints} HP remaining`
}

// // testing
// let stats = new CharacterStats({
//   healthPoints: 50,
//   name: 'bob',
//   createdAt: new Date()
// })

// console.log(stats.createdAt);


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
function Humanoid(attrs) {
  CharacterStats.call(this, attrs);
  this.team = attrs.team
  this.weapons = attrs.weapons
  this.language = attrs.language
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`
}

// let bob = new Humanoid({
//   healthPoints: 50,
//   name: 'bob',
//   createdAt: new Date(),
//   language: 'english'
// })

// console.log(bob.takeDamage());

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/


function Hero(attrs) {
  Humanoid.call(this, attrs);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.attack = function(enemy) {
  
  if (Math.random() < .5) {
    enemy.healthPoints -= 7.5
    return enemy.takeDamage()
  } else {
    return `${this.name}'s attack missed!`    
  } 
}

function Villain(attrs) {
  Humanoid.call(this, attrs);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.attack = function(enemy) {
  
  if (Math.random() < .5) {
    enemy.healthPoints -= 5
    return enemy.takeDamage()
  } else {
    return `${this.name}'s attack missed!`    
  } 
}

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  

  // console.log(mage.createdAt); // Today's date
  // console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  // console.log(swordsman.healthPoints); // 15
  // console.log(mage.name); // Bruce
  // console.log(swordsman.team); // The Round Table
  // console.log(mage.weapons); // Staff of Shamalama
  // console.log(archer.language); // Elvish
  // console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  // console.log(mage.takeDamage()); // Bruce took damage.
  // console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  // could make them fight until someone reaches 0.
  // console.log(swordsman.healthPoints); // 15
  // console.log(mage.attack(swordsman)); // Bruce took damage.  
  // console.log(swordsman.healthPoints); // 15

  function game() {
    console.log(`${mage.name} HP: ${mage.healthPoints}`);
    console.log(`${swordsman.name} HP: ${swordsman.healthPoints}`);
    console.log('-------------');
    
    
    while (mage.healthPoints > 0 && swordsman.healthPoints > 0) {
      if (Math.random() < .5) {
        console.log(mage.attack(swordsman))
      } else {
        console.log(swordsman.attack(mage))
      }
  
      if (mage.healthPoints <= 0) {
        console.log(mage.destroy())
      }
      if (swordsman.healthPoints <= 0) {
        console.log(swordsman.destroy())
      }
    }
  }

  game()

  // // repeat game 5 times
  // for (let i = 0; i < 5; i++) {
  //   mage.healthPoints = 5
  //   swordsman.healthPoints = 15
  //   game()    
  // }
