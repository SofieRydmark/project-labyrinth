/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { labyrinth, continueGame } from 'reducers/labyrinth'
import { useDispatch, useSelector } from 'react-redux'
import { GameWrapper } from 'components/Styles/Globalstyles'
import { DescriptionWrapper, DirectionWrapper, RestartBtn, DirectionBtn, GameEnd } from 'components/Styles/GameScreen.Styles'
import { Loading } from './Loading'

export const GameScreen = () => {
  const dispatch = useDispatch()
  const description = useSelector((store) => store.labyrinth.description)
  const moves = useSelector((store) => store.labyrinth.moves)
  const loading = useSelector((store) => store.labyrinth.loading)
  const name = useSelector((store) => store.labyrinth.name)
  const history = useSelector((store) => store.labyrinth.history)

  const restartGame = () => {
    dispatch(labyrinth.actions.restartGame())
  }
  const goToNextStep = (event) => {
    dispatch(labyrinth.actions.setDirection(event.target.value))
    dispatch(continueGame())
  }

  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <>
        <GameWrapper>
          <DescriptionWrapper>
            <lottie-player
              src="https://assets4.lottiefiles.com/private_files/lf30_j3lhn3en.json"
              speed="1"
              background="transparent"
              loop
              autoplay
              style={{ width: '100px',
                height: '100px',
                position: 'absolute',
                right: '-70px',
                top: '-45px',
                transform: 'rotate(30deg)' }} />
            {history.length === 0 ? `Welcome, ${name}.` : ''}
            <p>{description}</p>
          </DescriptionWrapper>
          <DirectionWrapper id={moves.length <= 1 ? 'oneMove' : 'twoMoves'}>
            {moves && moves.map((action) => {
              return (
                <div
                  key={action.direction}
                  htmlFor="nextBtn">
                  <DirectionBtn
                    key={action.direction}
                    type="button"
                    id="nextBtn"
                    value={action.direction}
                    onClick={(event) => goToNextStep(event)}>Go {action.direction}
                  </DirectionBtn>
                  <p>{action.description}</p>
                </div>
              )
            })}
          </DirectionWrapper>

          {/* displays only when you are out */}
          {moves.length === 0 && (
            <GameEnd>Woho! You have made it out, {name}!
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_3xwxlyv7.json"
                speed="1"
                background="transparent"
                loop
                autoplay
                style={{ width: '300px', transform: 'rotate(180deg)' }} />
            </GameEnd>
          )}
          {/*-*/}

        </GameWrapper>
        <RestartBtn onClick={restartGame}><label htmlFor="goBack">Restart &#8634;</label></RestartBtn>
      </>
    )
  }
};
