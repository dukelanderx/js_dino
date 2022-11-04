import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const hampterElem = document.querySelector("[data-hampter]")
const JUMP_SPEED = .45
const GRAVITY = 0.0015
const HAMPTER_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let hampterFrame
let currentFrameTime
let yVelocity
export function setupHampter() {
    isJumping = false
    hampterFrame = 0
    currentFrameTime = 0
    yVelocity = 0;
    setCustomProperty(hampterElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateHampter(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getHampterRect() {
    return hampterElem.getBoundingClientRect()
}

export function setHampterLose() {
    hampterElem.src = "imgs/dino-lose.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        hampterElem.src = `imgs/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        hampterFrame = (hampterFrame + 1) % HAMPTER_FRAME_COUNT
        hampterElem.src = `imgs/dino-run-${hampterFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(hampterElem, "--bottom", yVelocity * delta)
    
    if (getCustomProperty (hampterElem, "--bottom") <= 0) {
        setCustomProperty(hampterElem, "--bototm", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}