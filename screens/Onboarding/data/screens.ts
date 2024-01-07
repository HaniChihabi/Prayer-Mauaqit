export type Data = {
  id: number;
  animation: any;
  title: string;
  subtitle?: string; // Optional subtitle property
  text: string;
};
export const data: Data[] = [
  {
    id: 1,
    animation: require('../assets/lottie3.json'),
    title: 'Prayer Mauaqit',
    subtitle: 'Your Personal Prayer Scheduler', // Example subtitle
    text: 'Welcome to Prayer Mauaqit! Upload or scan the prayer times of your local mosque and get them added into your calendar.',
  },
  {
    id: 2,
    animation: require('../assets/lottie2.json'),
    title: 'Upload',
    subtitle: 'Easy and Efficient', // Example subtitle
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    animation: require('../assets/lottie1.json'),
    title: 'Lorem Ipsum',
    subtitle: 'Classic Placeholder', // Example subtitle
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

