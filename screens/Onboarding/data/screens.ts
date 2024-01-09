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
    text: 'Welcome to Prayer Mauaqit! Lets add the Mauaqit into your calendar.',
  },
  {
    id: 2,
    animation: require('../assets/Scan.json'),
    title: 'Upload or Scan',
    subtitle: 'Easy and Efficient', // Example subtitle
    text: 'Upload or take a picture of your prayer Times to add them into your calendar',
  },
  {
    id: 3,
    animation: require('../assets/Loop.json'),
    title: 'Search for City',
    subtitle: 'Classic Placeholder', // Example subtitle
    text: 'Enter your City into the searchbar and use the prayer times provided by our Prayer Times API',
  },
];

