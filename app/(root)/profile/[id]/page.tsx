import Profile from '@/components/scenes/Profile';

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Profile userId={params.id} />;
}
