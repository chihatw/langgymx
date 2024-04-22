import { Record } from '@/features/record/schema';
import { LineAudioPath } from '../../schema';
import { buildNoteLines } from '../../services/utils';
import NoteMngRow from './NoteMngRow';

type Props = {
  value: string;
  records?: Record[];
  lineAudioPaths?: LineAudioPath[];
};

const NoteMngMonitor = ({ value: _value, records, lineAudioPaths }: Props) => {
  const noteLines = buildNoteLines(_value);

  return (
    <div className='grid gap-4'>
      {noteLines.length &&
        noteLines.map((item, index) => {
          if (!item.label && !item.pitchStr) return <></>;
          const audioPath = lineAudioPaths
            ? lineAudioPaths.find((item) => item.line === index)?.audioPath
            : undefined;
          return (
            <NoteMngRow
              key={index}
              index={index}
              label={item.label}
              pitchStr={item.pitchStr}
              records={records}
              audioPath={audioPath}
            />
          );
        })}
    </div>
  );
};

export default NoteMngMonitor;
