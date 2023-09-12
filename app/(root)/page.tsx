'use client';
import { useEffect } from 'react';

import { useStoreModal } from '@/use-store-modal';


const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4">The root page</div>;
};

export default SetupPage;
