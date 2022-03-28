class Player {
  constructor(name, skillLevel, privateId, isHost=false) {
    this.name = name;
    this.skillName = skillLevel;
    this.gameCount = 0;
    this.isHost = isHost;
    this.privateId = privateId;
    this.weight = 0;
  }
};

module.exports = {
  Player,
}