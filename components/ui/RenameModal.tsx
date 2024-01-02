'use client';

import { useAppStore } from '@/store/store';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Input } from '@/components/ui/input';
import { Button } from './button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useToast } from './use-toast';

function RenameModal() {
  const { user } = useUser();

  const {toast} = useToast();

  const [input, setInput] = useState('');

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  const renameFile = async () => {
    if(!user || !fileId) return;

    toast({
        title: "Renaming",
        description: "Renaming the file",
    })

    await updateDoc(doc(db, "users", user.id, "files", fileId),{
        filename: input,
    });

    toast({
        title: "Renamed Successfully",
        description: "The file was renamed successfully!",
    })

    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file</DialogTitle>

          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                renameFile();
              }
            }}
          />

          <div className="flex justify-end space-x-2 py-3">
            <Button
              size="sm"
              className="px-3"
              variant={'ghost'}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>

            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
