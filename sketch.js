var low, mid, high, n;
low = mid = 0
n = 30
high = n - 1;
var flagO = [100, 100]
/*
invariant
red = [0..low-1]
white = [low..mid-1]
undecided = [mid..high-1]
blue = [high..n-1]
*/
var stripes


function setup() {
  frameRate(5)
  createCanvas(1000, 600);
  background(0);
  stripes = Array(floor(n / 3)).fill(new Strip(1)).concat(Array(floor(n / 3)).fill(new Strip(2))).concat(Array(n - 2 * floor(n / 3)).fill(new Strip(3)))

  stripes = shuffle(stripes);
  printS(stripes)
  fill(220);
  stroke(255, 0, 255)

  rect(flagO[0], flagO[1], 500, 300)
}

class Strip {
  constructor(color) {
    this.color = color;
    this.width = 500
    this.height = floor(300 / n)
  }


}

function printS(S) {
  var op = ""
  S.forEach(s => op += `${s.color} `)
  console.log(op)
}

var notComplete = true;

function draw() {
  background(0)
  if (mid <= high) {
    switch (stripes[mid].color) {
      case 1:
        [stripes[mid], stripes[low]] = [stripes[low], stripes[mid]]
        low++;
        mid++;
        break;
      case 2:
        mid++;
        break;
      case 3:
        [stripes[mid], stripes[high]] = [stripes[high], stripes[mid]]
        high--;
    }
  } else {
    notComplete = false;
  }

  var index = 0;
  var h = 0,
    w = 500

  //for drawing
  while (index < n) {
    //for boundary of undecided and white
    if (notComplete && (index == mid || index == low)) {
      strokeWeight(3)
      stroke(0)
      line(flagO[0], flagO[1] + h, flagO[0] + w, flagO[1] + h)
      strokeWeight(1)
      
      var tag = (index == mid) ? "    mid": "    low";
      
      fill(255)
      text(tag ,  flagO[0] + w, flagO[1] + h + stripes[0].height)
    }
    


    if (mid <= index && index <= high) {
      switch (stripes[index].color) {
        case 1:
          fill(255, 0, 0, 200)
          // fill(0, 255, 255) // cyan
          break;
        case 2:
          fill(255, 255, 255, 200)
          // fill(0, 255, 0)
          break;
        case 3:
          fill(0,0 , 255, 200)
          // fill(255, 255, 0) //yellow
      }
    } else {
      switch (stripes[index].color) {
        case 1:
          fill(255, 0, 0)
          break;
        case 2:
          fill(255)
          break;
        case 3:
          fill(0, 0, 255)
      }
    }
    noStroke()
    // if(!notComplete)
    // console.error(h)
    rect(flagO[0], flagO[1] + h, w,  stripes[index].height)
    
    //for boundary of undecided
    if (notComplete && index == high) {
      strokeWeight(3)
      stroke(0)
      // console.error('kya hai be')
      line(flagO[0], flagO[1] + h + stripes[0].height, flagO[0] + w, flagO[1] + h + stripes[0].height)
      fill(255)
      text("    high",  flagO[0] + w, flagO[1] + h + stripes[0].height)
      strokeWeight(1)
    }
    h += stripes[index].height
    index++;
  }

  if (!notComplete)
    printS(stripes)

}