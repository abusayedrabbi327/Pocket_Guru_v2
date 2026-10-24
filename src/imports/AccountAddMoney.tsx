import svgPaths from "./svg-2vjz52cigc";
import imgPocketGuruLogo1 from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import imgHomePage from "figma:asset/3d7d726999aecc9e8c618c893cfd7a13603d513d.png";
import imgTransaction from "figma:asset/50712cbab57c218b0031c672d299b1943787cb15.png";
import imgActivityFeed from "figma:asset/39b1ed003f3fb7e99992e162aaf65c5ad238ea2a.png";
import imgAccount from "figma:asset/08867ec4769698d7c6fc2ba9fe2c3afa43896bf7.png";
import imgLast24Hours from "figma:asset/e326d4f0a44d624f16760e1616dedfbd062fb395.png";

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

function Group1() {
  return (
    <div className="absolute contents left-[19px] top-[222px]">
      <div className="absolute bg-[#ffdd36] h-[41px] left-[19px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[70px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[35px] not-italic text-[15px] text-black top-[234px]">Bank</p>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[41px] left-[98px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[70px]" />
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[41px] left-[176px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[70px]" />
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[41px] left-[255px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[224px] w-[70px]" />
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[41px] left-[333px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[226px] w-[70px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[111px] not-italic text-[15px] text-black top-[235px]">bKash</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[189px] not-italic text-[15px] text-black top-[236px]">Nagad</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[262px] not-italic text-[15px] text-black top-[236px]">{`Rocket `}</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[344px] not-italic text-[15px] text-black top-[236px]">Other</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-[852px]">
      <div className="-translate-x-1/2 absolute bg-[#ffdd36] h-[101px] left-1/2 rounded-[20px] top-[852px] w-[430px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[157.5px] not-italic text-[13px] text-center text-white top-[897px] tracking-[-0.32px]">Transaction</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[269px] not-italic text-[13px] text-center text-white top-[897px] tracking-[-0.32px]">{`Activity `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[375.5px] not-italic text-[13px] text-center text-white top-[897px] tracking-[-0.32px]">{`Account `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[48.5px] not-italic text-[13px] text-black text-center top-[897px] tracking-[-0.32px]">{`Home `}</p>
      <div className="absolute left-[34px] size-[30px] top-[867px]" data-name="Home Page">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHomePage} />
      </div>
      <div className="absolute left-[142px] size-[30px] top-[867px]" data-name="Transaction">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgTransaction} />
      </div>
      <div className="absolute left-[254px] size-[30px] top-[867px]" data-name="Activity Feed">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgActivityFeed} />
      </div>
      <div className="absolute left-[361px] size-[30px] top-[867px]" data-name="Account">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgAccount} />
      </div>
    </div>
  );
}

function ProceedButton() {
  return (
    <div className="absolute contents left-[291px] top-[508px]" data-name="ProceedButton">
      <div className="absolute bg-[#e6484e] h-[35px] left-[291px] rounded-[10px] top-[508px] w-[94px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[20px] leading-[normal] left-[338px] not-italic text-[14px] text-center text-white top-[516px] w-[72px] whitespace-pre-wrap">Proceed</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents font-['Inter:Medium',sans-serif] font-medium left-0 not-italic text-[rgba(0,0,0,0.43)] text-center top-[83px] whitespace-pre-wrap">
      <div className="-translate-x-1/2 absolute h-[47px] leading-[0] left-[153px] text-[0px] text-[15px] top-[83px] w-[306px]">
        <p className="mb-[5px]">
          <span className="leading-[normal]">BANK</span>
          <span className="leading-[normal]">{` ACCOUNT`}</span>
          <span className="leading-[normal]">{` `}</span>
        </p>
        <p>
          <span className="leading-[normal]">VERIFICATION POP-UP</span>
          <span className="leading-[normal]">
            <br aria-hidden="true" />
          </span>
          <span className="leading-[normal]">
            <br aria-hidden="true" />
            <br aria-hidden="true" />
          </span>
        </p>
      </div>
      <p className="-translate-x-1/2 absolute decoration-solid leading-[normal] left-[153px] text-[11px] top-[133px] underline w-[306px]">Connected via SSL Commerz API</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[rgba(0,0,0,0.1)] h-[228px] left-0 rounded-[12px] top-0 w-[306px]" />
      <Group3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[228px] left-[62px] top-[572px] w-[306px]">
      <Group4 />
    </div>
  );
}

export default function AccountAddMoney() {
  return (
    <div className="bg-white relative size-full" data-name="Account Add Money">
      <Group />
      <div className="absolute h-[63px] left-[124px] top-[72px] w-[183px]" data-name="PocketGuru Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPocketGuruLogo1} />
      </div>
      <div className="absolute bg-[#ffdd36] h-[47px] left-[19px] rounded-[10px] top-[148px] w-[394px]" />
      <Group1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[67px] not-italic text-[15px] text-black top-[162px]">Add Income Transaction for the next month</p>
      <Group2 />
      <div className="absolute left-[26px] size-[30px] top-[156px]" data-name="Last 24 Hours">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgLast24Hours} />
      </div>
      <ProceedButton />
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[#e6484e] border-solid h-[37px] left-[42px] rounded-[12px] top-[302px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[53px] not-italic text-[14px] text-[rgba(0,0,0,0.43)] top-[312px]">Bank</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[#e6484e] border-solid h-[37px] left-[42px] rounded-[12px] top-[354px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[53px] not-italic text-[14px] text-[rgba(0,0,0,0.43)] top-[364px]">Name</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[#e6484e] border-solid h-[37px] left-[42px] rounded-[12px] top-[406px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[53px] not-italic text-[14px] text-[rgba(0,0,0,0.43)] top-[416px]">Account Number</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[#e6484e] border-solid h-[37px] left-[42px] rounded-[12px] top-[458px] w-[346px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[53px] not-italic text-[14px] text-[rgba(0,0,0,0.43)] top-[468px]">Branch</p>
      <Frame />
    </div>
  );
}