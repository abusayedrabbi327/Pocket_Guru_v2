import svgPaths from "./svg-zeu5l04bre";
import imgImage from "figma:asset/f25388cfed501637e16c2d4ee95f02f05e888d3e.png";
import imgImage1 from "figma:asset/b13d9d1d57717111a08af878f6844add4b7b78e2.png";
import imgActivityFeed from "figma:asset/358ea11a8f65708ded4b8ed77ad715aad996878a.png";
import imgTransaction from "figma:asset/50712cbab57c218b0031c672d299b1943787cb15.png";
import imgAccount from "figma:asset/08867ec4769698d7c6fc2ba9fe2c3afa43896bf7.png";
import imgHomePage from "figma:asset/916eafc1fb9ec2347e54a0986c1b99d99d2524c9.png";
import imgImage2 from "figma:asset/ef4c83d711fd8467e8176bd303083a92dc803f84.png";

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

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-end left-[298px] pb-[23px] top-[403px] w-[101px]">
      <div className="bg-[#ffdd36] h-[29px] mb-[-23px] rounded-[10px] shrink-0 w-full" />
      <p className="font-['Inter:Medium',sans-serif] font-medium h-[23px] leading-[normal] not-italic relative shrink-0 text-[14px] text-black text-center w-[91px] whitespace-pre-wrap">Add Goal</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[298px] top-[403px]">
      <Frame />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[32px] top-[341px]">
      <div className="absolute bg-[#ffdd36] h-[53px] left-[32px] rounded-[10px] top-[341px] w-[367px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[17px] leading-[normal] left-[340px] not-italic text-[12px] text-black top-[363px] w-[49px] whitespace-pre-wrap">Goal #1</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43px] not-italic text-[20px] text-black top-[356px]">1000 BDT</p>
      <Group4 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[18px] top-[146px]">
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[675px] left-[18px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[146px] w-[394px]" />
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[32px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[612px] w-[365px]" />
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[0] left-[116px] not-italic text-[#aaa] text-[0px] text-[11px] text-justify top-[642px] w-[272px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`Money worries are for many people an important cause of `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="https://www.alwujud.com/stress/">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="https://www.alwujud.com/stress/">
              stress
            </span>
          </a>
          <span className="leading-[normal]">{` and sleepless nights. How do you`}</span>
          <span className="leading-[normal]">{` `}</span>
          <span className="leading-[normal]">get out of financial trouble?</span>
        </p>
        <p className="leading-[normal]">&nbsp;</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[116px] not-italic text-[13px] text-black top-[621px] whitespace-nowrap">
        <p className="mb-0">Simple ways to save money for the future</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute h-[72px] left-[42px] rounded-[5px] top-[616px] w-[67px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[5px] size-full" src={imgImage} />
      </div>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[31px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[708px] w-[365px]" />
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[0] left-[114px] not-italic text-[#aaa] text-[0px] text-[11px] text-justify top-[741px] w-[272px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`Money worries are for many people an important cause of `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="https://www.alwujud.com/stress/">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="https://www.alwujud.com/stress/">
              stress
            </span>
          </a>
          <span className="leading-[normal]">{` and sleepless nights. How do you`}</span>
          <span className="leading-[normal]">{` `}</span>
          <span className="leading-[normal]">get out of financial trouble?</span>
        </p>
        <p className="leading-[normal]">&nbsp;</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[114px] not-italic text-[13px] text-black top-[720px] whitespace-nowrap">
        <p className="mb-0">Simple Steps to Begin Saving Money</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute h-[72px] left-[40px] rounded-[5px] top-[715px] w-[67px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[5px] size-full" src={imgImage1} />
      </div>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[34px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[510px] w-[365px]" />
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[46px] leading-[0] left-[117px] not-italic text-[#aaa] text-[0px] text-[11px] text-justify top-[543px] w-[272px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`Money worries are for many people an important cause of `}</span>
          <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="https://www.alwujud.com/stress/">
            <span className="[text-decoration-skip-ink:none] decoration-solid leading-[normal]" href="https://www.alwujud.com/stress/">
              stress
            </span>
          </a>
          <span className="leading-[normal]">{` and sleepless nights. How do you`}</span>
          <span className="leading-[normal]">{` `}</span>
          <span className="leading-[normal]">get out of financial trouble?</span>
        </p>
        <p className="leading-[normal]">&nbsp;</p>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[117px] not-italic text-[13px] text-black top-[522px]">How you can save money</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[94px] not-italic text-[20px] text-black top-[465px]">{`• Financial Literacy Hub • `}</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[254px] not-italic text-[0px] text-black top-[253px] w-[163px] whitespace-pre-wrap">
        <span className="leading-[normal] text-[32px]">{` `}</span>
        <span className="leading-[normal] text-[14px]">BDT</span>
      </p>
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_Bengali:SemiBold',sans-serif] font-semibold leading-[normal] left-[156px] not-italic text-[40px] text-black top-[245px] w-[108px] whitespace-pre-wrap">৳750</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[calc(50%-130px)] not-italic text-[28px] text-black text-center top-[258px] tracking-[-0.32px]">75%</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[138px] not-italic text-[20px] text-black top-[163px]">{`• Saving Goals • `}</p>
      <Group3 />
      <div className="absolute flex items-center justify-center left-[34px] size-[98px] top-[220px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
              <path d={svgPaths.p30cfb680} fill="var(--fill-0, #E6484E)" id="Ellipse 1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-[851px]">
      <div className="-translate-x-1/2 absolute bg-[#ffdd36] h-[101px] left-1/2 rounded-[20px] top-[851px] w-[430px]" />
      <div className="absolute left-[254px] size-[30px] top-[866px]" data-name="Activity Feed">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgActivityFeed} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[269px] not-italic text-[13px] text-black text-center top-[896px] tracking-[-0.32px]">{`Activity `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[157.5px] not-italic text-[13px] text-center text-white top-[896px] tracking-[-0.32px]">Transaction</p>
      <div className="absolute left-[142px] size-[30px] top-[866px]" data-name="Transaction">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgTransaction} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[269px] not-italic text-[13px] text-black text-center top-[896px] tracking-[-0.32px]">{`Activity `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[375.5px] not-italic text-[13px] text-center text-white top-[896px] tracking-[-0.32px]">{`Account `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[48.5px] not-italic text-[13px] text-center text-white top-[896px] tracking-[-0.32px]">{`Home `}</p>
      <div className="absolute left-[361px] size-[30px] top-[866px]" data-name="Account">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgAccount} />
      </div>
    </div>
  );
}

export default function Activity() {
  return (
    <div className="bg-white relative size-full" data-name="Activity">
      <Group />
      <Group1 />
      <Group2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[215.5px] not-italic text-[#e6484e] text-[32px] text-center top-[77px]">Activity</p>
      <div className="absolute left-[34px] size-[30px] top-[867px]" data-name="Home Page">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHomePage} />
      </div>
      <div className="absolute h-[72px] left-[43px] rounded-[5px] top-[517px] w-[67px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[5px] size-full" src={imgImage2} />
      </div>
    </div>
  );
}