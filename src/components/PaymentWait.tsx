import React from 'react';

const PaymentWait: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground/90">
      {/* Spinner */}
      <div className="mb-8 h-16 w-16 rounded-full border-4 border-white/20 border-t-primary spin-slow" />

      <div className="max-w-md px-6 text-center">
        <h2 className="mb-3 text-xl font-bold text-white md:text-2xl text-balance">
          Check on your Phone for Confirmation.
        </h2>
        <p className="text-sm leading-relaxed text-white/80 md:text-base text-pretty">
          Please wait for the automated M-Pesa STK prompt and input your PIN.
        </p>
      </div>
    </div>
  );
};

export default PaymentWait;
