'use client';

import AudioPlayButton from '@/components/AudioPlayButton';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { dbClient, storageClient } from '@/firebase/client';
import { blobToAudioBuffer } from '@/utils';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { ref as _ref, uploadBytes } from 'firebase/storage';
import { Mic, Pause, Play, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {};

type FormProps = {
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
  title: string;
  pitchStr: string;
};

const INITIAL_STATE: FormProps = {
  blob: null,
  isRecording: false,
  audioBuffer: null,
  audio: null,
  title: '',
  pitchStr: '',
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const RecordPane = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(dbClient, 'temp', 'recordParams'), (doc) => {
      if (!doc.exists) return;

      const { title, pitchStr } = doc.data()!;
      setValue((prev) => ({
        ...prev,
        title,
        pitchStr,
        blob: null,
        audioBuffer: null,
      }));

      return () => unsub();
    });
  }, []);

  // 録音完了時
  const handleDataVaiable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;

    const audioBuffer = await blobToAudioBuffer(blob);
    if (!audioBuffer) return;

    // local
    setValue((prev) => ({
      ...prev,
      blob,
      audioBuffer,
    }));

    const path = `/anon/${value.title}.mp3`;
    // storage
    await uploadBytes(_ref(storageClient, path), blob);

    // db
    addDoc(collection(dbClient, 'records'), {
      path,
      title: value.title,
      pitchStr: value.pitchStr,
      created_at: Date.now(),
    });
  };

  const start = async () => {
    if (!navigator.mediaDevices || !value.audio) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const mediaRecorder = new MediaRecorder(stream);

    // streamと連携してマイクを切るため
    ref.current = {
      ...ref.current,
      mediaRecorder,
    };

    // データが入力された時の処理
    mediaRecorder.ondataavailable = handleDataVaiable;

    // 録音開始
    mediaRecorder.start();

    setValue((prev) => ({
      ...prev,
      isRecording: true,
      audio: {
        ...prev.audio!,
        srcObject: stream,
      },
    }));
  };

  const stop = () => {
    const { mediaRecorder } = ref.current;
    if (!mediaRecorder || !value.audio) return;

    mediaRecorder.stop();

    const stream = value.audio.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });

    // ブラウザのマイク使用中の表示を消すために必要
    ref.current = {
      ...ref.current,
      mediaRecorder: undefined,
    };

    setValue((prev) => ({
      ...prev,
      isRecording: false,
      isChecking: true,
      audio: { ...prev.audio!, srcObject: null },
    }));
  };

  const handleClick = () => {
    value.isRecording ? stop() : start();
  };

  return (
    <div className='grid gap-12 mt-10'>
      <div className='text-center text-2xl font-extrabold h-8'>
        {value.title}
      </div>
      <div className='p-2 rounded flex justify-center bg-white/60 min-h-14'>
        <SentencePitchLine pitchStr={value.pitchStr} />
      </div>
      <div className='grid items-center gap-32 justify-center'>
        {value.audioBuffer ? (
          <AudioPlayButton
            audioBuffer={value.audioBuffer}
            PlayIcon={<Play className='w-40 h-40' />}
            PauseIcon={<Pause className='w-40 h-40' />}
            size={'icon'}
            variant={'ghost'}
            className='w-40 h-40 rounded-full p-4'
          />
        ) : (
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full w-40 h-40 p-4'
            onClick={handleClick}
          >
            {value.isRecording ? (
              <StopCircle className='w-40 h-40' />
            ) : (
              <Mic className='w-40 h-40' />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecordPane;
