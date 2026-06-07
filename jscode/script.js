'use strict'

import { ClassicGame } from './classic__game.js';
import { HardcoreGame } from './hardcore__game.js';
// import { SpecialGame } from './special__game.js';

globalThis.colors = {
  color_1: "#6420AA",
  color_2: "#FF3EA5",
  color_3: "#FF7ED4",
  color_4: "#FFB5DA",
  color_5: "#8FD14F",
  color_6: "#F5F5F5"
};

// SOUNDS

window.backgroundMusic = new Audio("./sounds/background-Neon-Nights.mp3");
window.backgroundMusic.loop = true;
window.backgroundMusic.volume = 0.5;

const muteBtn = document.getElementById('mute-btn');
const effectsBtn = document.getElementById('effects-btn');
const volumeSlider = document.getElementById('volume-slider');

let isMuted = false;
let effectsEnabled = true;

window.audioSettings = {
  musicEnabled: true,
  effectsEnabled: true,
  volume: 0.5
};

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  if (window.backgroundMusic) {
    window.backgroundMusic.muted = isMuted;
  }
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
  window.isMuted = isMuted;
});

effectsBtn.addEventListener('click', () => {
  effectsEnabled = !effectsEnabled;
  window.audioSettings.effectsEnabled = effectsEnabled;
  effectsBtn.textContent = effectsEnabled ? '🎵 FX On' : '🚫 FX Off';
});

volumeSlider.addEventListener('input', (e) => {
  const volume = parseFloat(e.target.value);
  if (window.backgroundMusic) {
    window.backgroundMusic.volume = volume;
    window.backgroundMusic.muted = volume === 0;
  }
  isMuted = volume === 0;
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
  window.isMuted = isMuted;
});

// MENU SWITCHING

const menuAside = document.querySelectorAll('.menu-aside svg');
const menus = document.querySelectorAll('aside[class^="menu-"]:not(.menu-aside)');

function showTargetMenuWithAnimation(menuElement) {
  menuElement.style.display = "flex";
  gsap.fromTo(menuElement,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power1.out"
    }
  );
}
menuAside.forEach(clickedButton => {
  clickedButton.addEventListener('click', () => {
    menuAside.forEach(btn => {
      btn.classList.remove('active');
      btn.querySelector("path").classList.remove('active');
    });
    clickedButton.classList.add('active');
    clickedButton.querySelector("path").classList.add('active');

    const targetMenu = clickedButton.dataset.menuasidebtn;
    const targetAsideMenu = document.querySelector(`.${targetMenu}`);
    menus.forEach(menu => {
      if (menu !== targetAsideMenu && menu.style.display !== "none") {
        gsap.to(menu, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power1.in",
          onComplete: () => {
            menu.style.display = "none";
            showTargetMenuWithAnimation(targetAsideMenu);
          }
        });
      }
    });
  });
});

// Choosing the mode, difficulty level and snake skin in menu-play
const gameModeSection = document.querySelectorAll('.menu-play .game-mode-section .button-style');
const levelSection = document.querySelectorAll('.menu-play .level-section .button-style');
const snakeSkins = document.querySelectorAll('.menu-play .snake-version-section > div');

let gameMode = "classic";
let gameSpeed = 100;
let snakeSkin = {
  type: 'color',
  background: colors.color_3,
  border: colors.color_2
};

gameModeSection.forEach(clickedButton => {
  clickedButton.addEventListener('click', () => {
    gameModeSection.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    gameMode = clickedButton.textContent.toLowerCase();

    if (gameMode === 'hardcore') {
      levelSection.forEach(btn => {
        const isExpert = btn.textContent.toLowerCase() === 'expert';
        btn.classList.toggle('active', isExpert);
      })
      gameSpeed = 50;
    }
  });
});

levelSection.forEach(clickedButton => {
  clickedButton.addEventListener('click', () => {
    if (gameMode === 'hardcore') return;

    levelSection.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    const level = clickedButton.textContent.toLowerCase();
    if (level === 'beginner') gameSpeed = 100;
    if (level === 'advanced') gameSpeed = 75;
    if (level === 'expert') gameSpeed = 50;
  });
});

snakeSkins.forEach(clickedSkin => {
  clickedSkin.addEventListener('click', () => {
    snakeSkins.forEach(btn => {
      btn.classList.remove('active');
    })
    clickedSkin.classList.add('active');
    snakeSkin.type = clickedSkin.dataset.snakeskintype;
    snakeSkin.background = clickedSkin.dataset.snakeskinbackground;
    snakeSkin.border = clickedSkin.dataset.snakeskinborder;
  })
})


// the chain of events after pressing the start button
const startBtn = document.querySelector(".start-button");
startBtn.addEventListener("click", function () {

  startBtn.classList.add('active');
  gsap.timeline()
    .to(".snake-title", {
      opacity: 0,
      scale: 0.8,
      duration: .2,
      ease: "power1.out",
      onComplete: function () {
        document.querySelector(".snake-title").style.display = "none";
      }
    })
    .to(".rating", {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power1.out",
      onComplete: function () {
        document.querySelector(".rating-container").style.display = "none";
      }
    })
    .to(".menu", {
      opacity: 0,
      scale: 0.8,
      duration: 0.1,
      ease: "power1.out",
      onComplete: function () {
        gsap.to(".menu-container", {
          opacity: 0,
          scale: 0.6,
          duration: 0.2,
          ease: "power1.out",
          onComplete: function () {
            startBtn.classList.remove('active');
            document.querySelector(".menu-container").style.display = "none";
            document.querySelector(".flex-container").style.height = "100%";
            document.querySelector(".flex-container").style.width = "100%";
            gsap.set(".snake-field__container", { display: "flex" });
          }
        });
      }
    })
    .to(".snake-field__container", {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    })
    .add(() => {
      document.querySelector(".snake-field").style.display = "flex";
      document.querySelector(".score-in-square").style.display = "flex";
      document.querySelector(".time-in-square").style.display = "flex";
    })
    .to(".snake-field", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    }, "+=0.2")
    .to(".time-in-square", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
      onComplete: function () {
        startGame(snakeSkin, gameSpeed, gameMode);
      }
    }, "+=0.2")
    .to(".score-in-square", {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    }, "+=0.2");
});
/**
 * Launches the selected game mode and starts the game.
 *
 * @param {Object} snakeSkin - Object containing snake appearance settings (color or image).
 * @param {number} gameSpeed - Speed of the game (interval in ms for snake movement).
 * @param {string} gameMode - Selected game mode ('classic', 'hardcore', 'special').
 */
