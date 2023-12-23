onmessage = function (e) {
  const { data } = e
  const result = longLoop(data);
  postMessage(result);
}

function longLoop(length) {
  const arr = [];
  let i = 0;
  while (i < length) {
    let num = Math.floor(Math.random() * 10000);
    arr.push(num);
    console.log(num);
    i++;
  }

  return 'Finish Long Loop';
}