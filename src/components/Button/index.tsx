import { forwardRef } from 'react';

interface BtnPropsWithChildren {}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BtnPropsWithChildren {
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'transparent';
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  submit?: boolean;
  shadow?: boolean;
  isLoading?: boolean;
}

type ButtonRef = React.ForwardedRef<HTMLButtonElement>;

const style = {
  rounded: `rounded-full`,
  block: `flex justify-center w-full`,
  default: `focus:outline-none font-medium transition ease-in duration-200`,
  shadow: `shadow-sm`,
  disabled: `opacity-60 cursor-not-allowed`,
  sizes: {
    sm: 'px-1 py-1 text-sm',
    md: 'px-6 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-10 py-5 text-lg'
  },
  color: {
    primary: {
      bg: `text-white bg-primary-500 border-2 border-primary-500 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-primary-200`,
      outline: `text-black border-primary-500 border-2 text-primary-500 hover:bg-primary-300 hover:text-white active:bg-primary-500 active:text-white`
    },
    secondary: {
      bg: `text-white bg-secondary-500 border-2 border-secondary-500 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 focus:ring-offset-secondary-200`,
      outline: `text-black border-secondary-500 border-2 text-secondary-500 active:bg-secondary-500 active:text-white`
    },
    transparent: {
      bg: `text-primary border-0 focus:ring-1 focus:ring-offset-1 focus:ring-primary-500 focus:ring-offset-primary-200`,
      outline: `text-primary border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white focus:ring-1 focus:ring-offset-1 focus:ring-primary-500 focus:ring-offset-primary-200`
    }
  }
};

const colors = (outline: boolean) => ({
  primary: outline ? style.color.primary.outline : style.color.primary.bg,
  secondary: outline ? style.color.secondary.outline : style.color.secondary.bg,
  transparent: outline ? style.color.transparent.outline : style.color.transparent.bg
});

const Button = forwardRef(
  (
    {
      block = false,
      children,
      className,
      color = 'primary',
      disabled = false,
      outline = false,
      rounded,
      size = 'md',
      shadow = true,
      isLoading = false,
      ...props
    }: BtnProps,
    ref: ButtonRef
  ) => {
    const isDisabled = disabled || isLoading;
    return (
      <button
        ref={ref}
        {...props}
        disabled={isDisabled}
        className={`${className} ${block ? style.block : ''}
        ${disabled ? style.disabled : ''} ${style.sizes[size]}
        ${shadow ? style.shadow : ''}
        ${style.default} ${rounded ? style.rounded : 'rounded-md'}
        ${color ? colors(outline)[color] : colors(outline).primary}
        `}
      >
        <div className="flex flex-col justify-center font-semibold text-sm">
          <p className={`${isLoading ? 'invisible h-0' : 'visible'}`}>{children}</p>
          {isLoading && (
            <div className="flex items-center justify-center">
            {/* Spinner */}
            {/* <Loader height={30} width={30} color={color === 'transparent' ? 'pink' : 'white'} /> */}
            </div>
          )}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
