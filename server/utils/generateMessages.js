import { getRandomFromArray, getRandomNumberBetween } from "./returnRandom.js"

// Array of names, affixes and messages
const names = ["Jan", "Per", "Bjørn", "Ole", "Lars", "Kjell", "Thomas", "Svein", "Knut", "Tor", "Geir", "Martin", "Hans", "Morten", "Andreas", "Erik", "Arne", "Terje", "Daniel", "Anders", "John", "Rune", "Odd", "Magnus", "Trond", "Marius", "Henrik", "Kristian", "Jon", "Tom", "Jonas", "Stian", "Tore", "Olav", "Fredrik", "Christian", "Espen", "Eirik", "Øyvind", "Håkon", "Harald", "Nils", "Emil", "Mathias", "Alexander", "Rolf", "Leif", "Gunnar", "Helge", "Frode", "Jørgen", "Øystein", "Adrian", "Steinar", "Petter", "Tobias", "Einar", "Kjetil", "Sebastian", "Kristoffer", "Sander", "Stein", "Johan", "Stig", "Dag", "Frank", "William", "Sondre", "Arild", "Kenneth", "Pål", "Ola", "Håvard", "Tommy", "Johannes", "Kim", "Vidar", "Karl", "Simen", "Benjamin", "Oliver", "Jens", "Roger", "Sverre", "Elias", "Markus", "Eivind", "Robert", "Vegard", "Ivar", "Even", "Thor", "Magne", "Sindre", "Roy", "Aleksander", "David", "Sigurd", "Kåre", "Mats", "Jakob", "Joakim", "Alf", "Egil", "Noah", "Erlend", "Isak", "Torbjørn", "Roar", "Finn", "Jarle", "Jørn", "Aksel", "Marcus", "Jostein", "Simon", "Erling", "Ove", "Ronny", "Asbjørn", "Oskar", "Lasse", "Atle", "Mohammad", "Henning", "Kai", "Michael", "Robin", "Herman", "Reidar", "Christoffer", "Filip", "Lucas", "Peter", "Adam", "Trygve", "Bjørnar", "Arvid", "Inge", "Theodor", "Paul", "Liam", "Leon", "Kevin", "Carl", "Mads", "Kasper", "Lukas", "Nikolai", "Mikkel", "Johnny", "Jonathan", "Bjarne", "Julian", "Sven", "Oscar", "Vetle", "Ali", "Arve", "Glenn", "Oddvar", "Ragnar", "Jacob", "Peder", "Gabriel", "Torstein", "Steffen", "Joachim", "Audun", "Bård", "Iver", "Odin", "Mohamed", "Trym", "Ståle", "Ørjan", "Åge", "Ulrik", "Kurt", "Jesper", "Brage", "Øivind", "Runar", "Edvard", "Philip", "Ruben", "Torgeir", "Felix", "Patrick", "Piotr", "Arnt", "Andre", "Samuel", "Richard", "Truls", "Victor", "Tomas", "Viktor", "Theo", "Matheo", "Anne", "Inger", "Kari", "Ingrid", "Marit", "Liv", "Ida", "Maria", "Anna", "Ann", "Eva", "Hilde", "Nina", "Marianne", "Elisabeth", "Kristin", "Astrid", "Bente", "Berit", "Heidi", "Silje", "Hanne", "Linda", "Tone", "Randi", "Solveig", "Anita", "Elin", "Bjørg", "Tove", "Camilla", "Julie", "Wenche", "Emma", "Hege", "Marie", "Mona", "Ellen", "Nora", "Ragnhild", "Monica", "Mari", "Thea", "Sara", "Emilie", "May", "Kristine", "Stine", "Karin", "Helene", "Gerd", "Aud", "Laila", "Line", "Malin", "Trine", "Lene", "Else", "Turid", "Sissel", "Mette", "Sofie", "Gunn", "Åse", "Linn", "Jorunn", "Lise", "Vilde", "Frida", "Unni", "Grethe", "Amalie", "Anette", "Siri", "Reidun", "Grete", "Cecilie", "Marte", "Hanna", "Mia", "Gro", "Eli", "Andrea", "Jenny", "Martine", "Britt", "Siv", "Elise", "Irene", "Janne", "Kjersti", "Karoline", "Sigrid", "Victoria", "Lena", "Tonje", "Kirsten", "Maren", "Oda", "Ingeborg", "Rita", "Cathrine", "Hedda", "Ella", "Charlotte", "Ingvild", "Torill", "Sandra", "Maja", "Therese", "Ruth", "Tuva", "Karen", "Ingunn", "Signe", "Christine", "Vigdis", "Brit", "Synnøve", "Caroline", "Lillian", "Lisbeth", "Mathilde", "Marthe", "Lisa", "Aurora", "Tina", "Johanne", "Eline", "Bodil", "Merete", "Linnea", "Henriette", "Selma", "Trude", "Vibeke", "Tiril", "Kristina", "Julia", "Katrine", "Sunniva", "Christina", "Ane", "Leah", "Olivia", "Mina", "Sonja", "Amanda", "Marita", "Pernille", "Kaja", "Sarah", "Beate", "Sofia", "Gry", "Susanne", "Kine", "Synne", "Torunn", "Kirsti", "Guro", "Renate", "Monika", "Aina", "Toril", "Jeanette", "Lill", "Hannah", "Ada", "Celine", "Veronica", "Anja", "Pia", "Live", "Alma", "Mary", "Lilly", "Agnes", "Sølvi", "Solfrid", "Ina", "Ellinor", "Miriam", "Lina", "Mariann", "Kathrine", "Karina", "Rigmor", "Helga", "Iselin", "Helle", "Gunhild", "Gunvor", "Rikke", "Åshild", "Ingebjørg", "Birgit", "Elsa", "Marta", "Aase"]
const messages = [ "Glemte å si god morgen", "glemte gm, kom hel.", "Gm fra hk", "Gm fra HK", "gm hk", "gm hk", "gm hk", "Gm hk", "gm, problemer.", "gm! var her 8:55", "gm", "gm", "gm", "Gm", "God dagen! ☀️", "God morgen 🙂", "God morgen fra hjemmekontoret!", "God morgen fra HK. 🙂", "God morgen Hjemmekontor", "God morgen hk", "god morgen, var her 8.30, glemte å skrive", "god morgen", "Goooooooooood mornin' everyone 🙂", "hei", "Hei", "Litt forsinket gm", "Morn hk", "morn! 😄", "morn!!!! 😄", "Morn", "mornings hk!", "Mornings!", "sein gm", "Sein God Morgen",]

const generateMessages = (from = 1711437958000, to = 1711445158000) => {
  // Create empty array
  let output = []

  // Limit attendants
  const iterations = getRandomNumberBetween(15, 25)

  // Random item from array helper function
  Array.prototype.random = function () {
    return this[Math.floor(( Math.random() * this.length ))]
  }

  // Loop over array of names and generate a message for each "person", push messages into output array
  for (let i = 0; i < iterations; i++) {
    let obj = {}
    obj.discord_id = "10779186537077111" + getRandomNumberBetween(10, 99)
    // obj.discord_username = names[getRandomNumberBetween(0, names.length)]
    obj.discord_username = names.random()
    obj.date = new Date(getRandomNumberBetween(from, to))
    obj.message = getRandomFromArray(messages)
    output.push(obj)
  }

  // Sort array by date to simulate ordinary functionality
  output.sort((a, b) => a.date - b.date)

  // Return array of messages
  return output
}

export default generateMessages