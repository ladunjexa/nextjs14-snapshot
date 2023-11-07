import Follows from '@/components/scenes/Follows';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Following — SnapShot',
};

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Follows viewedId={params.id} type="Following" />;
}
