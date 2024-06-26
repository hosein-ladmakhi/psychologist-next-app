"use client";

import { Avatar } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { TImagePickerFC } from "./index.type";

const ImagePicker: TImagePickerFC = ({ height, width, defaultSrc }, resultRef) => {
  const [image, setImage] = useState<File>();
  const [errorOnLoad, setErrorOnLoad] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null);
  const onOpenFilePicker = () => imageInputRef?.current?.click();
  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files![0]!;
    setImage(file);
  };

  const srcImage = useMemo(() => {
    return typeof image === typeof undefined ? undefined : URL.createObjectURL(image!);
  }, [image]);

  useImperativeHandle(resultRef, () => image!);

  return (
    <>
      {!srcImage && (!defaultSrc || defaultSrc && errorOnLoad) ? (
        <Avatar onClick={onOpenFilePicker} sx={{ height, width }} />
      ) : (
        <Avatar onClick={onOpenFilePicker} sx={{ height, width, objectFit: 'cover', objectPosition: 'center' }}>
          {defaultSrc && !srcImage && <Image fill alt="image picker" src={defaultSrc} onError={() => setErrorOnLoad(true)} />}
          {srcImage && <Image fill alt="image picker" src={srcImage} />}
        </Avatar>
      )}
      <input onChange={onSelectImage} hidden ref={imageInputRef} type="file" />
    </>
  );
};

export default forwardRef(ImagePicker);
