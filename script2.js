const board = document.getElementById('board');
let selectedSquare = null;

//the dictionary will be the output of my recognition algorithm. For now it's
// just the initial position
pos = {
  "00" : "&#9814",
  "01" : "&#9816",
  "02" : "&#9815",
  "03" : "&#9813",
  "04" : "&#9812",
  "05" : "&#9815",
  "06" : "&#9816",
  "07" : "&#9814",
  "10" : "&#9817",
  "11" : "&#9817",
  "12" : "&#9817",
  "13" : "&#9817",
  "14" : "&#9817",
  "15" : "&#9817",
  "16" : "&#9817",
  "17" : "&#9817",
  "20": "" ,
  "21": "" ,
  "22": "" ,
  "23": "" ,
  "24": "" ,
  "25": "" ,
  "26": "" ,
  "27": "" ,
  "30": "" ,
  "31": "" ,
  "32": "" ,
  "33": "" ,
  "34": "" ,
  "35": "" ,
  "36": "" ,
  "37": "" ,
  "40": "" ,
  "41": "" ,
  "42": "" ,
  "43": "" ,
  "44": "" ,
  "45": "" ,
  "46": "" ,
  "47": "" ,
  "50": "" ,
  "51": "" ,
  "52": "" ,
  "53": "" ,
  "54": "" ,
  "55": "" ,
  "56": "" ,
  "57": "" ,
  "60": "&#9823" ,
  "61": "&#9823" ,
  "62": "&#9823" ,
  "63": "&#9823" ,
  "64": "&#9823" ,
  "65": "&#9823" ,
  "66": "&#9823" ,
  "67": "&#9823" ,
  "70": "&#9820" ,
  "71": "&#9822" ,
  "72": "&#9821" ,
  "73": "&#9819" ,
  "74": "&#9818" ,
  "75": "&#9821" ,
  "76": "&#9822" ,
  "77": "&#9820" ,
  

}


for (let i = 0; i < 64; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  const row = 7 - Math.floor(i / 8);
  const col = i % 8;
  square.id = row.toString(10) + col.toString(10) ;
  square.innerHTML = pos[square.id];
  const isWhite = (i + Math.floor(i / 8)) % 2 === 0;
  square.classList.add(isWhite ? 'white' : 'black');
  
  square.addEventListener('click', () => {
    if (selectedSquare) {
      selectedSquare.classList.remove('selected');
      if (square.innerHTML.length == 0) {
        let content = selectedSquare.innerHTML;
        selectedSquare.innerHTML = "";
        square.innerHTML = content;
      }
      selectedSquare = null;
    }
    
    else { 
      
    
    selectedSquare = square;
    selectedSquare.classList.add('selected');
    //let piece = document.createElement("span");
    //piece.draggable = true;
    //piece.innerHTML = "hi";
    //piece.classList.add("piece");
    //piece.classList.add("black_pawn");
    //selectedSquare.appendChild(piece);
    
    
    //piece.addEventListener("drag", (event) => {});
    //piece.addEventListener("dragstart", (event) => {})
    }
  });
  
  board.appendChild(square);
  
}

