import Canvas from './components/Canvas';

const App = (): JSX.Element => {
  return (
    <main
      className={`app relative flex w-full flex-col items-center justify-center gap-10 p-5 pt-10`}
    >
      <h1 className={`text-5xl font-bold uppercase`}>
        <span className={`text-secondary`}>⊚</span> Billiards{' '}
        <span className={`text-secondary`}>⊚</span>
      </h1>
      <ul>
        <li>
          <span className={`text-accent`}>➽</span> To push a ball - hold the{' '}
          <span className={`font-bold uppercase text-accent`}>left</span> mouse
          button and and touch the ball
        </li>
        <li>
          <span className={`text-error`}>➽</span> To change a color of the ball
          - <span className={`font-bold uppercase text-error`}>right</span>{' '}
          click on the ball and pick the color
          <br />
          <span className={`pl-5 text-xs text-warning`}>
            * works only if the ball is static
          </span>
        </li>
      </ul>
      <Canvas />
    </main>
  );
};

export default App;
