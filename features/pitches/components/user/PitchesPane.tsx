'use client';

import { Slider } from '@/components/ui/slider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { dbClient } from '@/firebase/client';
import { cn } from '@/lib/utils';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { updatePitchesUser } from '../../services/client';

type Props = {};

type FormProps = {
  pitchStr: string;
  japanese: string;
  index: number;
};

const INITIAL_STATE: FormProps = {
  pitchStr: '',
  japanese: '',
  index: 0,
};

const PitchesPane = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const moras = useMemo(() => buildMoras(value.pitchStr), [value]);

  useEffect(() => {
    const unsub = onSnapshot(doc(dbClient, 'temp', 'pitches'), (doc) => {
      if (!doc.exists()) {
        setValue((prev) => ({ ...prev, pitchStr: '', index: 0, japanese: '' }));
        return;
      }

      const { pitchStr, japanese } = doc.data();
      const index = getAccentIndex(pitchStr);

      // local
      setValue((prev) => ({ ...prev, pitchStr, index, japanese }));

      // remote
      updatePitchesUser(pitchStr);
    });
    return () => unsub();
  }, []);

  const handleChange = (_value: number[]) => {
    const index = _value[0];
    const pitchStr = buildNewPitchStr(value.pitchStr, index);
    // local
    setValue((prev) => ({
      ...prev,
      pitchStr,
      index,
    }));

    // remote
    updatePitchesUser(pitchStr);
  };

  if (!value.pitchStr) return <></>;

  return (
    <div className='grid gap-16 max-w-sm mx-auto pt-10'>
      <div className='grid gap-4'>
        <div className='text-center text-sm'>{value.japanese}</div>
        <div className='grid bg-white/60 p-5 rounded justify-center'>
          <SentencePitchLine pitchStr={value.pitchStr} />
        </div>
      </div>
      <div className='grid gap-3'>
        <Slider
          min={0}
          max={moras.length}
          step={1}
          value={[value.index]}
          onValueChange={handleChange}
        />
        <div className='flex px-2.5 relative'>
          {moras.map((_, index) => (
            <div
              key={index}
              className={cn(
                'flex-1  -ml-1   font-extrabold',
                !!index && value.index === index
                  ? 'text-red-500'
                  : 'text-slate-700'
              )}
            >
              {index}
            </div>
          ))}
          <div
            className={cn(
              'absolute text-slate-700 font-extrabold right-0 -top-0',
              value.index === moras.length ? 'text-red-500' : 'text-slate-700'
            )}
          >
            {moras.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchesPane;

const ACCENT_MARK = '\uff3c';

const YOUONS = [
  'ゃ',
  'ゅ',
  'ょ',
  'ャ',
  'ュ',
  'ョ',
  'ぁ',
  'ぃ',
  'ぅ',
  'ぇ',
  'ぉ',
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
];

function buildMoras_no_remove_mark(input: string): string[] {
  return input.split('').reduce((acc, cur, index) => {
    // 拗音が含まれていない場合
    if (!YOUONS.includes(cur)) {
      return [...acc, cur];
    }

    // 拗音が含まれている場合
    if (index === 0) throw new Error('拗音が先頭にある！');

    acc[acc.length - 1] = acc.at(-1)! + cur;
    return acc;
  }, [] as string[]);
}

function buildMoras(input: string) {
  if (!input) return [];
  const _input = input.replace(ACCENT_MARK, '');
  return buildMoras_no_remove_mark(_input);
}

function buildNewPitchStr(pitchStr: string, accentIndex: number) {
  const moras = buildMoras(pitchStr);

  if (accentIndex > 0) {
    moras.splice(accentIndex, 0, ACCENT_MARK);
  }

  return moras.join('');
}

function getAccentIndex(pitchStr: string) {
  return Math.max(buildMoras_no_remove_mark(pitchStr).indexOf(ACCENT_MARK), 0);
}
