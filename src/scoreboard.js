export const initialState = {
    player1: 0,
    player2: 0,
}

export function incrementPlayerScore(playerNumber, currentGameState) {
  const playerKey = [`player${playerNumber}`]
  return {
    ...currentGameState,
    [playerKey]: currentGameState[playerKey] + 1,
  }
}

export function getGameScore(currentGameState) {
  const p1 = currentGameState.player1;
  const p2 = currentGameState.player2;

  let scoreText = null;
  let winner = null;
  
  const baseScores = [
    'Love',
    '15',
    '30',
    '40'
  ];

  // Check for a game winner before attempting to label scores
  const highestScore = Math.max(p1, p2);
  const lowestScore = Math.min(p1, p2);

  // Is one player over 40, and the other at 30 or less, therefore winning
  if (highestScore >= baseScores.length && lowestScore < highestScore-1) {
    winner = p1 > p2 ? 'player1' : 'player2';
    scoreText = `Game, ${winner}`;
  
  // Check if the match is in deuce, which occurs from 40 & up
  } else if (lowestScore >= baseScores.length-1 && p1 === p2) {
    scoreText = 'Deuce';
  
  // Check if one player is in advantage, 1 point ahead and over 40
  } else if (lowestScore >= baseScores.length-1 && highestScore === lowestScore+1 ) {
    scoreText = `Advantage, player${p1 > p2 ? '1' : '2'}`;

  // if true, the game is in a normal scoring state
  } else if (highestScore < baseScores.length) {

    if (p1 === p2) {
      scoreText = `${baseScores[p1]}-All`;

    } else {
      scoreText = `${baseScores[p1]}-${baseScores[p2]}`;
    }

  } else {
    // just ask the umpire who is winning
    scoreText = `${p1}-${p2}`;
  }

  return {
    scoreCall: scoreText,
    winningPlayer: winner,
  }
}
