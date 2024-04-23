import Canvas from './components/Canvas';

const App = (): JSX.Element => {
  return (
    <main
      className={`app flex w-full flex-col items-center justify-center gap-10 p-5 pt-10`}
    >
      <h1 className={`text-5xl font-bold uppercase text-accent`}>Billiards</h1>
      <ul>
        <li>
          * To push a ball - hold the{' '}
          <span className={`font-bold uppercase text-secondary`}>left</span>{' '}
          mouse button and and touch the ball
        </li>
        <li>
          * To change the color of the ball -{' '}
          <span className={`font-bold uppercase text-secondary`}>right</span>{' '}
          click on the ball and pick a color
        </li>
      </ul>
      <Canvas />
    </main>
  );
};

export default App;
