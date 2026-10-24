import svgPaths from "./svg-xjmfdde6gp";
import imgArthurAAChQ2CYg1YsUnsplash1 from "figma:asset/d3c7a1f8a1d998217282b08ed2e73fff977e8b60.png";
import imgPocketGuruLogo1 from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";

function SignalWifiBattery() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[14px] items-start left-[calc(50%+153.5px)] top-[calc(50%-429px)] w-[89px]" data-name="Signal, Wifi, Battery">
      <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Icon / Mobile Signal">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p1ec31400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p19f8d480} fill="var(--fill-0, black)" />
            <path d={svgPaths.p13f4aa00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1bfb7500} fill="var(--fill-0, black)" />
          </g>
        </svg>
      </div>
      <div className="h-[11.834px] relative shrink-0 w-[17px]" data-name="Wifi">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 11.8338">
          <path d={svgPaths.p17a4bf30} fill="var(--fill-0, black)" id="Wifi" />
        </svg>
      </div>
      <div className="h-[13px] relative shrink-0 w-[27.401px]" data-name="_StatusBar-battery">
        <div className="-translate-y-1/2 absolute h-[13px] left-0 right-[2.4px] top-1/2" data-name="Outline">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 13">
            <path d={svgPaths.p3f827980} id="Outline" opacity="0.35" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute h-[4.22px] right-0 top-[calc(50%+0.61px)] w-[1.401px]" data-name="Battery End">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.40119 4.22034">
            <path d={svgPaths.p237cb000} fill="var(--fill-0, black)" id="Battery End" opacity="0.4" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute h-[9px] left-[2px] right-[4.4px] top-1/2" data-name="Fill">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 9">
            <path d={svgPaths.pa544c00} fill="var(--fill-0, black)" id="Fill" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FaceTimeCamera() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black left-[calc(50%+44px)] rounded-[100px] size-[37px] top-1/2" data-name="FaceTime camera" />;
}

function Group() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-[calc(50%-429px)]">
      <SignalWifiBattery />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[42px] left-1/2 rounded-[100px] top-[calc(50%-429px)] w-[142px]" data-name="StatusBar-dynamicIsland">
        <FaceTimeCamera />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[24px] left-[calc(50%-167.5px)] rounded-[24px] top-[calc(50%-429px)] w-[61px]" data-name="_StatusBar-time">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[21px] left-[27px] not-italic text-[16px] text-black text-center top-px tracking-[-0.32px] w-[54px] whitespace-pre-wrap">9:41</p>
      </div>
    </div>
  );
}

export default function LogIn() {
  return (
    <div className="bg-black relative size-full" data-name="Log in">
      <div className="absolute h-[981px] left-[-546px] top-0 w-[1471px]" data-name="arthur-a-aChQ2cYg1ys-unsplash 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-50 pointer-events-none size-full" src={imgArthurAAChQ2CYg1YsUnsplash1} />
      </div>
      <div className="absolute h-[930px] left-[-849px] top-0 w-[1697px]" data-name="photorealistic-money-with-plant 1" />
      <Group />
      <div className="-translate-x-1/2 absolute h-[36px] left-1/2 top-[553px] w-[142px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 36">
          <path d={svgPaths.p14e9ad40} fill="var(--fill-0, #FFDD36)" id="Rectangle 9" />
        </svg>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[30px] leading-[normal] left-[215px] not-italic text-[18px] text-black text-center top-[559px] w-[86px] whitespace-pre-wrap">Sign in</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[112px] not-italic text-[14px] text-white top-[607px]">
        <span className="leading-[normal]">{`Don’ Have Account? `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">Sign up</span>
      </p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%+4px)] not-italic text-[15px] text-center text-white top-[806px]">Tip: Start small, focus on long-term growth</p>
      <div className="absolute h-[180px] left-[157px] top-[135px] w-[117px]" data-name="PocketGuru Logo 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.07%] left-[-48.32%] max-w-none top-[-0.03%] w-[444.9%]" src={imgPocketGuruLogo1} />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[215.5px] not-italic text-[32px] text-center text-white top-[333px]">Sign in</p>
      <div className="absolute bg-[#ffdd36] h-[46px] left-[42px] rounded-[16px] top-[419px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[61px] not-italic text-[18px] text-[rgba(0,0,0,0.43)] top-[431px]">Email</p>
      <div className="absolute bg-[#ffdd36] h-[46px] left-[44px] rounded-[16px] top-[489px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[59px] not-italic text-[18px] text-[rgba(0,0,0,0.43)] top-[501px]">Password</p>
    </div>
  );
}