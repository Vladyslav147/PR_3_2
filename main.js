
function greet() {
  return `Привіт, моє ім'я — ${this.name}!`;
}


function changeHP(count) {
  this.damageHP += count;

  if (this.damageHP > this.defaultHP) {
    this.damageHP = this.defaultHP;
  }


  this.renderHP();
}


function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  const currentHP = this.defaultHP - this.damageHP;
  this.elHP.innerText = `${currentHP} / ${this.defaultHP} HP`;
}

function renderProgressbarHP() {
  const currentHP = this.defaultHP - this.damageHP;
  const percent = (currentHP / this.defaultHP) * 100;
  this.elProgressBar.style.width = `${percent}%`;

  // Зміна кольору смужки залежно від рівня здоров'я
  if (percent > 50) {
    this.elProgressBar.style.backgroundColor = '#2ed573';
  } else if (percent > 20) {
    this.elProgressBar.style.backgroundColor = '#ffa502';
  } else {
    this.elProgressBar.style.backgroundColor = '#ff4757';
  }
}



const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 0,
  elHP: document.getElementById('health-character'),
  elProgressBar: document.getElementById('progressbar-character'),

  greet: greet,
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 0,
  elHP: document.getElementById('health-enemy'),
  elProgressBar: document.getElementById('progressbar-enemy'),

  greet: greet,
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
};

const logsEl = document.getElementById('logs');
const attackBtn = document.getElementById('btn-attack');
const restartBtn = document.getElementById('btn-restart');

function logMessage(msg) {
  const p = document.createElement('p');
  p.className = 'log-item';
  p.innerText = msg;
  logsEl.prepend(p);
}

function randomDamage(max = 20) {
  return Math.ceil(Math.random() * max);
}


document.getElementById('btn-character-greet').addEventListener('click', () => {
  logMessage(character.greet());
});

document.getElementById('btn-enemy-greet').addEventListener('click', () => {
  logMessage(enemy.greet());
});

// Кнопка атаки
attackBtn.addEventListener('click', () => {
  const dmgToEnemy = randomDamage(20);
  const dmgToCharacter = randomDamage(15);

  enemy.changeHP(dmgToEnemy);
  logMessage(`${character.name} завдав ${dmgToEnemy} урону по ${enemy.name}!`);

  const enemyCurrentHP = enemy.defaultHP - enemy.damageHP;
  if (enemyCurrentHP <= 0) {
    logMessage(`🏆 ${character.name} переміг у битві!`);
    attackBtn.disabled = true;
    return;
  }

  // Контратака супротивника
  character.changeHP(dmgToCharacter);
  logMessage(`${enemy.name} завдав у відповідь ${dmgToCharacter} урону по ${character.name}!`);

  const charCurrentHP = character.defaultHP - character.damageHP;
  if (charCurrentHP <= 0) {
    logMessage(`💀 ${character.name} зазнав поразки!`);
    attackBtn.disabled = true;
  }
});

// Перезапуск гри
restartBtn.addEventListener('click', () => {
  character.damageHP = 0;
  enemy.damageHP = 0;
  character.renderHP();
  enemy.renderHP();
  logsEl.innerHTML = '';
  attackBtn.disabled = false;
  logMessage('Бій розпочато з початку!');
});


character.renderHP();
enemy.renderHP();
logMessage('Гра готова. Натисніть «Атакувати» або «Привітатися».');