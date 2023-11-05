import Profile from '@/components/scenes/Profile';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Profile — SnapShot',
};

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Profile userId={params.id} />;
}
