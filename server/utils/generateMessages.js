import { getRandomFromArray, getRandomNumberBetween } from "../random.js"

// Array of names, affixes and messages
const names = ["Olivia","Emma","Ella","Leah","Sofie","Nora","Sofia","Maja","Alma","Ada","Lucas","Noah","Isak","Oliver","Kasper","Elias","Emil","Jakob","Oskar","Teodor","Marius","Erik","Stian","Camilla","Katerina","Espen"]
const namesAffix = ["-B04", "-B08", "-B10", "-B12"]
const messages = [ "Glemte å si god morgen", "glemte gm, kom hel.", "Gm fra hk", "Gm fra HK", "gm hk", "gm hk", "gm hk", "Gm hk", "gm, problemer.", "gm! var her 8:55", "gm", "gm", "gm", "Gm", "God dagen! ☀️", "God morgen 🙂", "God morgen fra hjemmekontoret!", "God morgen fra HK. 🙂", "God morgen Hjemmekontor", "God morgen hk", "god morgen, var her 8.30, glemte å skrive", "god morgen", "Goooooooooood mornin' everyone 🙂", "hei", "Hei", "Litt forsinket gm", "Morn hk", "morn! 😄", "morn!!!! 😄", "Morn", "mornings hk!", "Mornings!", "sein gm", "Sein God Morgen",]

const generateMessages = (start = 1711437958000, end = 1711445158000) => {
  // Create empty array
  let output = []

  // Loop over array of names and generate a message for each "person", push messages into output array
  for (let i = 0; i < names.length; i++) {
    let obj = {}
    obj.user_ref = "10779186537077111" + getRandomNumberBetween(10, 99)
    obj.user_name = names[i] + getRandomFromArray(namesAffix)
    obj.date = new Date(getRandomNumberBetween(start, end))
    obj.message = getRandomFromArray(messages)
    output.push(obj)
  }

  // Sort array by date to simulate ordinary functionality
  output.sort((a, b) => a.date - b.date)

  // Return array of messages
  return output
}

export default generateMessages