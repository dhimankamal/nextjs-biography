import { NextPage } from "next";

interface InputProps {
  label: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input: NextPage<InputProps> = ({ label, inputProps = {} }) => {
  return (
    <div>
      <label
        htmlFor={inputProps?.name}
        className="leading-7 text-sm text-gray-600 dark:text-gray-100"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...inputProps}
          className="w-full bg-transparent bg-opacity-50 rounded border  focus:border-cyan-500  focus:ring-2 focus:ring-cyan-200 text-base outline-none dark:text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Input;
