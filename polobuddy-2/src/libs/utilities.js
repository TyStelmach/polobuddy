const generatePublicSessionId = async () => {
  var shortId = "";
  const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUI';

  for (var i = 0; i < 8; i++) {
    shortId += i === 3 ? '-' : alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return shortId;
};

const getCurrentUnix = () => new Date().getTime();

const convertSingleDigitToTimestamp = (time) => {
  const now = getCurrentUnix();
  const endTime = Math.floor(new Date(now + (time*60000)));
  //Pad timestamp to show full time on the clock
  return endTime + 1000;
}

const preformatTimerDigits = (number) => ("0" + number).slice(-2);

module.exports = {
  getCurrentUnix,
  generatePublicSessionId,
  convertSingleDigitToTimestamp,
  preformatTimerDigits
}