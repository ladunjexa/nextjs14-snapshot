import Post from '@/components/scenes/Post';

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Post postId={params.id} />;
}
