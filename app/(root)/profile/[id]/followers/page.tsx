import React from 'react';
import Follows from '@/components/scenes/Follows';

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return <Follows viewedId={params.id} type="Followers" />;
}
