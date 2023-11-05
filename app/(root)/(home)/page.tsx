import RecentPosts from '@/components/scenes/RecentPosts';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Home — SnapShot',
};

export default function Home() {
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Feed</h2>

          <RecentPosts />
        </div>
      </div>
    </div>
  );
}
