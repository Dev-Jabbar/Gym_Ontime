import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MyModal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="bg-gray-400">
        <div className="md:p-4 bg-gray-400">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default MyModal;
