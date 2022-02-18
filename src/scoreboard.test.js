import { initialState, incrementPlayerScore, getGameScore } from './scoreboard'

describe('initialState', () => {
  it('starts with zero points for each player', () => {
    expect(initialState).toMatchObject({
      player1: 0,
      player2: 0,
    })
  })
})

describe('incrementPlayerScore', () => {
  it('correctly adds score for players', () => {
    const player1Scored = incrementPlayerScore(1, initialState)
    expect(player1Scored).toMatchObject({
      player1: 1,
      player2: 0,
    })

    const player2Scored = incrementPlayerScore(2, player1Scored)
    expect(player2Scored).toMatchObject({
      player1: 1,
      player2: 1,
    })
  })
})

describe('getGameScore', () => {
  it('supports Love-All', () => {
    const { scoreCall } = getGameScore({ player1: 0, player2: 0 })
    expect(scoreCall).toEqual('Love-All')
  })

  it('supports 15-Love', () => {
    const { scoreCall } = getGameScore({ player1: 1, player2: 0 })
    expect(scoreCall).toEqual('15-Love')
  })

  it('supports 15-30', () => {
    const { scoreCall } = getGameScore({ player1: 1, player2: 2 })
    expect(scoreCall).toEqual('15-30')
  })

  it('supports player 1 winning (40-0)', () => {
    const { scoreCall, winningPlayer } = getGameScore({ player1: 4, player2: 0 })
    expect(scoreCall).toEqual('Game, player1')
    expect(winningPlayer).toEqual('player1')
  })

  it('supports player 2 winning (15-40)', () => {
    const { scoreCall, winningPlayer } = getGameScore({ player1: 1, player2: 4})
    expect(scoreCall).toEqual('Game, player2')
    expect(winningPlayer).toEqual('player2')
  })

  it('supports deuce', () => {
    const { scoreCall } = getGameScore({ player1: 3, player2: 3 })
    expect(scoreCall).toEqual('Deuce')
  })

  it('supports advantage', () => {
    const { scoreCall, winningPlayer } = getGameScore({ player1: 4, player2: 3 })
    expect(scoreCall).toEqual('Advantage, player1')
    expect(winningPlayer).toBeNull()
  })

  it('deuce after advantage', () => {
    const { scoreCall } = getGameScore({ player1: 4, player2: 4 })
    expect(scoreCall).toEqual('Deuce')
  })
})
