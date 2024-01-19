/*Feld 8*8
alle Buttons haben eine Id mit ('xy')jeweils von 0 aufwärts
der erste Eintrag steht für die inzelnen Schachfiguren 
d== dunkel
ansonsten helle Figuren
0= keine Figur
zweiter Eintrag ist um mögliche Bewegungen zu markieren
wenn eine Figur angetippt wird markiert diese 
alle Felder in die sie sich bewegen kann mit ihrem Namen
wenn eine zweite Figur angeklickt wird 
dann werden diese markierungen gelöscht
wenn der Zug wechselt werden alle Felder die abgedeckt
sind mit einer zwei versehen
*/
let whitesturn = true;
let numberofturns = 1;
let gamehasstarted = false;
let boardpositions;
let tower1moved = false;
let tower2moved = false;
let dtower1moved = false;
let dtower2moved = false;
let Kingmoved = false;
let dKingmoved = false;

const startingboardpositions = [
  [
    ["dtower1", 0],
    ["dknight1", 0],
    ["dbishop1", 0],
    ["dKing1", 0],
    ["dQueen1", 0],
    ["dbishop2", 0],
    ["dknight2", 0],
    ["dtower2", 0],
  ],
  [
    ["dpawn1", 0],
    ["dpawn2", 0],
    ["dpawn3", 0],
    ["dpawn4", 0],
    ["dpawn5", 0],
    ["dpawn6", 0],
    ["dpawn7", 0],
    ["dpawn8", 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    ["pawn1", 0],
    ["pawn2", 0],
    ["pawn3", 0],
    ["pawn4", 0],
    ["pawn5", 0],
    ["pawn6", 0],
    ["pawn7", 0],
    ["pawn8", 0],
  ],
  [
    ["tower1", 0],
    ["knight1", 0],
    ["bishop1", 0],
    ["King1", 0],
    ["Queen1", 0],
    ["bishop2", 0],
    ["knight2", 0],
    ["tower2", 0],
  ],
];
// castling and enpassant
const startgame = function () {
  if (!gamehasstarted) {
    boardpositions = startingboardpositions;
    gamehasstarted = !gamehasstarted;
    showimages();
  }
};

//position == yx
//boardpos[y][x]
//double mistake == no mistake

const getPieceMovement = function (position) {
  console.log("button pressed");
  console.log(boardpositions[position.charAt(0)][position.charAt(1)]);
  if (gamehasstarted) {
    console.log("game has already started");
    let pieceOnSquare =
      boardpositions[position.charAt(0)][position.charAt(1)][0];
    console.log("piecesOnSquare is " + pieceOnSquare);
    if (
      boardpositions[position.charAt(0)][position.charAt(1)][1] != 0 &&
      boardpositions[position.charAt(0)][position.charAt(1)][1] != 2
    ) {
      console.log(
        boardpositions[position.charAt(0)][position.charAt(1)][1] +
          " could move there"
      );
      let origin;
      linearsearch(boardpositions, (x, y) => {
        if (
          boardpositions[x][y][0] ==
          (boardpositions[position.charAt(0)][position.charAt(1)][1].charAt(
            0
          ) == "c"
            ? boardpositions[position.charAt(0)][position.charAt(1)][1].slice(1)
            : boardpositions[position.charAt(0)][position.charAt(1)][1])
        ) {
          origin = [x, y];
        }
      });
      movePiece(
        Number(origin[0]),
        Number(origin[1]),
        Number(position.charAt(0)),
        Number(position.charAt(1))
      );
      changeturnes();
    } else {
      console.log("no on will move there");
      linearsearch(boardpositions, (x, y) => {
        if (boardpositions[x][y][1] != 0 && boardpositions[x][y][1] != 2) {
          boardpositions[x][y][1] = 0;
        }
      });
      if (pieceOnSquare != 0) {
        console.log(pieceOnSquare + " is standing on that field");
        let pieceOnSquareshort = pieceOnSquare;
        pieceOnSquareshort = pieceOnSquare.slice(0, pieceOnSquare.length - 1);
        console.log(
          "it will call the  following method " +
            pieceOnSquareshort.toLowerCase()
        );
        switch (pieceOnSquareshort) {
          case `${!whitesturn ? "d" : ""}pawn`:
            pawn(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              },
              (newPosArr) => (newPosArr[1] = pieceOnSquare),
              (newPosArr, oldPosArr, enpPosArr) => {
                newPosArr[1] = pieceOnSquare;
              }
            );
            break;
          case `${!whitesturn ? "d" : ""}tower`:
            tower(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              }
            );
            break;
          case `${!whitesturn ? "d" : ""}knight`:
            console.log("it did");
            knight(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              }
            );
            break;
          case `${!whitesturn ? "d" : ""}bishop`:
            bishop(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              }
            );
            break;
          case `${!whitesturn ? "d" : ""}Queen`:
            queen(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              }
            );
            break;
          case `${!whitesturn ? "d" : ""}King`:
            king(
              Number(position.charAt(0)),
              Number(position.charAt(1)),

              (newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              },
              (newPosArr, oldPosArr) => {
                console.log("c" + oldPosArr[0]);
                newPosArr[1] = "c" + oldPosArr[0];
              }
            );
            break;
        }
        showimages();
      }
    }
  }
};
const showimages = function () {
  linearsearch(boardpositions, (x, y) => {
    if (boardpositions[x][y][1] != 0 && boardpositions[x][y][1] != 2) {
      document.getElementById(`${x}${y}`).classList.add("selectable");
    } /*if (document.getElementById(`${x}${y}`).classList.contains("selectable"))*/ else {
      document.getElementById(`${x}${y}`).classList.remove("selectable");
    }
    let pieceOnSquare = boardpositions[x][y][0];
    if (pieceOnSquare != 0 && pieceOnSquare != null) {
      //console.log(pieceOnSquare);
      let temporary = pieceOnSquare.slice(0, pieceOnSquare.length - 1);
      pieceOnSquare = temporary;

      //console.log(`${x}${y}`);
      //console.log(pieceOnSquare);
      document.getElementById(`${x}${y}`).classList.add(pieceOnSquare);
    }
  });
};
const changeturnes = function () {
  whitesturn = !whitesturn;
  if (whitesturn) numberofturns++;
  linearsearch(boardpositions, (x, y) => (boardpositions[x][y][1] = 0));
  linearsearch(boardpositions, (x, y) => {
    // finde alle arrays mit mehr als zwei und entsprechendem ersten Buchstabe lösche enpassant
    if (
      boardpositions[x][y].length > 2 &&
      boardpositions[x][y][2].charAt(0) == (whitesturn ? "p" : "d")
    ) {
      boardpositions[x][y].pop();
    }
  });
  //clearsallmoves
  showimages();
  linearsearch(boardpositions, (x, y) => {
    let pieceOnSquare = boardpositions[x][y][0];
    //checkAllMoves(whitesturn, pieceOnSquare);
  });
  linearsearch(boardpositions, (x, y) => (boardpositions[x][y][1] = 0));
  linearsearch(boardpositions, (x, y) => {
    let pieceOnSquare = boardpositions[x][y][0];
    //checkAllMoves(!whitesturn, pieceOnSquare);
  });
};
const checkAllMoves = function (checkforwhite, pieceOnSquare) {
  /*if (pieceOnSquare != 0) {
    let pieceOnSquareshort = pieceOnSquare.slice(0, pieceOnSquare - 1);
    switch (pieceOnSquareshort) {
      case `${checkforwhite ? "d" : ""}pawn`:
        pawn(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
      case `${checkforwhite ? "d" : ""}tower`:
        tower(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
      case `${checkforwhite ? "d" : ""}knight`:
        knight(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
      case `${checkforwhite ? "d" : ""}bishop`:
        bishop(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
      case `${checkforwhite ? "d" : ""}Queen`:
        queen(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
      case `${checkforwhite ? "d" : ""}King`:
        king(x, y, (newPosArr) => (newPosArr[1] = "2"));
        break;
    }
  }*/
};
const movePiece = function (xorigin, yorigin, xdest, ydest) {
  let pieceOnSquare = boardpositions[xorigin][yorigin][0];
  if (!dKingmoved && pieceOnSquare == "dKing1") {
    dKingmoved != dKingmoved;
  }
  if (!Kingmoved && pieceOnSquare == "King1") {
    Kingmoved != Kingmoved;
  }
  if (!dtower1moved && pieceOnSquare == "dtower1") {
    dtower1moved != dtower1moved;
  }
  if (!dtower2moved && pieceOnSquare == "dtower2") {
    dtower2moved != dtower2moved;
  }
  if (!tower1moved && pieceOnSquare == "tower1") {
    tower1moved != tower1moved;
  }
  if (!tower2moved && pieceOnSquare == "tower2") {
    tower2moved != tower2moved;
  }
  console.log(
    boardpositions[xorigin][yorigin][0].charAt(2) ==
      (boardpositions[xorigin][yorigin][0].charAt(0) == "d" ? "a" : "w")
  );

  if (
    boardpositions[xorigin][yorigin][0].charAt(2) ==
    (boardpositions[xorigin][yorigin][0].charAt(0) == "d" ? "a" : "w")
  ) {
    if (xdest == boardpositions[xorigin][yorigin][0].charAt(0) == "d" ? 7 : 0) {
      document.getElementById().classList.remove()
      // transutation
    }  
    if (((xorigin + xdest) / 2) % 1 == 0) {
      let xen = (xorigin + xdest) / 2;
      console.log(xen);
      boardpositions[xen][yorigin].push(boardpositions[xorigin][yorigin][0]);
      console.log(boardpositions[xen][yorigin]);
    }
    if (boardpositions[xdest][ydest].length > 2) {
      console.log("enpassant");
      linearsearch(boardpositions, (x, y) => {
        if (boardpositions[x][y][0] == boardpositions[xdest][ydest][2]) {
          console.log(x, y);
          document
            .getElementById(`${x}${y}`)
            .classList.remove(
              boardpositions[x][y][0].slice(
                0,
                boardpositions[x][y][0].length - 1
              )
            );
          boardpositions[x][y][0] = 0;
        }
      });
    }
  } else if (boardpositions[xdest][ydest][1].charAt(0) == "c") {
    if (yorigin < ydest) {
      boardpositions[xdest][ydest - 1][0] = boardpositions[xdest][ydest + 2][0];
      document
        .getElementById(`${xdest}${ydest - 1}`)
        .classList.add(
          boardpositions[xdest][ydest + 2][0].slice(
            0,
            boardpositions[xdest][ydest + 2][0].length - 1
          )
        );
      document
        .getElementById(`${xdest}${ydest + 2}`)
        .classList.remove(
          boardpositions[xdest][ydest + 2][0].slice(
            0,
            boardpositions[xdest][ydest + 2][0].length - 1
          )
        );
      boardpositions[xdest][ydest + 2][0] = 0;
    } else {
      boardpositions[xdest][ydest + 1][0] = boardpositions[xdest][ydest + 2][0];
      document
        .getElementById(`${xdest}${ydest + 1}`)
        .classList.add(
          boardpositions[xdest][ydest - 1][0].slice(
            0,
            boardpositions[xdest][ydest - 1][0].length - 1
          )
        );
      document
        .getElementById(`${xdest}${ydest - 1}`)
        .classList.remove(
          boardpositions[xdest][ydest - 1][0].slice(
            0,
            boardpositions[xdest][ydest - 1][0].length - 1
          )
        );
      boardpositions[xdest][ydest - 1][0] = 0;
    }
  }

  if (boardpositions[xdest][ydest][0] != 0) {
    document
      .getElementById(`${xdest}${ydest}`)
      .classList.remove(
        boardpositions[xdest][ydest][0].slice(
          0,
          boardpositions[xdest][ydest][0].length - 1
        )
      );
  }
  // enpassant in push array
  boardpositions[xdest][ydest][0] = boardpositions[xorigin][yorigin][0];
  document
    .getElementById(`${xdest}${ydest}`)
    .classList.add(
      boardpositions[xorigin][yorigin][0].substring(
        0,
        boardpositions[xorigin][yorigin][0].length - 1
      )
    );
  document
    .getElementById(`${xorigin}${yorigin}`)
    .classList.remove(
      boardpositions[xorigin][yorigin][0].slice(
        0,
        boardpositions[xorigin][yorigin][0].length - 1
      )
    );
  boardpositions[xorigin][yorigin][0] = 0;
  showimages();
};
const linearsearch = function (three_dim_array, action) {
  //console.log("lin");
  for (let x = 0; x < three_dim_array.length; x++) {
    for (let y = 0; y < three_dim_array[x].length; y++) {
      action(x, y);
    }
  }
};

