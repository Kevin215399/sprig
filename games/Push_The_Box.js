
/* 
@title: Push_The_Box
@author: Sandy Burger
@tags: ['sokoban-style']
@img: ""
@addedOn: 2023-12-07
*/

    // Controls

/*
  w - up
  s - down
  a - left
  d - right
  j - restart level
*/

// How to play

/*
  Once you push the box to the button it will send you to the next level
  Be careful not to walk into a spike or push your box into one
  There are 15 puzzling level
  Good luck!
*/

const player = "p"
const box = "b"
const button = "u"
const wall = "w"
const fakeWall = "f"
const spike = "s"
const toggleWall = "z"
const toggleButton = "x"

setLegend(
  [ player, bitmap`
................
................
......0000......
.....0....0.....
.....0....0.....
......0000......
.......00.......
......0000......
.....0.00.0.....
....0..00..0....
.......00.......
......0..0......
.....0....0.....
....0......0....
................
................` ],
  [ box, bitmap`
1111111111111111
1990CCCCCCCCC991
199000C000C0C091
1CC090C0C0C90CC1
1CC000C000C090C1
1CCCC99CC99CCCC1
1CCCC99CC99CCCC1
1CCCCCC99CCCCCC1
1CCCCCC99CCCCCC1
1CCCC99CC99CCCC1
1CCCC99CC99CCCC1
1CC99CCCCCC99CC1
1CC99CCCCCC99CC1
199CCCCCCCCCC991
199CCCCCCCCCC991
1111111111111111` ],
  [ button, bitmap`
0000000000000000
0333333333333330
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0399999999999930
0333333333333330
0000000000000000`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ fakeWall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ spike, bitmap`
................
................
.......33.......
......3333......
......3333......
.....333333.....
....33333333....
....33333333....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
.33333333333333.
.33333333333333.
3333333333333333
3333333333333333`],
  [ toggleWall, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LL11111111LL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`],
  [ toggleButton, bitmap`
0000000000000000
0000999999990000
0009933333399000
0093333333333900
0993333333333990
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0993333333333990
0093333333333900
0009933333399000
0000999999990000
0000000000000000`],
)

setSolids([player, box, wall, toggleWall])

let level = 0
let deaths = 0
let restarts = 0
let moves = 0

const levels = [
  map`
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
`,
  map`
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................`,
  map`
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................
..........................................`,
  map`
.......
.......
.....b.
.......
..p..u.
.......
.......`,
  map`
.......
.b.....
.......
...p...
.......
.....u.
.......`,
  map`
...w...
..pw.b.
...w...
...w...
...w...
.u.....
.......`,
  map`
...w...
...w.u.
...w...
.......
...w...
.b.w...
...w.p.`,
  map`
wwwwwww
wwwwwww
ffwwwww
pbwwwww
w.fwwww
f.....u
fffwwww`,
  map`
ww...bw
wu....w
b......
.......
....fff
wp..fbf
wwb.fff`,
  map`
.......
.......
.......
.b..sus
.....s.
.p.....
.......`,
  map`
......u
ss.....
..s....
pbs.s..
..s.s..
....s..
ss...s.`,
  map`
wp..ffff
wffbwfwf
wfwfwfwf
s.ffffwf
f.wwwwff
f.....fw
ws....uw
wwwwwwww`,
  map`
wpffwf.uw
wssfwf.ww
w.ffwwfsw
f.wwwwf.f
fwwffwf.f
fb...sw.w
swwf.ww.w
wwwf....s
wwwwwwfff`,
  map`
...zuz.
...zzz.
.......
.pb.x..
.......
.......
.......`,
  map`
wwwwwww
wwwwwww
zzfffff
uzpb.xf
zzfffff
wwwwwww
wwwwwww`,
  map`
wpwwwzu
wbwwwzz
w.fffff
w..wwff
f..ffww
f..xfww
wsfffww`,
  map`
wwfff..wwww
wwfx...wwbw
wwffw.....w
wwwwf..wwww
wwwf..fwwww
p.....wfffw
wwww.wwfbfw
wwwf.wwf.fw
wwwf.......
wwwwffwwzzw
wwwwwwwwffu`,
  map`
fffffwwwffwwww
fzzzf.....wffw
fzbzfwwwf....w
fzzzfwwwwwww.w
ffffffffwwff.f
wwwwwwwfws...f
wwffwwwfww.wsw
ww...bpzww.www
wf.ffwwwww.www
wf...swwww.www
wwww.wwwww.www
wwww.fwwwf.wff
wwx..fwwwf.zzz
wwwwwwwwwwszuz`,
  map`
uuuuuuuuuuuuuuu
zzzzzzzzzzzzzzz
...............
...............
...............
...............
...............
...............
...pb..........
...............
...............
...............
...............
...............
sssssssssssssss`
]

setMap(levels[level])

addText("Tap i to continue", { x: 2, y: 13, color: color`0` });

setPushables({
  [player]: [box],
  [box]: [box],
  [button]: [],
  [wall]: [],
  [fakeWall]: [],
  [spike]: [],
  [toggleWall]: [],
  [toggleButton]: [],
});

const walk = tune`
85.47008547008546: G5~85.47008547008546,
85.47008547008546: G5~85.47008547008546,
2564.102564102564`
const complete = tune`
132.15859030837004: G4~132.15859030837004,
132.15859030837004: F5~132.15859030837004,
3964.757709251101`
const die = tune`
220.58823529411765: E4/220.58823529411765,
220.58823529411765: D4/220.58823529411765,
6617.64705882353`

onInput("s", () => {
  moves++;
  getFirst(player).y += 1
  playTune(walk)
});

onInput("d", () => {
  moves++;
  getFirst(player).x += 1;
  playTune(walk)
});

onInput("w", () => {
  moves++;
  getFirst(player).y -= 1;
  playTune(walk)
});

onInput("a", () => {
  moves++;
  getFirst(player).x -= 1;
  playTune(walk)
});

onInput("j", () => {
  setMap(levels[level])
  restarts++;
  playTune(die)
});

onInput("i", () => {
  clearText()
  if (level == 0) {
    level++;
    addText("WASD to move.", { x: 4, y: 3, color: color`0` });
    addText("J to restart level.", { x: 1, y: 4, color: color`0` });
    addText("Push the box", { x: 4, y: 6, color: color`0` });
    addText("to the button.", { x: 4, y: 7, color: color`0` });
    addText("Tap i to continue", { x: 2, y: 13, color: color`0` });
  }
});

afterInput(() => {
  const targetCovered1 = tilesWith(button, box).length
  const target1 = tilesWith(button).length

  if (targetCovered1 === target1) {
    level++;
    playTune(complete)
    setMap(levels[level])
  };

  const targetCovered2 = tilesWith(spike, player).length
  const targetCovered22 = tilesWith(spike, box).length

  if (tilesWith(spike).length > 0) { 
    if (targetCovered2 > 0) {
      setMap(levels[level]);
      deaths++;
      playTune(die)
    } else if (targetCovered22 > 0) {
      setMap(levels[level]);
      deaths++;
      playTune(die)
    }
  }

  if (tilesWith(toggleButton, box).length > 0) {
    const toggleWalls = getAll(toggleWall);

    for (let wall of toggleWalls) {
      clearTile(wall.x, wall.y);
    }
  }

  if (level == 18) {
    addText("You Win!", { x: 4, y: 3, color: color`0` });
    addText("Restarts: " + restarts, { x: 4, y: 5, color: color`0` });
    addText("Deaths: " + deaths, { x: 4, y: 6, color: color`0` });
    addText("Moves: " + moves, { x: 4, y: 7, color: color`0` });
  }
});