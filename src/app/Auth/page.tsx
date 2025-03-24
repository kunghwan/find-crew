import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import { FormEvent, useCallback, useState } from "react";
import { jobDescs } from "../../constants";
import { twMerge } from "tailwind-merge";
import useTextInput from "../../components/ui/useTextInput";

export default function AuthPage() {
  const params = useSearchParams()[0].get("target");

  const extractor = (params: string | null): TeamUserJob[] => {
    if (!params) {
      return [];
    }
    const copy = params.replace(",", "");
    const split = copy.split(" ");
    return split.slice(0, 2) as TeamUserJob[];
  };
  const [teamUser, setTeamUser] = useState(initialState);

  const [targets, setTargets] = useState(extractor(params));

  const content = useSearchParams()[0].get("content");

  const navi = useNavigate();

  const location = useLocation();

  const Name = useTextInput();
  const Email = useTextInput();

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!content) {
        if (targets.length === 0) {
          alert("찾으시는 직군 선택");
          return;
        }

        return navi(`${location.pathname}?content=기본정보`);
      }

      switch (content) {
        case "기본정보":
          return console.log("기본정보");
      }
    },
    [content, targets, navi]
  );

  return (
    <div>
      <form className="col border gap-y-2.5" onSubmit={onSubmit}>
        {!content ? (
          <div>
            <h1>어떤 직군을 영입하고 싶으신가요?</h1>
            <p>여러 직군으 복수 선택할 수 있습니다.</p>
            <ul className="wrap">
              {jobDescs.map((job) => {
                const selected = targets.find((item) => item === job)
                  ? true
                  : false;
                const onClick = () => {
                  setTargets((prev) =>
                    selected
                      ? prev.filter((item) => item !== job)
                      : [...prev, job]
                  );
                };
                return (
                  <li key={job}>
                    <button
                      type="button"
                      onClick={onClick}
                      className={twMerge(
                        "rounded-full bg-white text-theme border border-theme",
                        selected && "primary bg-theme text-white "
                      )}
                    >
                      {job}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          {
            기본정보: (
              <>
                <div>
                  <Name.Component
                    label="이름"
                    onChangeText={(name) => {
                      setTeamUser((prev) => ({ ...prev, name }));
                    }}
                    value={name}
                  ></Name.Component>
                </div>
                <div>직군</div>
                <div>이메일</div>
              </>
            ),
          }[content]
        )}
        <div className="row gap-x-2.5">
          <button type="button" onClick={() => navi(-1)}>
            이전
          </button>
          <button className="primary px-5">다음</button>
        </div>
      </form>
    </div>
  );
}

const initialState: TeamUser = {
  email: "",
  experiences: [],
  intro: "",
  jobDesc: "개발자",
  moblie: "010",
  name: "유경환",
  targets: [],
  uid: "",
};
