"use client";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
  label,
}) => {
  return (
    <div className="w-full">
      {label && <div className="text-body-bold text-light-1 mb-2">{label}</div>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
            w-full
            p-4
            text-heading4-medium
            bg-black
            border-2
            border-neutral-800
            rounded-md
            outline-none
            text-white
            focus:border-sky-500
            focus:border-2
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            disabled:bg-neutral-900"
      />
    </div>
  );
};

export default Input;
