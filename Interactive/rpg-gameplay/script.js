/* --- CONFIG & DATA --- */
const TILE_SIZE = 48;
const MAP_W = 20;
const MAP_H = 20;

// LEGEND:
// 0:Water, 1:Grass, 2:Tree, 3:Chest, 4:Slime, 5:Bridge 
// 7:Signpost (Hint), 8:Holy Sword (Secret), 9:BOSS

const mapLayout = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0],
    [0,2,1,1,1,1,1,2,0,0,0,2,0,0,0,0,0,0,0,0], // Row 2: Spawn Area
    [0,2,1,3,1,4,1,2,0,0,0,2,0,0,0,0,0,0,0,0], // Row 3: Chest #1 (3,3)
    [0,2,1,1,1,1,1,2,0,0,0,2,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,1,1,2,2,2,2,7,0,0,0,2,2,2,2,0], // Row 5: Signpost (7) at (11,5) - Safe spot
    [0,2,0,0,0,1,1,4,1,1,1,1,5,5,5,1,1,1,2,0], // Row 6: Path to Bridge (5)
    [0,2,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,9,2,0], // Row 7: Boss (9) at (17,7)
    [0,2,2,2,1,1,3,1,1,4,1,2,0,0,0,1,1,1,2,0], // Row 8: Chest #2 (6,8)
    [0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,2,2,2,2,0], // Row 9: Path connection
    [0,2,1,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0], // Row 10: Secret Path Entrance
    [0,2,1,1,1,3,1,1,1,1,2,0,0,0,0,0,0,0,0,0], // Row 11: Secret Path + Chest #3 (5,11)
    [0,2,2,2,2,2,2,2,2,1,2,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,2,1,2,0,0,0,0,0,0,0,0,0], 
    [0,2,2,2,2,2,2,2,2,1,2,0,0,0,0,0,0,0,0,0], 
    [0,2,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0], // Row 15: Long path left
    [0,2,1,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0], 
    [0,2,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Row 17: Path down
    [0,2,8,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Row 18: Sword (8) at (2,18)
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const chestData = [
    { id: 0, title: "PROJECT: E-SHOP", desc: "A MERN stack application.<br><strong>Skill: JS Lightning!</strong>", skill: { name: "JS Lightning", dmg: 45, isSecret: false } },
    { id: 1, title: "PROJECT: PORTFOLIO", desc: "This RPG website.<br><strong>Skill: CSS Shield Bash!</strong>", skill: { name: "CSS Bash", dmg: 35, isSecret: false } },
    { id: 2, title: "ABOUT ME", desc: "I solve bugs for a living.<br><strong>Skill: Py Fireball!</strong>", skill: { name: "Py Fireball", dmg: 60, isSecret: false } }
];

const secretSkill = { name: "sudo rm -rf /", dmg: 99999, isSecret: true };

/* --- STATE --- */
let player = { x: 2, y: 3, hp: 100, maxHp: 100, skills: [] };
let battleState = { active: false, enemy: null, turn: 'player' };
let chestIndex = 0;
let secretFound = false;

/* --- DOM --- */
const worldMap = document.getElementById('world-map');
const hero = document.getElementById('hero');
const battleScreen = document.getElementById('battle-screen');
const combatLog = document.getElementById('combat-log');
const dialogueBox = document.getElementById('dialogue-box');

/* --- INIT --- */
function initGame() {
    renderMap();
    updatePlayerPos();
}

function renderMap() {
    const terrain = document.getElementById('terrain-layer');
    const objects = document.getElementById('object-layer');
    
    terrain.innerHTML = '';
    objects.innerHTML = '';

    for(let y=0; y<MAP_H; y++){
        for(let x=0; x<MAP_W; x++){
            const type = mapLayout[y][x];
            
            // Terrain
            const tile = document.createElement('div');
            tile.style.left = x*TILE_SIZE+'px'; 
            tile.style.top = y*TILE_SIZE+'px';
            
            if(type===5) tile.className = 'tile bridge';
            else if(type===0) tile.className = 'tile water';
            else tile.className = 'tile grass';
            
            terrain.appendChild(tile);
            
            // Objects
            if([2,3,4,7,8,9].includes(type)){
                const obj = document.createElement('div');
                obj.className = 'tile';
                obj.style.left = x*TILE_SIZE+'px'; 
                obj.style.top = y*TILE_SIZE+'px';
                if(type===2) obj.classList.add('tree');
                if(type===3) { obj.classList.add('chest'); obj.id=`chest-${x}-${y}`; }
                if(type===4) { obj.classList.add('slime'); obj.id=`enemy-${x}-${y}`; }
                if(type===7) { obj.classList.add('sign'); }
                if(type===8) { obj.classList.add('holy-sword'); obj.id=`sword`; } // Sword
                if(type===9) { obj.classList.add('boss'); obj.id=`boss-${x}-${y}`; }
                objects.appendChild(obj);
            }
        }
    }
}

/* --- INPUT --- */
document.addEventListener('keydown', e => {
    if (!dialogueBox.classList.contains('hidden')) {
        if (e.key === " " || e.key === "Enter") closeDialogue();
        return; 
    }
    if(battleState.active) return; 
    
    let dx=0, dy=0;
    if(e.key==="ArrowUp") dy=-1;
    if(e.key==="ArrowDown") dy=1;
    if(e.key==="ArrowLeft") dx=-1;
    if(e.key==="ArrowRight") dx=1;
    if(e.key===" " || e.key==="Enter") { checkInteraction(); return; }

    if(dx!==0 || dy!==0) movePlayer(dx, dy);
});

/* --- MOVEMENT --- */
function movePlayer(dx, dy) {
    const nx = player.x + dx;
    const ny = player.y + dy;
    
    if(nx<0 || nx>=MAP_W || ny<0 || ny>=MAP_H) return;
    const tile = mapLayout[ny][nx];
    
    // Blocked: Water(0), Tree(2), Chest(3), Sword(8), Boss(9), Sign(7)
    if(tile === 0 || tile === 2 || tile === 3 || tile === 7 || tile === 8 || tile === 9) return; 
    
    if(tile === 4) { startBattle('slime', nx, ny); return; }

    player.x = nx; player.y = ny;
    updatePlayerPos();
}

function updatePlayerPos() {
    hero.style.left = player.x * TILE_SIZE + 'px';
    hero.style.top = player.y * TILE_SIZE + 'px';
    
    const camX = -player.x*TILE_SIZE + window.innerWidth/2 - TILE_SIZE/2;
    const camY = -player.y*TILE_SIZE + window.innerHeight/2 - TILE_SIZE/2;
    worldMap.style.transform = `translate(${camX}px, ${camY}px)`;
}

/* --- INTERACTION --- */
function checkInteraction() {
    const neighbors = [{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];
    for(let n of neighbors){
        const tx = player.x+n.x, ty = player.y+n.y;
        if(tx<0||tx>=MAP_W||ty<0||ty>=MAP_H) continue;
        
        const type = mapLayout[ty][tx];
        
        if(type === 3) { openChest(tx, ty); return; }
        if(type === 7) { 
            showDialogue("WARNING SIGN", "BOSS IMMUNITY DETECTED!", "Rumors say the Ancient Weapon lies far in the <strong>Deep South-West</strong>."); 
            return; 
        }
        if(type === 8) { tryGetSword(); return; }
        if(type === 9) { startBattle('boss', tx, ty); return; }
    }
}

function showDialogue(title, text, reward="") {
    document.getElementById('d-title').innerText = title;
    document.getElementById('d-content').innerHTML = text;
    document.getElementById('d-reward').innerText = reward;
    dialogueBox.classList.remove('hidden');
}

function openChest(x, y) {
    const chestEl = document.getElementById(`chest-${x}-${y}`);
    if(!chestEl) return;
    
    const data = chestData[chestIndex % chestData.length];
    showDialogue(data.title, data.desc, "SKILL UNLOCKED: " + data.skill.name);
    
    player.skills.push(data.skill);
    document.getElementById('skill-count').innerText = player.skills.length;
    
    chestEl.remove();
    mapLayout[y][x] = 1; 
    chestIndex++;
}

function tryGetSword() {
    if(secretFound) {
        showDialogue("LEGENDARY SWORD", "You already possess the ultimate power.", "");
        return;
    }

    if(player.skills.length < 3) {
        showDialogue("SEALED", "The sword is stuck!", "HINT: View all 3 Projects (Chests) to wield it.");
    } else {
        showDialogue("SYSTEM HACKED", "Authentication Success!", "ULTIMATE SKILL: [sudo rm -rf /] ACQUIRED.");
        player.skills.push(secretSkill);
        secretFound = true;
        
        const swordEl = document.getElementById('sword');
        if(swordEl) swordEl.style.opacity = "0.3"; 
    }
}

window.closeDialogue = function() {
    dialogueBox.classList.add('hidden');
}

/* --- BATTLE SYSTEM --- */
function startBattle(type, x, y) {
    battleState.active = true;
    battleState.enemyPos = {x, y};
    battleScreen.classList.remove('hidden');
    
    const enemySprite = document.getElementById('enemy-sprite');
    const enemyName = document.getElementById('enemy-name');
    
    if(type === 'boss') {
        battleState.enemy = { name: "BUG KING", hp: 9999, maxHp: 9999, dmg: 50, isBoss: true };
        enemySprite.classList.add('boss-mode');
        enemyName.innerText = "BUG KING (BOSS)";
        if(!secretFound) {
            logCombat("ALERT: Your attacks deal 0 DMG! Find the Weapon!");
        }
    } else {
        battleState.enemy = { name: "GLITCH SLIME", hp: 80, maxHp: 80, dmg: 10, isBoss: false };
        enemySprite.classList.remove('boss-mode');
        enemyName.innerText = "GLITCH SLIME";
    }
    
    player.hp = player.maxHp;
    updateBattleUI();
    renderMagicMenu();
    if(type !== 'boss') logCombat(`Battle Started!`);
}

function renderMagicMenu() {
    const menu = document.getElementById('magic-menu');
    menu.innerHTML = '';
    player.skills.forEach(skill => {
        const btn = document.createElement('button');
        btn.className = 'skill-btn';
        if(skill.isSecret) btn.classList.add('secret-btn'); 
        btn.innerText = skill.name;
        btn.onclick = () => battleAction('skill', skill);
        menu.appendChild(btn);
    });
}

window.battleAction = function(type, skillData = null) {
    if(battleState.turn !== 'player') return;

    let dmg = 0;
    let text = "";

    if(type === 'attack') {
        if(battleState.enemy.isBoss && !secretFound) dmg = 0; 
        else dmg = 15;
        text = `Basic Attack! ${dmg} DMG.`;
    } else if (type === 'skill') {
        if(battleState.enemy.isBoss && !secretFound && !skillData.isSecret) {
            dmg = 0; 
            text = "ACCESS DENIED! Boss is immune!";
        } else {
            dmg = skillData.dmg;
            if(skillData.isSecret) text = `SUDO DELETE! <br>SYSTEM PURGED! ${dmg} DMG!`;
            else text = `Cast ${skillData.name}! ${dmg} DMG.`;
        }
    }

    const heroSprite = document.getElementById('hero-battle-sprite');
    heroSprite.classList.add('shake');
    setTimeout(()=>heroSprite.classList.remove('shake'), 500);

    battleState.enemy.hp -= dmg;
    logCombat(text);
    updateBattleUI();

    if(battleState.enemy.hp <= 0) {
        setTimeout(winBattle, 1000);
    } else {
        battleState.turn = 'enemy';
        setTimeout(enemyTurn, 1200);
    }
}

function enemyTurn() {
    const enemy = battleState.enemy;
    const enemySprite = document.getElementById('enemy-sprite');
    enemySprite.classList.add('shake');
    setTimeout(()=>enemySprite.classList.remove('shake'), 500);

    player.hp -= enemy.dmg;
    logCombat(`${enemy.name} attacks! You took ${enemy.dmg} DMG.`);
    updateBattleUI();

    if(player.hp <= 0) {
        logCombat("GAME OVER... Refresh page.");
    } else {
        battleState.turn = 'player';
    }
}

function updateBattleUI() {
    const ePct = Math.max(0, (battleState.enemy.hp / battleState.enemy.maxHp) * 100);
    document.getElementById('enemy-hp-bar').style.width = ePct + '%';
    document.getElementById('player-hp-bar').style.width = Math.max(0, (player.hp / player.maxHp) * 100) + '%';
}

function logCombat(msg) {
    combatLog.innerHTML = `> ${msg}`;
}

function winBattle() {
    battleState.active = false;
    battleScreen.classList.add('hidden');
    const {x, y} = battleState.enemyPos;
    
    if(battleState.enemy.isBoss) {
        alert("MISSION ACCOMPLISHED! You are Hired!");
        document.getElementById(`boss-${x}-${y}`).remove();
    } else {
        document.getElementById(`enemy-${x}-${y}`).remove();
    }
    mapLayout[y][x] = 1; 
}

initGame();