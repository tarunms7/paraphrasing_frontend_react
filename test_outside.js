
for (var a=[],i=0;i<40;++i) a[i]=i;

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

a = shuffle(a);
console.log(a)