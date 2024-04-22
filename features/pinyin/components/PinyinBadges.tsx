import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pinyin } from "..";
import { pinyinColor } from "../services/pinyinColor";

const PinyinBadges = ({ pinyin }: { pinyin: Pinyin | undefined }) => {
  if (!pinyin) return null;
  return (
    <div className="flex items-center overflow-hidden rounded border-2 border-stone-400">
      {pinyin.consonant ? (
        <Badge
          variant="outline"
          className={cn(pinyinColor(pinyin.consonant), "m-0 rounded-none px-1")}
        >
          {pinyin.consonant}
        </Badge>
      ) : null}
      {pinyin.vowel ? (
        <Badge
          variant="outline"
          className={cn(pinyinColor(pinyin.vowel), "m-0 rounded-none px-1")}
        >
          {pinyin.vowel}
        </Badge>
      ) : null}
      <Badge variant="outline" className="m-0 rounded-none bg-white px-1">
        {pinyin.tone}
      </Badge>
    </div>
  );
};

export default PinyinBadges;
