class Player {
  constructor(username, skillName, sessionId, isHost=false) {
    this.name = username;
    this.skillName = skillName;
    this.gameCount = 0;
    this.isHost = false;
    this.sessionPublicId = sessionId;
    this.weight = 0;
  }
};

module.exports = {
  Player
}