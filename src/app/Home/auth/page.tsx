import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { isMobile } from "react-device-detect";

export default function AuthPage() {
  // useSearchParams를 한 번만 호출하여 params 값을 얻습니다.
  const [searchParams] = useSearchParams();
  const params = searchParams.get("target");

  // extractor 함수 수정
  const extractor = (params: string | null) => {
    if (!params) {
      return [];
    }
    // 파라미터를 ","로 분리하고, 첫 두 요소만 반환합니다.
    const split = params.split(",");
    return split.slice(0, 2); // 첫 두 항목만 반환
  };

  const targets = extractor(params);

  // content 파라미터 가져오기
  const content = searchParams.get("content");
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const refs = [ref1, ref2, ref3, ref4];
  const items = [1, 2, 3, 4];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [x, setX] = useState(0);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    refs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={twMerge(
        "w-full h-screen snap-manatory",
        isMobile
          ? "snap-x snap-mandatory overflow-x-auto flex"
          : "snap-y overflow-y-auto"
      )}
      ref={containerRef}
    >
      {isMobile && (
        <div className="fixed w-full top-[50%] left-0 translate-y-[-50%]">
          {/* Previous Button */}
          <button
            className="w-10 h-auto px-2.5 absolute bottom-0 left-0"
            onClick={() => {
              if (currentIndex === 0) {
                return;
              }
              scrollToIndex(currentIndex - 1);
            }}
          >
            이전
          </button>
          {/* Next Button */}
          <button
            className="w-10 h-auto px-2.5 absolute bottom-0 right-0"
            onClick={() => {
              if (currentIndex < items.length - 1) {
                scrollToIndex(currentIndex + 1);
              }
            }}
          >
            다음
          </button>
        </div>
      )}
      {items.map((item, index) => (
        <div
          className={twMerge(
            "min-w-full h-full border-2 snap-start text-white",
            isMobile ? "bg-theme" : "bg-black"
          )}
          key={item}
          ref={refs[index]}
          draggable
          onDragStart={(e) => {
            setCurrentIndex(index);
            setX(e.clientX);
            console.log("set currentindex to", index);
          }}
          onDragOver={(e) => {
            const isBigger = x > e.clientX;
            if (isBigger && index > 0) {
              console.log("show previous slide");
              scrollToIndex(index - 1);
            } else if (index < items.length - 1) {
              console.log("show next slide");
              scrollToIndex(index + 1);
            }
          }}
        >
          slide{item}
        </div>
      ))}
    </div>
  );
}
