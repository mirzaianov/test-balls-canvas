import randomNumber from './randomNumber';

const randomColor = (colors: string[]) => {
  const index = randomNumber(0, colors.length - 1);

  return colors[index];
};

export default randomColor;
