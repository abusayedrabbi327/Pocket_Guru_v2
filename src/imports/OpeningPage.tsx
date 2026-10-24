import svgPaths from "./svg-ajydxxndj8";
import imgWf1429688Bgd20220111WfpSayedAsifMahmudDsc763411 from "figma:asset/762217278e01ce4a4ea2659d383fab83e8c536de.png";
import imgGmailLogo from "figma:asset/2bb7e8aa64500c935d7f836b82013a787cd8baae.png";
import imgPhone from "figma:asset/02803e70e46740f44de4879304f8e58ac9a2818a.png";
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

export default function OpeningPage() {
  return (
    <div className="bg-black relative size-full" data-name="Opening Page">
      <div className="absolute h-[932px] left-[-236px] top-0 w-[1272.662px]" data-name="WF1429688_BGD_20220111_WFP_Sayed-Asif-Mahmud__DSC7634 (1) 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-70 pointer-events-none size-full" src={imgWf1429688Bgd20220111WfpSayedAsifMahmudDsc763411} />
      </div>
      <div className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-1/2 not-italic text-[20px] text-center text-white top-[407px] whitespace-nowrap">
        <p className="mb-0">Track your spending</p>
        <p>{` habits hassle-free`}</p>
      </div>
      <div className="absolute bg-[#ffdd36] h-[41px] left-[26px] rounded-[20px] top-[770px] w-[378px]" />
      <div className="absolute bg-[#ffdd36] h-[41px] left-[26px] rounded-[20px] top-[712px] w-[378px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-1/2 not-italic text-[16px] text-black text-center top-[780px]">Sign up with mail</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(50%+11px)] not-italic text-[12px] text-center text-white top-[828px]">
        <span className="leading-[normal]">{`Already Have Account? `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal] underline">{`Sign In `}</span>
      </p>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[calc(50%+0.5px)] not-italic text-[16px] text-black text-center top-[723px]">Sign up with phone number</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[calc(50%-1px)] not-italic text-[10px] text-center text-white top-[909px]">All rights reserved. Copyright © POCKETGURU.INC</p>
      <Group />
      <div className="absolute h-[36px] left-[46px] top-[773px] w-[29px]" data-name="Gmail Logo">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgGmailLogo} />
      </div>
      <div className="absolute h-[29px] left-[50px] top-[720px] w-[25px]" data-name="Phone">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgPhone} />
      </div>
      <div className="absolute h-[140px] left-[13px] top-[219px] w-[404px]" data-name="PocketGuru Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPocketGuruLogo1} />
      </div>
    </div>
  );
}