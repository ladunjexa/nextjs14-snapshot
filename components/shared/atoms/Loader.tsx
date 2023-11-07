import Image from 'next/image';

const Loader = ({otherClasses}: {otherClasses?: string}) => {
  return (
    <div className={`flex-center w-auto ${otherClasses}`}>
      <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} />
    </div>
  );
};

export default Loader;