const pawn = function (x, y, action, action2, action3) {
  //enpassant einfügen
  let iswhitemult = boardpositions[x][y][0].charAt(0) != "d" ? -1 : 1;
  console.log("pawn" + iswhitemult);
  //x und y sind im gesamten code vertauscht
  if (boardpositions[x + 1 * iswhitemult][y][0] == 0) {
    action2(boardpositions[x + 1 * iswhitemult][y], boardpositions[x][y]);
    console.log(x + 1 * iswhitemult, y);
    //console.log(boardpositions[x][y][0].charAt(0) == "d");
    if (
      x == (boardpositions[x][y][0].charAt(0) == "d" ? 1 : 6) &&
      boardpositions[x + 2 * iswhitemult][y][0] == 0
    ) {
      let ex = x + 1 * iswhitemult;
      action3(
        boardpositions[x + 2 * iswhitemult][y],
        boardpositions[x][y],
        boardpositions[ex][y]
      );
      console.log(x + 2 * iswhitemult, y, "enpassant wäre auf ", ex);
    }
  }
  if (
    y <= 6 &&
    (boardpositions[x + 1 * iswhitemult][y + 1][0] != 0 ||
      boardpositions[x + 1 * iswhitemult][y + 1].length > 2)
  ) {
    action(boardpositions[x + 1 * iswhitemult][y + 1], boardpositions[x][y]);
    console.log(x + 1 * iswhitemult, y + 1);
  }
  if (
    y >= 1 &&
    (boardpositions[x + 1 * iswhitemult][y - 1][0] != 0 ||
      boardpositions[x + 1 * iswhitemult][y - 1].length > 2)
  ) {
    action(boardpositions[x + 1 * iswhitemult][y - 1], boardpositions[x][y]);
    console.log(x + 1 * iswhitemult, y - 1);
  }
};
const knight = function (x, y, action) {
  //klappt

  for (let index = 0; index < 4; index++) {
    for (let jindex = -1; jindex < 2; jindex += 2) {
      let isxcoor = index % 2 == 0;
      console.log(isxcoor);
      let is_upleft = index < 2 ? -1 : 1;
      if (
        isxcoor &&
        x + 2 * is_upleft >= 0 &&
        x + 2 * is_upleft <= 7 &&
        y + jindex >= 0 &&
        y + jindex <= 7
      ) {
        console.log(x + 2 * is_upleft, y + jindex);
        action(
          boardpositions[x + 2 * is_upleft][y + jindex],
          boardpositions[x][y]
        );
      } else if (
        !isxcoor &&
        y + 2 * is_upleft >= 0 &&
        y + 2 * is_upleft <= 7 &&
        x + jindex >= 0 &&
        x + jindex <= 7
      ) {
        console.log(x + jindex, y + 2 * is_upleft);
        action(
          boardpositions[x + jindex][y + 2 * is_upleft],
          boardpositions[x][y]
        );
      }
    }
  }
};
/*
(newPosArr, oldPosArr) => {
                if (
                  newPosArr[0] == 0 ||
                  (newPosArr[0].charAt(0) == "d") !=
                    (oldPosArr[0].charAt(0) == "d")
                ) {
                  newPosArr[1] = pieceOnSquare;
                }
              }
*/
const bishop = function (x, y, action) {
  //works except enpassant
  console.log("bishop");
  for (let index = 1; index <= 4; index++) {
    for (let jindex = 1; true; jindex++) {
      if (
        x + (index < 3 ? -1 : 1) * jindex < 0 ||
        x + (index < 3 ? -1 : 1) * jindex > 7 ||
        y + (index % 2 == 0 ? -1 : 1) * jindex < 0 ||
        y + (index % 2 == 0 ? -1 : 1) * jindex > 7
      ) {
        break;
      }
      console;
      if (
        boardpositions[x + (index < 3 ? -1 : 1) * jindex][
          y + (index % 2 == 0 ? -1 : 1) * jindex
        ][0] == 0
        /*|| boardpositions[x + index < 2 ? -1 : 1]
        [y + (index % 2) == 0 ? -1 : 1]
        [0] == ????enpassant*/
      ) {
        console.log(
          x + (index < 3 ? -1 : 1) * jindex,
          y + (index % 2 == 0 ? -1 : 1) * jindex
        );
        action(
          boardpositions[x + (index < 3 ? -1 : 1) * jindex][
            y + (index % 2 == 0 ? -1 : 1) * jindex
          ],
          boardpositions[x][y]
        );
      } else {
        console.log(
          x + (index < 3 ? -1 : 1) * jindex,
          y + (index % 2 == 0 ? -1 : 1) * jindex
        );
        action(
          boardpositions[x + (index < 3 ? -1 : 1) * jindex][
            y + (index % 2 == 0 ? -1 : 1) * jindex
          ],
          boardpositions[x][y]
        );
        break;
      }

      /*boardpositions[x + index < 3 ? -1 : 1][
        y + (index % 2) == 0 ? -1 : 1
      ][0] == 0;*/
    }
  }
};
const tower = function (x, y, action) {
  console.log("tower");
  for (let index = 0; index < 4; index++) {
    console.log("a");
    for (let jindex = 1; true; jindex++) {
      console.log("b");
      let isxcoor = index % 2 == 0 ? true : false;
      let is_upleft = index < 2 ? -1 : 1;
      console.log(isxcoor + "\n" + is_upleft);
      if (
        isxcoor &&
        x + jindex * is_upleft <= 7 &&
        x + jindex * is_upleft >= 0
      ) {
        console.log(x + jindex * is_upleft, y);
        action(boardpositions[x + jindex * is_upleft][y], boardpositions[x][y]);
        if (boardpositions[x + jindex * is_upleft][y][0] != 0) break;
      } else if (
        !isxcoor &&
        y + jindex * is_upleft <= 7 &&
        y + jindex * is_upleft >= 0
      ) {
        console.log(x, y + jindex * is_upleft);
        action(boardpositions[x][y + jindex * is_upleft], boardpositions[x][y]);
        if (boardpositions[x][y + jindex * is_upleft][0] != 0) break;
      } else {
        break;
      }
    }
  }
};
const queen = function (x, y, action) {
  console.log("queen");
  bishop(x, y, action);
  tower(x, y, action);
};
const king = function (x, y, action, action2) {
  console.log("king");
  if (whitesturn && !Kingmoved) {
    if (
      !dtower1moved &&
      boardpositions[7][1][0] == 0 &&
      boardpositions[7][2][0] == 0
    ) {
      console.log("castlpossible");
      action2(boardpositions[x][y - 2], boardpositions[x][y]);
    }

    if (
      !dtower2moved &&
      boardpositions[7][4][0] == 0 &&
      boardpositions[7][5][0] == 0 &&
      boardpositions[7][6][0] == 0
    ) {
      console.log("castlpossible");
      action2(boardpositions[x][y + 2], boardpositions[x][y]);
    }
  } else if (!whitesturn && !dKingmoved) {
    if (
      !dtower1moved &&
      boardpositions[0][1][0] == 0 &&
      boardpositions[0][2][0] == 0
    ) {
      console.log("castlpossible");
      action2(boardpositions[x][y - 2], boardpositions[x][y]);
    }
    if (
      !dtower2moved &&
      boardpositions[0][4][0] == 0 &&
      boardpositions[0][5][0] == 0 &&
      boardpositions[0][6][0] == 0
    ) {
      console.log("castlpossible");
      action2(boardpositions[x][y + 2], boardpositions[x][y]);
    }
  }
  for (i = -1; i <= 1; i++) {
    for (j = -1; j <= 1; j++) {
      if (i != 0 || j != 0) {
        if (x + i <= 7 && x + i >= 0 && y + j <= 7 && y + j >= 0) {
          console.log(x + i, y + j);
          action(boardpositions[x + i][y + j], boardpositions[x][y]);
        }
      }
    }
  }
};
