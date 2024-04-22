import { Dispatch, SetStateAction } from 'react';
import { PaperCupCue, PaperCupPatternParams } from '../../schema';
import PaperCupCheckbox from './PaperCupCheckbox';

type Props = {
  value: PaperCupPatternParams;
  setValue: Dispatch<SetStateAction<PaperCupPatternParams>>;
  currentCue: PaperCupCue;
  setCurrentCue: Dispatch<SetStateAction<PaperCupCue>>;
};

const PatternSwitches = ({
  value,
  setValue,
  currentCue,
  setCurrentCue,
}: Props) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <div className='select-none text-sm'>主題</div>
        <PaperCupCheckbox
          prop='hasWoTopic'
          label='ヲ格'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasNiTopic'
          label='ニ格'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasNoneTopic'
          label='なし'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        {!value.hasWoTopic && !value.hasNiTopic && !value.hasNoneTopic && (
          <div style={{ fontSize: 12, color: 'red' }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>分類</div>
        <PaperCupCheckbox
          prop='hasWoGrouping'
          label='ヲ格'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasNiGrouping'
          label='ニ格'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasNoneGrouping'
          label='なし'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />

        {!value.hasWoGrouping &&
          !value.hasNiGrouping &&
          !value.hasNoneGrouping && (
            <div style={{ fontSize: 12, color: 'red' }}>
              １つ以上指定してださい
            </div>
          )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>格順</div>
        <PaperCupCheckbox
          prop='hasStraightOrder'
          label='正順'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasInvertOrder'
          label='逆順'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        {!value.hasStraightOrder && !value.hasInvertOrder && (
          <div style={{ fontSize: 12, color: 'red' }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>肯否</div>
        <PaperCupCheckbox
          prop='hasPositive'
          label='肯定'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        <PaperCupCheckbox
          prop='hasNegative'
          label='否定'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        {!value.hasPositive && !value.hasNegative && (
          <div style={{ fontSize: 12, color: 'red' }}>
            １つ以上指定してださい
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: 16 }}>
        <div style={{ fontSize: 14, userSelect: 'none' }}>
          主題と分類の重複指定
        </div>
        <PaperCupCheckbox
          prop='hasGroupingTopic'
          label='許可'
          value={value}
          setValue={setValue}
          currentCue={currentCue}
          setCurrentCue={setCurrentCue}
        />
        {value.hasGroupingTopic && (
          <div style={{ fontSize: 12, color: 'red' }}>
            主題と分類の重複指定が許可されました
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternSwitches;
