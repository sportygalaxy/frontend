"use client";

import React, { ReactNode, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string | ReactNode;
  triggerButton?: React.ReactNode;
  children?: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  triggerButton,
  children,
  className,
}) => {
  const handleTriggerClick = useCallback(
    () => onOpenChange(true),
    [onOpenChange]
  );

  return (
    <>
      {triggerButton &&
        React.cloneElement(triggerButton as React.ReactElement, {
          onClick: handleTriggerClick,
        })}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className={className}
        >
          {title || description ? (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          ) : null}

          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
