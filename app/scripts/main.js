/*global ut */
var term, eng; // Can't be initialized yet because DOM is not ready
var pl = { x: 3, y: 2 }; // Player position
var updateFOV; // For some of the examples
var map = [
"Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ----Ÿ",
"‡                                                                          ‡‡‡‡‡‡",
"‡‡                                                                          ‡‡‡‡‡",
"‡‡                               ______       ,,,,,  ,,,,,                   ‡‡‡ ",
"‡‡                              /-\\\\\\\\\\\\     ,,,,,  ,,,,,                   ‡‡‡  ",
"‡‡‡                             |=|____|    ,,,,,  ,,,,,                  ‡‡‡    ",
"‡‡‡                                                                     ‡‡‡      ",
" ‡‡‡                                                                  ‡‡‡        ",
"  ‡‡‡‡                                                                ‡‡‡        ",
"     ‡‡‡‡‡                                                          ‡‡‡          ",
"        ‡‡‡‡‡‡                                                 ‡‡‡‡‡‡            ",
"            ‡‡‡‡                                              ‡‡‡                ",
"               ‡‡‡‡                                        ‡‡‡                   ",
"                 ‡‡‡‡‡‡‡‡‡                           ‡‡‡‡‡‡‡‡                    ",
"                    ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡\\O/‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡                       "];


var map = [
"▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
"▒▒       ▒▒▒▒▒       ▒▒",
"▒▒       ▒▒▒▒▒        O",
"▒▒-^-    ▒▒▒▒▒       ▒▒",
"▒▒o__    ▒▒▒▒▒       ▒▒",
"▒▒       ▒▒▒▒▒    ---▒▒",
"▒▒       ▒▒▒▒▒  oxc  ▒▒",                 
"▒▒                   ▒▒",
"▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒"
];
// thousands of Tiles on the fly.
var AT = new ut.Tile("Y", 255, 255, 255);
var TREE = new ut.Tile('‡', 0, 140, 40);
var FLOOR = new ut.Tile('.', 50, 50, 50);
var WALL = new ut.Tile('|', 255, 0, 0);
var RANGLE = new ut.Tile('/', 100, 100, 100);
var LANGLE = new ut.Tile('\\', 100, 100, 100);
var FLAT = new ut.Tile('_', 100, 100, 100);
var DOOR = new ut.Tile('=', 168, 123, 63);
var CAVE = new ut.Tile('O', 100, 100, 100);
var TILL = new ut.Tile(',', 140, 80, 0);
var POWER = new ut.Tile('Ÿ', 204, 204, 0);
var WIRE = new ut.Tile('-', 102, 102, 0);
var CAVEWALL = new ut.Tile('▒', 100, 100, 100);
var FIRE = new ut.Tile('^', 255, 155, 0);
var SKELHEAD = new ut.Tile('o', 255, 255, 255);
var SKELBODY = new ut.Tile('x', 255, 255, 255);
var SKELLEGS = new ut.Tile('c', 255, 255, 255);

// Returns a Tile based on the char array map
function getDungeonTile(x, y) {
	var t = "";
	try { t = map[y][x]; }
	catch(err) { return ut.NULLTILE; }
	if (t === '‡') return TREE;
	if (t === ' ') return FLOOR;
	if (t === '|') return WALL;
	if (t === '/') return RANGLE;
	if (t === '\\') return LANGLE;
	if (t === '_') return FLAT;
	if (t === '=') return DOOR;
	if (t === 'O') return CAVE;
	if (t === ',') return TILL;
	if (t === 'Ÿ') return POWER;
	if (t === '-') return WIRE;
	if (t === '▒') return CAVEWALL;
	if (t === '^') return FIRE;
	if (t === 'o') return SKELHEAD;
	if (t === 'c') return SKELLEGS;
	if (t === 'x') return SKELBODY;
	return ut.NULLTILE;
}

// "Main loop"
function tick() {
	if (updateFOV) updateFOV(pl.x, pl.y); // Update field of view (used in some examples)
	eng.update(pl.x, pl.y); // Update tiles
	term.put(AT, term.cx, term.cy); // Player character
	term.render(); // Render
}

// Key press handler - movement & collision handling
function onKeyDown(k) {
	var movedir = { x: 0, y: 0 }; // Movement vector
	if (k === ut.KEY_LEFT || k === ut.KEY_H) movedir.x = -1;
	else if (k === ut.KEY_RIGHT || k === ut.KEY_L) movedir.x = 1;
	else if (k === ut.KEY_UP || k === ut.KEY_K) movedir.y = -1;
	else if (k === ut.KEY_DOWN || k === ut.KEY_J) movedir.y = 1;
	if (movedir.x === 0 && movedir.y === 0) return;
	var oldx = pl.x, oldy = pl.y;
	pl.x += movedir.x;
	pl.y += movedir.y;
	if (eng.tileFunc(pl.x, pl.y).getChar() !== '.') { pl.x = oldx; pl.y = oldy; console.log('ow')}
	if (eng.tileFunc(pl.x, pl.y - 1).getChar() === '=') { initEffect(); }
	tick();
}

// Initialize stuff
function initSimpleDungeon() {
	window.setInterval(tick, 50); // Animation
	// Initialize Viewport, i.e. the place where the characters are displayed
	term = new ut.Viewport(document.getElementById("game"), 60, 15);
	// Initialize Engine, i.e. the Tile manager
	eng = new ut.Engine(term, getDungeonTile, map[0].length, map.length);
	// Initialize input
	ut.initInput(onKeyDown);
}

		function getAnotherTile(x, y) {
			var t = "";
			try { t = map[map.length - y - 1][x]; }
			catch(err) { return ut.NULLTILE; }
			if (t === '#') return WALL;
			if (t === '.') return FLOOR;
			return ut.NULLTILE;
		}

		function mapSwitch() {
			map = map2;
			var eng;
			eng = new ut.Engine(term, getDungeonTile, map[0].length, map.length);
		}

		var flipflop = false;
		function doTransition() {
			var effects = ["boxout", "boxin" ];
			var effect = effects[0];
			var duration = 250;
			eng.setTileFunc(getAnotherTile, effect, duration);
			mapSwitch();
			eng.setTileFunc(getDungeonTile, effect, duration);
		}

		function initEffect() {
			pl.x = 5; pl.y = 4;
			doTransition();
		}

