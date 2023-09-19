import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({
  onChange,
  label,
  value,
  disabled,
}: {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-light-1 text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex item-center justify-center">
          <Image src={base64} width={200} height={200} alt="Uploaded Image" />
        </div>
      ) : (
        <div className="text-light-1">{label}</div>
      )}
    </div>
  );
};

export default ImageUpload;
