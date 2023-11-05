import Post from '@/components/scenes/Post';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Posts — SnapShot',
};

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Post postId={params.id} />;
}
