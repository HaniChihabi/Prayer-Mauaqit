export type Data = {
  id: number;
  animation: any;
  title: string;
  text: string;
};

export const data: Data[] = [
  {
    id: 1,
    animation: require('../assets/lottie1.json'),
    title: 'Prayer Times',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    animation: require('../assets/lottie2.json'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    animation: require('../assets/lottie3.json'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
