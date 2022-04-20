class Session {
  constructor() {
    this.publicId = '000-0000';
    this.hostId = 0;
    this.totalGames = 0;
    this.activeUsers = [];
    this.activeGame = {
      isStarted: false,
      speed: null,
      teams: {
        teamOne: [0],
        teamTwo: [0]
      }
    }
  }
};

module.exports = {
  Session
};
