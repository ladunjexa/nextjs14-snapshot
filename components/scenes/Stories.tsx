'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '../ui/button';

type Props = {};

const Stories = (props: Props) => {
  const [render, setRender] = useState(false);

  const handleLeftArrowClick = () => {};

  const handleRightArrowClick = () => {};
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-3 sm:mx-auto">
        {...Array(7)
          .fill(0)
          .map((_, j) => (
            <Dialog key={`dialog-${j}`}>
              <DialogTrigger>
                <Image
                  src="/assets/images/ladunjexa.jpeg"
                  alt="profile"
                  width={16}
                  height={16}
                  onClick={() => setRender(!render)}
                  className="h-16 w-16 rounded-full border-2 border-primary-500 p-1"
                  unoptimized
                />
                <p className="subtle-semibold line-clamp-1 text-light-1">ladunjexa</p>
              </DialogTrigger>
              <DialogContent className="max-w-fit p-0">
                <Image
                  src="/assets/images/ladunjexa.jpeg"
                  alt="profile"
                  width={438}
                  height={780}
                  onClick={() => setRender(!render)}
                  unoptimized
                  className="h-screen w-fit md:h-[500px] md:w-[280px]"
                />
                {/* Left Arrow */}
                <Button
                  onClick={handleLeftArrowClick}
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Image
                    src="/assets/icons/arrow.svg"
                    alt="arrow"
                    width={18}
                    height={18}
                    className="rotate-180"
                  />
                </Button>
                {/* Right Arrow */}
                <Button
                  onClick={handleRightArrowClick}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Image src="/assets/icons/arrow.svg" alt="arrow" width={18} height={18} />
                </Button>
              </DialogContent>
            </Dialog>
          ))}
        <Image
          src="/assets/icons/arrow.svg"
          alt="arrow"
          width={18}
          height={18}
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default Stories;
