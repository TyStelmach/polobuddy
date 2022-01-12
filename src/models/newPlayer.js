class Player {
  constructor(name, skillLevel, sessionId, isHost=false) {
    this.name = name;
    this.skillName = skillLevel;
    this.gameCount = 0;
    this.isHost = isHost;
    this.sessionId = sessionId;
    this.weight = 0;
  }
};

module.exports = {
  Player,
}