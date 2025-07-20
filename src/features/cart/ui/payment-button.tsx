import { SpinnerIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';

interface PaymentButtonProps extends ComponentProps<'button'> {
  open: boolean;
  loading?: boolean;
}

export const PaymentButton = ({ disabled, loading, type, open }: PaymentButtonProps) => {
  return (
    <motion.button
      key={1}
      type={type}
      disabled={disabled || loading}
      initial={{ opacity: 0, y: 10 }}
      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        delay: 0.9
      }}
      className="bg-united-nations-blue font-display hover:bg-united-nations-blue-darken flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-2xl py-3 text-xl text-white shadow-2xl transition-colors disabled:cursor-not-allowed"
    >
      {loading ? <SpinnerIcon className="animate-spin" /> : null}
      Перейти к оплате
    </motion.button>
  );
};
