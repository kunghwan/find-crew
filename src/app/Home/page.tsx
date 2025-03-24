import { useRef } from "react";
import { HomeDesc, HomeDescs } from "../../contents";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  item: HomeDesc;
  index: number;
}
// const bottom = useRef<HTMLDivElement>(null);
function HomeItem({ item, index }: ItemProps) {
  const navi = useNavigate();

  return (
    <div
      key={index}
      ref={item.title === "기확자 라면" ? bottom : null}
      className="col gap-y-5 min-h-screen justify-center snap-start scroll-auto items-center sm:items-start"
    >
      <h1>{item.title}</h1>
      <p className="p ">{item.subTitle}</p>
      <div className="row justify-center sm:justify-start">
        <button
          onClick={() => navi(`auth?target=${item.btnTitle}&content=기본정보`)}
          className="sd primary"
        >
          {item.btnTitle}
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="p-5 snap-y gap-y-12 snap-mandatory overflow-y-auto h-screen ">
      {HomeDescs.map((item, index) => (
        <HomeItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
