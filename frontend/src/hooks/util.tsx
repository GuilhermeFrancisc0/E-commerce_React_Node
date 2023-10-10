import { useState } from 'react';

export const useDisclose = (open = false) => {
    const [isOpen, setIsOpen] = useState(open);

    const onToggle = () => setIsOpen(value => !value);

    const onOpen = () => setIsOpen(true);

    const onClose = () => setIsOpen(false);

    return { isOpen, onToggle, onOpen, onClose }
}