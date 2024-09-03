import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TickCircle } from "iconsax-react";
import { gotoEmailBox } from "@/utils/gotoEmailBox";
import { EMAIL } from "@/constants/appConstants";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";

interface EmailVerificationSentModalProps {
  triggerButton?: React.ReactNode;
}

const EmailVerificationSentModal: React.FC<EmailVerificationSentModalProps> = ({
  triggerButton,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // setOpen(false);
    }
  };

  const handleGotoEmail = () => {
    setOpen(false);
    gotoEmailBox(EMAIL);
    router.push(RoutesEnum.LANDING_PAGE);
  };

  return (
    <>
      {React.cloneElement(triggerButton as React.ReactElement, {
        onClick: () => setOpen(false),
      })}
      <Dialog defaultOpen open={open} onOpenChange={handleOpenChange}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <TickCircle color="#18dd81" size="30" />
            <DialogTitle className="text-lg">Email Sent</DialogTitle>
            <DialogDescription className="text-base text-secondary font-medium">
              Activation link has been sent to your email. Kindly visit and
              click on the link
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="default"
            size="lg"
            className="border-none ring-0 ring-offset-0"
            onClick={handleGotoEmail}
          >
            Goto Email
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailVerificationSentModal;
