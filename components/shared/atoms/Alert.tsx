import Image from 'next/image';
import Link from 'next/link';

import {Button} from '@/components/ui/button';

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
  imgSrc: string;
}

const Alert = ({title, description, link, linkTitle, imgSrc}: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image src={imgSrc} alt="error" width={243} height={180} />

      <h2 className="h3-bold md:h2-bold mt-8">{title}</h2>
      <p className="small-medium md:base-regular my-3.5 max-w-md text-center text-light-2">
        {description}
      </p>
      <Link href={link}>
        <Button className="small-medium lg:base-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-2 hover:bg-primary-500">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default Alert;
