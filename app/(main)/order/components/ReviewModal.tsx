"use client";

import React, { useState } from "react";
import Modal from "@/common/Modal";
import ReviewForm from "./ReviewForm";

interface ReviewModalProps {
  triggerButton?: React.ReactNode;
  productId: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  triggerButton,
  productId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerButton={triggerButton}
      title="Rate your purchase"
      description="Share a rating and an optional comment."
    >
      <ReviewForm
        productId={productId}
        onClose={() => setOpen(false)}
        submitLabel="Submit review"
      />
    </Modal>
  );
};

export default ReviewModal;
