class Player {
  constructor(name, skillLevel, sessionId, isHost=false) {
    this.name = name;
    this.skillLevel = skillLevel;
    this.gameCount = 0;
    this.isHost = isHost;
    this.sessionId = sessionId;
  }
};

module.exports = {
  Player,
}