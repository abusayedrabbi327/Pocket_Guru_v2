import svgPaths from "./svg-rcbjf98qvm";
import imgCalendar from "figma:asset/9db1a2d36cd8ce2b39e4630258e8790cd06179af.png";
import imgCategory from "figma:asset/56c692fb2c603ed6c6d65123d6eb9cb674be553e.png";
import imgTransaction from "figma:asset/614f2f95d6ec3d77a646dd773eba1dd683746f73.png";
import imgActivityFeed from "figma:asset/39b1ed003f3fb7e99992e162aaf65c5ad238ea2a.png";
import imgAccount from "figma:asset/08867ec4769698d7c6fc2ba9fe2c3afa43896bf7.png";
import imgHomePage from "figma:asset/916eafc1fb9ec2347e54a0986c1b99d99d2524c9.png";
import imgCalendar31 from "figma:asset/a2363b74e50ae53beb2ca5d80b218dd0e5fddd9c.png";

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
    <div className="absolute contents left-[359px] top-[159px]">
      <div className="absolute bg-[#ffdd36] h-[40px] left-[359px] rounded-[10px] top-[159px] w-[39px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[29px] leading-[normal] left-[378.5px] not-italic text-[20px] text-black text-center top-[165px] w-[39px] whitespace-pre-wrap">+</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[33px] top-[743px]">
      <div className="absolute bg-[#e6484e] h-[53px] left-[33px] rounded-[10px] top-[743px] w-[367px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[10.944px] leading-[normal] left-[336px] not-italic text-[12px] text-white top-[763px] w-[143.22px] whitespace-pre-wrap">Amount</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[46px] not-italic text-[20px] text-white top-[758px]">-500 BDT</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[32px] top-[287px]">
      <div className="absolute bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.5)] border-solid h-[48px] left-[32px] rounded-[10px] top-[287px] w-[367px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[71px] not-italic text-[14px] text-black top-[302px] w-[51px] whitespace-pre-wrap">03 May</p>
      <div className="absolute left-[44px] opacity-70 size-[24px] top-[299px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[139px] top-[299px]">
      <div className="absolute left-[139px] opacity-70 size-[24px] top-[299px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[168px] not-italic text-[14px] text-black top-[302px] w-[73px] whitespace-pre-wrap">Salary</p>
    </div>
  );
}

function Copy() {
  return (
    <div className="absolute contents left-[32px] top-[287px]" data-name="Copy">
      <Group7 />
      <Group8 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[280px] not-italic text-[#4caf50] text-[20px] top-[299px]">10000 BDT</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[44px] top-[359px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[71px] not-italic text-[14px] text-black top-[362px] w-[51px] whitespace-pre-wrap">08 May</p>
      <div className="absolute left-[44px] opacity-70 size-[24px] top-[359px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[139px] top-[359px]">
      <div className="absolute left-[139px] opacity-70 size-[24px] top-[359px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[168px] not-italic text-[14px] text-black top-[362px] w-[73px] whitespace-pre-wrap">Consult</p>
    </div>
  );
}

function Copy1() {
  return (
    <div className="absolute contents left-[32px] top-[347px]" data-name="Copy">
      <div className="absolute bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.5)] border-solid h-[48px] left-[32px] rounded-[10px] top-[347px] w-[367px]" />
      <Group9 />
      <Group10 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[290px] not-italic text-[#4caf50] text-[20px] top-[359px]">5000 BDT</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[31px] top-[159px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[35px] not-italic text-[20px] text-black top-[713px]">{`Total `}</p>
      <div className="absolute bg-[#ffdd36] h-[40px] left-[31px] rounded-[10px] top-[159px] w-[319px]" />
      <Group3 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[76px] not-italic text-[15px] text-black top-[170px]">May</p>
      <Group4 />
      <Copy />
      <Copy1 />
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

function Group11() {
  return (
    <div className="absolute contents left-[43px] top-[556px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[70px] not-italic text-[14px] text-black top-[559px] w-[51px] whitespace-pre-wrap">09 Aug</p>
      <div className="absolute left-[43px] opacity-70 size-[24px] top-[556px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[138px] top-[556px]">
      <div className="absolute left-[138px] opacity-70 size-[24px] top-[556px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[167px] not-italic text-[14px] text-black top-[559px] w-[51px] whitespace-pre-wrap">Food</p>
    </div>
  );
}

function Copy2() {
  return (
    <div className="absolute contents left-[31px] top-[544px]" data-name="Copy">
      <Group11 />
      <Group12 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[303px] not-italic text-[#e6484e] text-[20px] top-[556px]">500 BDT</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[rgba(230,72,78,0.5)] border-solid h-[48px] left-[31px] rounded-[10px] top-[544px] w-[367px]" />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents left-[43px] top-[493px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[70px] not-italic text-[14px] text-black top-[496px] w-[51px] whitespace-pre-wrap">05 May</p>
      <div className="absolute left-[43px] opacity-70 size-[24px] top-[493px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[138px] top-[493px]">
      <div className="absolute left-[138px] opacity-70 size-[24px] top-[493px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[167px] not-italic text-[14px] text-black top-[496px] w-[73px] whitespace-pre-wrap">Well-being</p>
    </div>
  );
}

function Copy3() {
  return (
    <div className="absolute contents left-[31px] top-[481px]" data-name="Copy">
      <Group13 />
      <Group14 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[303px] not-italic text-[#e6484e] text-[20px] top-[493px]">500 BDT</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[rgba(230,72,78,0.5)] border-solid h-[48px] left-[31px] rounded-[10px] top-[481px] w-[367px]" />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-[43px] top-[619px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[70px] not-italic text-[14px] text-black top-[622px] w-[51px] whitespace-pre-wrap">01 Jan</p>
      <div className="absolute left-[43px] opacity-70 size-[24px] top-[619px]" data-name="Calendar">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar} />
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[138px] top-[619px]">
      <div className="absolute left-[138px] opacity-70 size-[24px] top-[619px]" data-name="Category">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCategory} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[167px] not-italic text-[14px] text-black top-[622px] w-[98px] whitespace-pre-wrap">Transportation</p>
    </div>
  );
}

function Copy4() {
  return (
    <div className="absolute contents left-[31px] top-[607px]" data-name="Copy">
      <Group15 />
      <Group16 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[303px] not-italic text-[#e6484e] text-[20px] top-[619px]">500 BDT</p>
      <div className="absolute bg-[rgba(230,72,78,0.1)] border border-[rgba(230,72,78,0.5)] border-solid h-[48px] left-[31px] rounded-[10px] top-[607px] w-[367px]" />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[31px] top-[420px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[158px] not-italic text-[20px] text-black top-[420px]">{`• Expense • `}</p>
      <Copy2 />
      <Copy3 />
      <Copy4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[164px] top-[230px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[164px] not-italic text-[20px] text-black top-[230px]">{`• Income • `}</p>
    </div>
  );
}

export default function Transaction() {
  return (
    <div className="bg-white relative size-full" data-name="Transaction">
      <Group />
      <Group1 />
      <Group2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[215px] not-italic text-[#e6484e] text-[32px] text-center top-[77px]">Transaction</p>
      <div className="absolute left-[33px] size-[30px] top-[867px]" data-name="Home Page">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgHomePage} />
      </div>
      <Group6 />
      <Group5 />
      <div className="absolute left-[43px] size-[25px] top-[166px]" data-name="Calendar 31">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCalendar31} />
      </div>
    </div>
  );
}