console.log("done")
// variabel hiragana berisi array yang berisi objek
const hiraganaText= document.querySelector(".hiragana")
const submitBtn = document.querySelector(".submit")
const nextBtn = document.querySelector(".next")
const result = document.querySelector(".result")
const answer = document.querySelector(".answer")
//const kocak = document.querySelector(".kocak")
const showBtn = document.querySelector(".show")
const answered = document.querySelector(".answered")
const answeredPa = document.querySelector(".answered-parrent")
const switchBtn = document.querySelector(".switch")
const title = document.querySelector(".title")
let kana = ""
let roumaji = ""
const INDEXED = 1
let isHiragana = true
let isKatakana = false
let isSubmit = false

initialitazion()

function randint(a, b){
  return Math.floor( Math.random() * (b - a + 1)) + a
}

function randomHiragana(){
  const length = isHiragana ? hiragana.length : katakana.length
  const randomNum =  randint(0, length - INDEXED)
  const language = isHiragana ? hiragana[randomNum] : katakana[randomNum]
  kana = language.kana
  roumaji = language.roumaji
}
function displayHiragana(){
  randomHiragana()
  hiraganaText.innerText = kana
}
function initialitazion(){
  displayHiragana()
  submitBtn.addEventListener("click", submit)
  nextBtn.addEventListener("click", next)
  //kocak.addEventListener("click", soundRandom)
  showBtn.addEventListener("click", show)
  switchBtn.addEventListener("click", switchFunc)
}
function correction() {
  const answerCorrect = answer.value.toLowerCase().trim()
  return (answerCorrect === roumaji) ? true : false
}
function submit() {
  isCorrect = correction()
  result.innerText = isCorrect ? "correct" : "incorrect"
  result.style.color = isCorrect ? "#99ff9a" : "#ff9999"
  playSound(isCorrect)
  isSubmit = true
  showBtn.classList.remove("opacity-50")
  result.classList.remove("opacity-50")
}
function next() {
  displayHiragana()
  result.innerText = "."
  result.style.color = ""
  answered.innerText = ""
  answer.value = ""
  isSubmit = false
  showBtn.classList.add("opacity-50")
  result.classList.add("opacity-50")
  answeredPa.classList.add("opacity-50")
}

function playSound(isTrue){
  const random = isCorrect ? randint(0, correctSounds.length - INDEXED) : randint(0, incorrectSounds.length - INDEXED)
  const sound = isCorrect ? correctSounds[random] :  incorrectSounds[random]
  const direct = isCorrect ? "benar" : "salah"
  const src = `../../src/sound/${direct}/${sound}.mp3`
  const audio = new Audio(src)
  audio.play()
}

let isPlay = false
let musics = []
function soundRandom(){
  isPlay = !isPlay
  console.log(isPlay)
  const sound = `../../src/sound/random/${randomSounds[randint(0, randomSounds.length - INDEXED)]}.mp3`
  const audio = new Audio(sound)
  musics.push(audio)
  document.querySelector(".console").innerText = musics
  isPlay ? audio.play() : musics.shift().pause()
}

function show() {
  if(!isSubmit) { return 0}
  answered.innerText = roumaji
  answeredPa.classList.remove("opacity-50")
}

function switchFunc() {
  isHiragana = !isHiragana
  isKatakana = !isHiragana
  title.innerText = isHiragana ? "Hiragana" : isKatakana ? "Katakana" : 0
  switchBtn.innerText = isHiragana ? "あ" : isKatakana ? "ァ" : "hai"
}

