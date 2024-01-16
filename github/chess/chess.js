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
          boardpositions[position.charAt(0)][position.charAt(1)][1]
        ) {
          origin = [x, y];
        }
      });
      movePiece(origin[0], origin[1], position.charAt(0), position.charAt(1));
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
              position.charAt(0),
              position.charAt(1),

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
          case `${!whitesturn ? "d" : ""}tower`:
            tower(
              position.charAt(0),
              position.charAt(1),

              (newPosArr) => (newPosArr[1] = pieceOnSquare)
            );
            break;
          case `${!whitesturn ? "d" : ""}knight`:
            console.log("it did");
            knight(
              position.charAt(0),
              position.charAt(1),

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
              position.charAt(0),
              position.charAt(1),

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
              position.charAt(0),
              position.charAt(1),

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
              position.charAt(0),
              position.charAt(1),

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
        }
        showimages();
      }
    }
  }
};
const showimages = function () {
  linearsearch(boardpositions, (x, y) => {
    if (boardpositions[x][y][1] != 0 &&
      boardpositions[x][y][1] != 2) {
        document.getElementById(`${x}${y}`).classList.add("selectable");
    }
    else /*if (document.getElementById(`${x}${y}`).classList.contains("selectable"))*/ {
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
  //clearsallmoves
  showimages();
  linearsearch(boardpositions, (x, y) => {
    let pieceOnSquare = boardpositions[x][y][0];
    checkAllMoves(whitesturn, pieceOnSquare);
  });
  linearsearch(boardpositions, (x, y) => (boardpositions[x][y][1] = 0));
  linearsearch(boardpositions, (x, y) => {
    let pieceOnSquare = boardpositions[x][y][0];
    checkAllMoves(!checkAllMoves, pieceOnSquare);
  });
};
const checkAllMoves = function (checkforwhite, pieceOnSquare) {
  if (pieceOnSquare != 0) {
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
  }
};
const movePiece = function (xorigin, yorigin, xdest, ydest) {
  if (
    boardpositions[xdest][ydest][0] != 0 &&
    boardpositions[xdest][ydest][0] != 2
  ) {
    document
      .getElementById(`${xdest}${ydest}`)
      .classList.remove(
        boardpositions[xdest][ydest][0].slice(
          0,
          boardpositions[xdest][ydest][0].length - 1
        )
      );
  }
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

const pawn = function (x, y, action) {
  //enpassant einfügen
  x = Number(x);
  y = Number(y);
  let iswhitemult = boardpositions[x][y][0].charAt(0) != "d" ? -1 : 1;
  console.log("pawn" + iswhitemult);
  //x und y sind im gesamten code vertauscht
  if (boardpositions[x + 1 * iswhitemult][y][0] == 0) {
    action(boardpositions[x + 1 * iswhitemult][y]);
    console.log(x + 1 * iswhitemult, y);
    //console.log(boardpositions[x][y][0].charAt(0) == "d");
    if (x == ((boardpositions[x][y][0].charAt(0) == "d") ? 1 : 6) && boardpositions[x + 2 * iswhitemult][y][0] == 0 ) {
      action(boardpositions[x + 2 * iswhitemult][y]);
      console.log(x + 2 * iswhitemult, y);
    }
  }
  if (y <= 6 && boardpositions[x + 1 * iswhitemult][y + 1][0] != 0) {
    action(boardpositions[x + 1 * iswhitemult][y + 1], boardpositions[x][y]);
    console.log(x + 1 * iswhitemult, y + 1);
  }
  if (y >= 1 && boardpositions[x + 1 * iswhitemult][y - 1][0] != 0) {
    action(boardpositions[x + 1 * iswhitemult][y - 1], boardpositions[x][y]);
    console.log(x + 1 * iswhitemult, y - 1);
  }
};
const knight = function (xx, yy, action) {
  //klappt
  let x = parseInt(xx);
  let y = parseInt(yy);
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
  x = Number(x);
  y = Number(y);
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
  x = Number(x);
  y = Number(y);
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
  /* bishop(x,y,action);
  tower(x,y,action);*/
};
const king = function (x, y, action) {
  console.log("king");
  /*for (i = -1; i <= 1; i++) {
    for (j = -1; j <= 1; j++) {
      if (i != 0 || j != 0) {
          let named = null;
          if (!whitesturn) {
            named = 'd';
          }
          boardpositions[i][j][1] = "${named}k";
        }
        
      
    }
  }*/
};
