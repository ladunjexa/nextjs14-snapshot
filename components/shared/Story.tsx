'use client';

import Image from 'next/image';

type Props = {
  isUser?: boolean;
};

const Story = ({isUser = false}: Props) => {
  return (
    <div className="inline-flex flex-col items-center justify-between px-1">
      <div className="inline-flex items-start justify-start gap-2 px-1">
        <div className="flex items-center justify-center">
          <div className="relative h-[72px] w-[72px]">
            <Image
              src="/assets/images/ladunjexa.jpeg"
              className="absolute left-1 top-1 h-[62px] w-[62px] rounded-full"
              width={64}
              height={64}
              alt="profile"
            />
            <Image src="/assets/images/avatar-circle.svg" width={72} height={72} alt="circle" />
          </div>
        </div>
      </div>
      {isUser && (
        <div className="relative h-4 w-4">
          <Image
            src="/assets/icons/add-square.svg"
            height={18}
            width={18}
            alt="add"
            className="absolute -right-6 -top-4"
          />
        </div>
      )}
      <div className={`inline-flex items-center justify-center ${isUser && 'relative'}`}>
        <p
          className={`subtle-semibold break-words text-center font-inter ${
            isUser && 'absolute -top-4 whitespace-nowrap'
          }`}
        >
          Username
        </p>
      </div>
    </div>
  );
};

export default Story;
