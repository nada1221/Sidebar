import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);
  console.log(sideOpen);
  const sidebarRef = useRef(null); // sidebar ref 설정

  //클릭시 sideOpen의 상태를 변경한다.
  const sidebarHandler = () => {
    setSideOpen(!sideOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // sidebar ref가 null이 아니고, 클릭한 element가 sidebar 영역 밖에 있으면 sidebar를 닫는다.
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSideOpen(false);
      }
    };

    if (sideOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideOpen]);

  return (
    <div
      className={
        sideOpen
          ? "relative flex flex-col h-screen z-50 bg-my-darkGray  transition-all duration-300"
          : "absolute flex flex-col h-screen z-50  transition-all duration-300"
          //sidebar 가 open 일 시 relative 를 통해 div 들을 밀어내고, close 일 시 absolute 로 div 의 위치들을 돌려놓는다.
      }
      style={{
        left: sideOpen ? "0" : "-377px",
        //sidebar 가 open 일 시 left 0으로 시작점을 맞춰주며, close일 시 width 값 만큼 minus를 해줌으로서 왼쪽으로 숨겨줄 수 있다.
        //응용으로는 오른쪽일 시 right 로 바꿔주고 minus 를 plus 로 바꿔주면 오른쪽에서 왼쪽으로 밀고나오는 sidebar를 만들어 줄 수 있다.
      }}
    >
      <div
        className="flex flex-col justify-center items-center scrollbar-hide transition-all "
        ref={sidebarRef}
      >
        <div
          className=" flex text-center mt-12 mb-4 font-bold text-4xl leading-10 text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          {"Header"}
        </div>
        {/* 사이드바 메뉴 칸 */}
        <div className="">
          <SidebarMenu />
        </div>

      </div>
      <img
        className="absolute transition-all ease-in-out duration-200 w-8 h-6 top-9"
        src={burgerMenu}
        style={{ left: sideOpen ? "417px" : "417px" }}
        onClick={sidebarHandler}
      />
    </div>
  );
};

export default Sidebar;
