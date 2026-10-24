import svgPaths from "./svg-4e1o877p4k";
import imgTransaction from "figma:asset/614f2f95d6ec3d77a646dd773eba1dd683746f73.png";
import imgActivityFeed from "figma:asset/39b1ed003f3fb7e99992e162aaf65c5ad238ea2a.png";
import imgAccount from "figma:asset/08867ec4769698d7c6fc2ba9fe2c3afa43896bf7.png";
import imgHomePage from "figma:asset/916eafc1fb9ec2347e54a0986c1b99d99d2524c9.png";
import imgCategory from "figma:asset/56c692fb2c603ed6c6d65123d6eb9cb674be553e.png";
import imgCalendar from "figma:asset/9db1a2d36cd8ce2b39e4630258e8790cd06179af.png";
import imgBangladesh from "figma:asset/716c28645a28ea59c1da1ffb3f1274a6aa9f7188.png";

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

function Group3() {
  return (
    <div className="absolute contents left-[31px] top-[742px]">
      <div className="absolute bg-[#e6484e] h-[53px] left-[31px] rounded-[10px] top-[742px] w-[367px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[10.944px] leading-[normal] left-[334px] not-italic text-[12px] text-white top-[762px] w-[143.22px] whitespace-pre-wrap">Amount</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[44px] not-italic text-[20px] text-white top-[757px]">-500 BDT</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[18px] top-[146px]">
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[675px] left-[18px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[146px] w-[394px]" />
      <div className="absolute bg-[#e6484e] h-[41px] left-[30px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[166px] w-[172px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[115px] not-italic text-[15px] text-center text-white top-[178px] w-[92px] whitespace-pre-wrap">{`Income `}</p>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[41px] left-[225px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[166px] w-[172px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[277px] not-italic text-[15px] text-black top-[178px] w-[63px] whitespace-pre-wrap">Expense</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[10.944px] leading-[normal] left-[333px] not-italic text-[12px] text-white top-[440px] w-[143.22px] whitespace-pre-wrap">Amount</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[43px] not-italic text-[20px] text-white top-[435px]">-500 BDT</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[33px] not-italic text-[20px] text-black top-[712px]">{`Total `}</p>
      <Group3 />
      <div className="absolute bg-[#ffdd36] h-[35px] left-[303px] rounded-[10px] top-[445px] w-[94px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium h-[20px] leading-[normal] left-[350px] not-italic text-[14px] text-black text-center top-[453px] w-[72px] whitespace-pre-wrap">Proceed</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[-1px] top-[849px]">
      <div className="-translate-x-1/2 absolute bg-[#ffdd36] h-[101px] left-[calc(50%-1px)] rounded-[20px] top-[849px] w-[430px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[156.5px] not-italic text-[13px] text-black text-center top-[894px] tracking-[-0.32px]">Transaction</p>
      <div className="absolute left-[142px] size-[30px] top-[864px]" data-name="Transaction">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgTransaction} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[268px] not-italic text-[13px] text-center text-white top-[894px] tracking-[-0.32px]">{`Activity `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[374.5px] not-italic text-[13px] text-center text-white top-[894px] tracking-[-0.32px]">{`Account `}</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[47.5px] not-italic text-[13px] text-center text-white top-[894px] tracking-[-0.32px]">{`Home `}</p>
      <div className="absolute left-[253px] size-[30px] top-[864px]" data-name="Activity Feed">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgActivityFeed} />
      </div>
      <div className="absolute left-[360px] size-[30px] top-[864px]" data-name="Account">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgAccount} />
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[30px] top-[239px]">
      <div className="absolute bg-[rgba(255,221,54,0.1)] border border-[#ffdd36] border-solid h-[53px] left-[30px] rounded-[10px] top-[239px] w-[367px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[74px] not-italic text-[14px] text-black top-[257px]">Choose Category</p>
      <div className="absolute left-[41px] size-[25px] top-[253px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <div className="absolute bg-[rgba(255,221,54,0.1)] border border-[#ffdd36] border-solid h-[53px] left-[30px] rounded-[10px] top-[305px] w-[367px]" />
      <div className="absolute bg-[rgba(255,221,54,0.1)] border border-[#ffdd36] border-solid h-[53px] left-[30px] rounded-[10px] top-[371px] w-[367px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[74px] not-italic text-[14px] text-black top-[389px]">Amount</p>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[74px] not-italic text-[14px] text-black top-[323px]">Select Date</p>
      <div className="absolute left-[42px] size-[25px] top-[319px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
      <div className="absolute left-[41px] size-[25px] top-[385px]" data-name="Bangladesh">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBangladesh} />
      </div>
    </div>
  );
}

export default function AddTransaction() {
  return (
    <div className="bg-white relative size-full" data-name="Add Transaction">
      <Group />
      <Group1 />
      <Group2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[215.5px] not-italic text-[#e6484e] text-[32px] text-center top-[77px]">Add Transaction</p>
      <div className="absolute left-[33px] size-[30px] top-[867px]" data-name="Home Page">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHomePage} />
      </div>
      <div className="absolute left-[43px] size-[25px] top-[166px]" data-name="Calendar 31" />
      <Group4 />
    </div>
  );
}