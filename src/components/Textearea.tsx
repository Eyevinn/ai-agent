import { extendVariants } from '@nextui-org/react';

const TextArea = ({ ...props }) => {
  return (
    <ExtendedTextarea
      className={'mb-2'}
      radius="xs"
      labelPlacement="outside"
      {...props}
    />
  );
};
const ExtendedTextarea = extendVariants(TextArea, {
  variants: {
    radius: {
      xs: {
        inputWrapper: ['bg-content6', 'rounded', 'shadow-none']
      }
    },
    textSize: {
      base: {
        input: 'text-base'
      },
      large: {
        input: 'text-2xl'
      }
    }
  }
});
export { TextArea };
