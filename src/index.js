someArray.forEach(function(arrayElement) {
  // ... code code code for this one element
  someAsynchronousFunction(arrayElement, function() {
    arrayElement.doSomething();
  });
});

document.onreadystatechange = function () {
  window.addEventListener('load', function() {
    window.web3 = new Web3(web3.currentProvider);
    var account = window.web3.eth.accounts[0];
    console.log('account: ', account);
  });
  var twitterArray = document.getElementsByClassName("css-1dbjc4n r-1awozwy r-1iusvr4 r-16y2uox r-5f2r5o r-pdqwzc r-bcqeeo");
  console.log('readyState: ', document.readyState);
  if (document.readyState === 'complete') {
    setTimeout(function () {
      console.log('timeout set', twitterArray);
      for (var i = 0; i < twitterArray.length; i++) {
        console.log('element' + i + twitterArray[i]);
        console.log(twitterArray[i]);
        var button = document.createElement("BUTTON");
        button.innerHTML = "TIP";
        button.onclick = function(){
          console.log('webSign', window.web3.eth);
          window.web3.eth.sendTransaction({from: window.web3.eth.accounts[0], to: '0xA1b02d8c67b0FDCF4E379855868DeB470E169cfB', value: window.web3.toWei("0.01", "ether"), data: '0x0'}, console.log);
          return false;
        };
        twitterArray[i].appendChild(button);
      }
    }, 3000);

  }
};



// {
//   type: 'Feature',
//     id: '12342',
//   properties: {
//   icon: "../Assets/wzrd-3-1.png",
// },
//   geometry: {
//     type: 'Point',
//       coordinates: [151.259662, -33.910013],
//   },
// },
// {
//   type: 'Feature',
//     id: '12343',
//   properties: {
//   icon: "../Assets/wzrd-4-1.png",
// },
//   geometry: {
//     type: 'Point',
//       coordinates: [151.279411,   -33.856762],
//   },
// },
// {
//   type: 'Feature',
//     id: '12344',
//   properties: {
//   icon: {
//     iconImage: "../Assets/wzrd-2-2.png",
//       iconAllowOverlap: true,
//   },
// },
//   geometry: {
//     type: 'Point',
//       coordinates: [151.235588, -33.897822],
//   },
// },
