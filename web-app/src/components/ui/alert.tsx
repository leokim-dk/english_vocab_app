import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classNames';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Alert({
  children,
  className,
  variant = 'default',
  ...props
}: AlertProps) {
  return (
    <div
      className={classNames(
        "relative w-full rounded-lg border p-4",
        variant === 'destructive'
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-gray-50 text-gray-700 border-gray-200",
        className || ""
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({
  className,
  ...props
}: AlertTitleProps) {
  return (
    <h5
      className={classNames("mb-1 font-medium leading-none", className || "")}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      className={classNames("text-sm opacity-90", className || "")}
      {...props}
    />
  );
}
