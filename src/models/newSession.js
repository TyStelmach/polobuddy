class Session {
  constructor() {
    this.totalGames = 0;
    this.activeGame = {
      isStarted: false,
      speed: 'null',
      teams: {
        teamOne: [0],
        teamTwo: [0]
      }
    }
  }
};

module.exports = {
  Session,
}