function startGame(snakeSkin, gameSpeed, gameMode) {
  if (window.backgroundMusic && !window.backgroundMusic.paused) {
    window.backgroundMusic.pause();
    window.backgroundMusic.currentTime = 0;
  }


  let musicPath = "./sounds/NeonNightsClassic.mp3";
  if (gameMode === "hardcore") {
    musicPath = "./sounds/Untitled.mp3";
  }

  if (!window.isMuted) {
    window.backgroundMusic = new Audio(musicPath);
    window.backgroundMusic.loop = true;
    window.backgroundMusic.volume = document.getElementById('volume-slider').value || 0.5;
    window.backgroundMusic.play();
  }
  if (gameMode === "classic") {
    const classicMode = new ClassicGame(snakeSkin, gameSpeed, gameMode);
    classicMode.start();
  }
  if (gameMode === "hardcore") {
    const hardcoreMode = new HardcoreGame(snakeSkin, gameMode);
    hardcoreMode.start();
  }
  // if(gameMode === "special") {
  //     const specialGame = new SpecialGame(snakeSkin, gameSpeed, gameMode);
  //     specialGame.start();
  // } 
  // if(gameMode === "pvp") pvpGame(gameSpeed, snakeSkin);
}

export function goToMenu() {
  const tl = gsap.timeline();
  tl.to(".score-in-square", {
    opacity: 0,
    y: 30,
    duration: 0.2,
    ease: "power2.in"
  })
    .to(".time-in-square", {
      opacity: 0,
      y: 30,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.1")
    .to(".snake-field", {
      opacity: 0,
      y: 30,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        document.querySelector(".snake-field").style.display = "none";
        document.querySelector(".score-in-square").style.display = "none";
        document.querySelector(".time-in-square").style.display = "none";

        document.querySelector(".menu-container").style.display = "flex";
        document.querySelector(".flex-container").style.height = "70%";
        document.querySelector(".flex-container").style.width = "85%";
        document.querySelector(".snake-title").style.display = "block";
        document.querySelector(".rating-container").style.display = "block";
        gsap.set(".menu", { display: "flex" });
      }
    })
    .to(".snake-field__container", {
      opacity: 0,
      scale: 0.6,
      duration: 0.2,
      ease: "power2.in",
      onComplete: function () {
        gsap.set(".snake-field__container", { display: "none" });
      }
    })
    .to(".menu-container", {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(".menu", {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power1.out"
    })
    .to(".rating-container", {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power1.out"
    })
    .to(".snake-title", {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
      onComplete: function () {
        document.querySelector(".score").textContent = 0;
        document.querySelector(".time").textContent = "READY?";
      }
    });
}

// Authorization removed for public demo version

// A function for sending a record update request (disabled in public demo)
export async function updateHighScore(mode, difficulty, score) {
  // Scores are not saved in this demo version
  console.log(`Game mode: ${mode}, difficulty: ${difficulty}, score: ${score}`);
}

// Ranking disabled in public demo (no database)
// Choosing the mode, difficulty level and snake skin in menu-rating - demo version without ranking
const gameModeSectionInRating = document.querySelectorAll('.menu-rating .game-mode-section .button-style');
const levelSectionInRating = document.querySelectorAll('.menu-rating .level-section .button-style');
let gameModeInRating;
let gameLevelInRating;

gameModeSectionInRating.forEach(clickedButton => {
  clickedButton.addEventListener('click', () => {
    gameModeSectionInRating.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    gameModeInRating = clickedButton.textContent.toLowerCase();

    if (gameModeInRating === 'hardcore') {
      levelSectionInRating.forEach(btn => {
        const isExpert = btn.textContent.toLowerCase() === 'expert';
        levelSectionInRating.forEach(btn => btn.classList.remove('active'));
        btn.classList.toggle('active', isExpert);
        gameLevelInRating = 'expert';
      })
    }
  });
});

levelSectionInRating.forEach(clickedButton => {
  clickedButton.addEventListener('click', () => {
    if (gameModeInRating === 'hardcore') return;

    levelSectionInRating.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    gameLevelInRating = clickedButton.textContent.toLowerCase();
  });
});

document.getElementById('showTableBtn').addEventListener('click', () => {
  if (gameModeInRating != undefined && gameLevelInRating != undefined) {
    // In demo version, just clear the table and show message
    const tableBody = document.querySelector('.rating-table tbody');
    if (tableBody) {
      tableBody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 10px;">No database in demo version</td></tr>';
    }
    document.getElementById('gameModeSpan').textContent = `game mode: ${gameModeInRating}`;
    document.getElementById('gameLevelSpan').textContent = `game level: ${gameLevelInRating}`;
  }
})

