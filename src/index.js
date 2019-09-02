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

<div className="css-1dbjc4n r-1iusvr4 r-18u37iz r-16y2uox r-1h0z5md">
  <div aria-label="Reply" role="button" data-focusable="true" tabIndex="0"
       className="css-18t94o4 css-1dbjc4n r-1777fci r-11cpok1 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="reply">
    <div dir="ltr"
         className="css-901oao r-1awozwy r-1re7ezh r-6koalj r-1qd0xha r-1b43r93 r-16dba41 r-1h0z5md r-ad9z0x r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0">
      <div className="css-1dbjc4n r-xoduu5">
        <div
          className="css-1dbjc4n r-sdzlij r-1p0dtai r-xoduu5 r-1d2f490 r-xf4iuw r-u8s1d r-zchlnj r-ipm5af r-o7ynqc r-6416eg"></div>
        <svg viewBox="0 0 24 24" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
          <g>
            <path
              d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
          </g>
        </svg>
      </div>
    </div>
  </div>
</div>
