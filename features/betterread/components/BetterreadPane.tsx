import Image from 'next/image';
import { useMemo } from 'react';
import { BETTER_READ_ITEMS } from '../constants';

type Props = { user: string };

type BetterReadLine = {
  japanese: string;
  chinese: string;
  imageSrc: string;
  index: number;
};

const BetterreadPane = ({ user }: Props) => {
  const items = BETTER_READ_ITEMS[user];

  const lines = useMemo(() => {
    const line_j = items.japanese.split('\n');
    const line_c = items.chinese.split('\n');

    const lines: BetterReadLine[] = [];

    for (let i = 0; i < line_j.length; i++) {
      const line: BetterReadLine = {
        index: i,
        japanese: line_j.at(i) || '',
        chinese: line_c.at(i) || '',
        imageSrc: items.imageSrcs.at(i) || '',
      };
      lines.push(line);
    }
    return lines;
  }, [items]);

  return (
    <div className='grid gap-8 pt-10'>
      {lines.map((line, index) => (
        <div className='flex gap-4' key={index}>
          <div className='basis-2 text-right text-xs'>{line.index! + 1}</div>
          <div className='flex-1 space-y-2'>
            <div className='text-sm font-extrabold'>{line.japanese}</div>
            <div className='text-xs text-green-600'>{line.chinese}</div>
            {!!line.index && line.imageSrc ? (
              <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
                <Image
                  src={line.imageSrc}
                  alt=''
                  className='rounded-lg'
                  width={512}
                  height={512}
                  sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
                />
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BetterreadPane;
