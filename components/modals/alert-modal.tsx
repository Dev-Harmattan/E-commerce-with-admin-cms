'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      description="This action cannot be undone."
    >
      <div className="flex items-center justify-end pt-6 space-x-2 w-full">
        <Button disabled={loading} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm} variant="destructive">
          Continue
        </Button>
      </div>
    </Modal>
  );
};
