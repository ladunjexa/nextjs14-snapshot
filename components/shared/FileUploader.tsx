'use client';

import {useState, useCallback} from 'react';
import Image from 'next/image';

import {type FileWithPath, useDropzone} from 'react-dropzone';

import {Button} from '@/components/ui/button';

type FileUploaderProps = {
  type: 'User' | 'Post';
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({type, fieldChange, mediaUrl}: FileUploaderProps) => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string | null>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  });

  if (type === 'User') {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} className="cursor-pointer" />

        <div className="flex-center cursor-pointer gap-4">
          <Image
            src={fileUrl || '/assets/icons/profile-placeholder.svg'}
            alt="image"
            width={64}
            height={64}
            className="h-28 w-28 rounded-full object-cover object-top"
          />
          <p className="small-regular md:base-semibold text-tertiary-500">Change profile photo</p>
        </div>
      </div>
    );
  } else if (type === 'Post') {
    return (
      <div
        {...getRootProps()}
        className="flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {fileUrl ? (
          <>
            <div className="flex w-full flex-1 justify-center p-5 lg:p-10">
              <Image
                src={fileUrl}
                alt="image"
                className="file_uploader-img"
                width={96}
                height={77}
              />
            </div>
            <p className="file_uploader-label">Click or drag photo to replace</p>
          </>
        ) : (
          <div className="file_uploader-box">
            <Image src="/assets/icons/file-upload.svg" width={96} height={77} alt="file-upload" />
            <h3 className="base-medium mb-2 mt-6 text-light-2">Drap photo here</h3>
            <p className="small-regular mb-6 text-light-4">SVG, PNG, JPG</p>

            <Button className="shad-button_dark_4">Upload Photo</Button>
          </div>
        )}
      </div>
    );
  }
};

export default FileUploader;
