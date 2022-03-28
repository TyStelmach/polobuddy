const generatePublicSessionId = async () => {
  var shortId = "";
  const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUI';

  for (var i = 0; i < 8; i++) {
    shortId += i === 3 ? '-' : alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return shortId;
};

module.exports = {
  generatePublicSessionId
}