import GlobalStatsClient from './Client'

export const metadata = {
  title: 'Global Controller Stats | MyGamepadTester',
  description: 'Live global database of controller health, drift failures, and latency tests from thousands of users.',
  alternates: {
    canonical: 'https://mygamepadtester.com/global-stats',
  },
}

export default function GlobalStatsPage() {
  return <GlobalStatsClient />;
}
