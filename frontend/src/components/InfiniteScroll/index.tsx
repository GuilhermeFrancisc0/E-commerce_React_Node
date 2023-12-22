import * as React from 'react';

import { Box, Button, CircularProgress } from '@mui/material';

type Props = {
    direction: 'up' | 'down';
    loading: boolean;
    isLastPage: boolean;
    nextPage: () => void;
    children: React.ReactNode;
};

const InfiniteScroll: React.FC<Props> = ({ direction, loading, isLastPage, nextPage, children }) => {
    const ref = React.useRef<HTMLElement>();

    const handleScroll = (e: Event) => {

        if (loading || isLastPage) return;

        const el = e.target as HTMLElement;

        if (direction === 'down') {
            const heightDiff = Math.abs(
                el.scrollHeight - (el.scrollTop + el.offsetHeight)
            );

            if (heightDiff < 5)
                nextPage();
        } else {
            if (!el.scrollTop)
                nextPage();
        }
    }

    React.useEffect(() => {
        if (ref.current)
            ref.current.addEventListener('scroll', handleScroll);

        return () => {
            if (ref.current)
                ref.current.removeEventListener('scroll', handleScroll);
        }
    }, [loading, isLastPage]);

    return (
        <Box ref={ref} overflow='auto' height='100%'>
            {direction === 'down' && children}

            {loading &&
                <Box
                    display='flex'
                    justifyContent='center'
                    mb={direction === 'down' ? 2 : 0}
                    mt={direction === 'up' ? 2 : 0}
                >
                    <CircularProgress />
                </Box>
            }

            {!loading && !isLastPage &&
                <Box
                    display='flex'
                    justifyContent='center'
                    mb={direction === 'down' ? 2 : 0}
                    mt={direction === 'up' ? 2 : 0}
                >
                    <Button onClick={nextPage}>
                        Ver Mais
                    </Button>
                </Box>
            }

            {direction === 'up' && children}
        </Box>
    )
};

export default InfiniteScroll;
