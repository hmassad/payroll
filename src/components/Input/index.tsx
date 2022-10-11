import { forwardRef } from 'react';

interface InputPropsWithChildren {}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputPropsWithChildren {
  block?: boolean;
  className?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'dark'
    | 'warning'
    | 'indigo'
    | 'transparent';
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  submit?: boolean;
  shadow?: boolean;
  label?: string | null;
}

type InputRef = React.ForwardedRef<HTMLInputElement>;

const style = {
  rounded: `rounded-full`,
  block: `flex justify-center w-full`,
  default: `px-4 py-2 rounded-lg transition ease-in duration-200`,
  shadow: `shadow-sm`,
  disabled: `opacity-60 cursor-not-allowed`,
  color: {
    primary: {
      bg: `border focus:outline-none focus:ring-2 focus:ring-secondary-200`,
      outline: `text-black border-secondary-500 border-2 text-secondary-500 hover:bg-secondary-500 hover:text-white active:bg-secondary-500 active:text-white`
    },
    secondary: {
      bg: `border focus:outline-none focus:ring-2 focus:ring-secondary-200`,
      outline: `text-black border-secondary-500 border-2 text-secondary-500 hover:bg-secondary-500 hover:text-white active:bg-secondary-500 active:text-white`
    },
    success: {
      bg: `text-white bg-green-700 border-2 border-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-200`,
      outline: `text-black border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`
    },
    danger: {
      bg: `text-white bg-red-600 border-2 border-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-200`,
      outline: `text-black border-red-600 border-2 text-red-600 active:bg-red-600 active:text-white`
    },
    dark: {
      bg: `text-white bg-black border-2 border-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-200`,
      outline: `text-black border-black border-2 text-gray-900 active:bg-black active:text-white`
    },
    warning: {
      bg: `text-white bg-yellow-500 border-2 border-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-200`,
      outline: `text-black border-yellow-500 border-2 text-yellow-500 active:bg-yellow-500 active:text-white`
    },
    indigo: {
      bg: `text-black bg-indigo-900 border-2 border-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-200`,
      outline: `text-black border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`
    },
    transparent: {
      bg: `text-black hover:bg-gray-100 focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 focus:ring-offset-gray-200`,
      outline: `text-black hover:bg-gray-100 border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`
    }
  }
};

const colors = (outline: boolean) => ({
  primary: outline ? style.color.primary.outline : style.color.primary.bg,
  secondary: outline ? style.color.secondary.outline : style.color.secondary.bg,
  success: outline ? style.color.success.outline : style.color.success.bg,
  danger: outline ? style.color.danger.outline : style.color.danger.bg,
  dark: outline ? style.color.dark.outline : style.color.dark.bg,
  warning: outline ? style.color.warning.outline : style.color.warning.bg,
  indigo: outline ? style.color.indigo.outline : style.color.indigo.bg,
  transparent: outline ? style.color.transparent.outline : style.color.transparent.bg
});

const Input = forwardRef(
  (
    {
      block = false,
      className,
      color = 'primary',
      disabled = false,
      outline = false,
      rounded,
      submit,
      shadow = true,
      label = null,
      ...props
    }: InputProps,
    ref: InputRef
  ) => (
    <div className={`${className} flex flex-col space-y-2`}>
      <label htmlFor={props.id} className="text-gray-500 select-none font-medium">
        {label}
      </label>
      <input
        ref={ref}
        disabled={disabled}
        {...props}
        className={`${className} ${block ? style.block : ''}
                    ${disabled ? style.disabled : ''}
                    ${shadow ? style.shadow : ''}
                    ${style.default} ${rounded ? style.rounded : 'rounded'}
                    ${color ? colors(outline)[color] : colors(outline).dark}`}
      />
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
