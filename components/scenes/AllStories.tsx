'use client';

import Image from 'next/image';

import Story from '@/components/shared/Story';

const AllStories = () => {
  return (
    <div className="inline-flex h-full w-full items-center justify-start py-1">
      <Story isUser />
      {...Array(5).fill(<Story />)}
      <div className="hidden sm:block">
        <button
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D22]"
          onClick={() => {}}
        >
          <Image src="/assets/icons/jsm-arrow.svg" width={12} height={12} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default AllStories;
