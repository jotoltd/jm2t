import { useEffect } from 'react';

export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | JM² Tiling Co`;
    return () => { document.title = 'JM² Tiling Co | Professional Tiling Surrey & West Sussex'; };
  }, [title]);
}
