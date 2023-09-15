'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store } from '@prisma/client';
import { cn } from '@/lib/utils';

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from '@/components/ui/popover';
import { useStoreModal } from '@/use-store-modal';
import { Button } from '@/components/ui/button';
import {
  Check,
  ChevronsUpDownIcon,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { Command, CommandInput, CommandItem } from '@/components/ui/command';
import {
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandSeparator,
} from 'cmdk';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

interface FormattedItem {
  label: string;
  value: string;
}

export const StoreSwitcher = ({ className, items }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems: FormattedItem[] = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems?.find(
    (item) => item.value === params.storeId
  );

  const onSelectStore = (store: FormattedItem) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="outline"
          aria-expanded={open}
          aria-label="Select Store"
          role="combobox"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 w-4 h-4" />
          {currentStore?.label ? currentStore?.label : 'Select Store'}
          <ChevronsUpDownIcon className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="Stores" className="">
              {formattedItems?.map((store) => (
                <CommandItem
                  key={store.value}
                  className="text-sm"
                  onSelect={() => onSelectStore(store)}
                >
                  <StoreIcon className="mr-2 w-4 h-4" />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto w-4 h-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 w-4 h-4" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
