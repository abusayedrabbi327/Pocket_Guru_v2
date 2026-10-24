import svgPaths from "./svg-cl7ox5jptw";
import imgPocketGuruLogo1 from "figma:asset/382f08e6232698109d7b6a37d63a98d9a4e0e79e.png";
import imgEllipse2 from "figma:asset/a9327c06319d3f0c1e7452a8bd227a52834aa662.png";
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
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[19px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[198px]" />
      <p className="[text-decoration-skip-ink:none] absolute decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[32px] not-italic text-[10px] text-black top-[287px] underline">2 Transactions</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_Bengali:Regular',sans-serif] font-normal h-[36px] leading-[normal] left-[32px] not-italic text-[24px] text-black top-[254px] w-[165px] whitespace-pre-wrap">৳10000 BDT</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[32px] not-italic text-[15px] text-black top-[233px]">Bank</p>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[228px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[93px]" />
      <p className="[text-decoration-skip-ink:none] absolute decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[236px] not-italic text-[10px] text-black top-[287px] underline">10 Transactions</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_Bengali:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[236px] not-italic text-[12px] text-black top-[260px] w-[79px] whitespace-pre-wrap">৳2000 BDT</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[236px] not-italic text-[15px] text-black top-[233px]">bKash</p>
      <div className="absolute bg-[rgba(30,30,30,0.02)] h-[87px] left-[333px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(230,72,78,0.25)] top-[222px] w-[80px]" />
      <div className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[374.5px] not-italic text-[10px] text-black text-center top-[263px] whitespace-nowrap">
        <p className="mb-0">{`ADD `}</p>
        <p>ACCOUNT</p>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[374.5px] not-italic text-[10px] text-black text-center top-[250px]">+</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[19px] top-[519px]">
      <div className="absolute bg-[#e6484e] h-[72.642px] left-[19px] rounded-[10px] top-[519px] w-[123px]" />
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15.029px] leading-[normal] left-[28px] not-italic text-[20px] text-white top-[548.22px] w-[105px] whitespace-pre-wrap">
        <p className="mb-0">7000 BDT</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[154px] top-[519px]">
      <div className="absolute bg-[#e6484e] h-[72.642px] left-[154px] rounded-[10px] top-[519px] w-[123px]" />
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15.029px] leading-[normal] left-[163px] not-italic text-[20px] text-white top-[548.22px] w-[105px] whitespace-pre-wrap">
        <p className="mb-0">2000 BDT</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[163px] not-italic text-[12px] text-white top-[536px]">Others:</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[290px] top-[519px]">
      <div className="absolute bg-[#e6484e] h-[72.642px] left-[290px] rounded-[10px] top-[519px] w-[123px]" />
      <div className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15.029px] leading-[normal] left-[299px] not-italic text-[20px] text-white top-[548.22px] w-[105px] whitespace-pre-wrap">
        <p className="mb-0">1000 BDT</p>
        <p>&nbsp;</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[299px] not-italic text-[12px] text-white top-[536px]">{`Savings: `}</p>
    </div>
  );
}

function Group3() {
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="h-0 relative shrink-0 w-[12px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 1">
            <path d="M0 0.5H12" id="Vector 12" stroke="var(--stroke-0, #21CBE2)" />
          </svg>
        </div>
      </div>
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Ipsum
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[11px] text-black text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Expense graph
      </p>
      <Frame1 />
    </div>
  );
}

function YAxisItems() {
  return (
    <div className="content-stretch flex flex-col h-full items-end justify-between pb-[10px] relative shrink-0" data-name="Y Axis Items">
      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          5000
        </p>
        <div className="flex h-0 items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[12px] relative w-0">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 12">
                  <path d="M0.5 0V12" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          4000
        </p>
        <div className="flex h-0 items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[12px] relative w-0">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 12">
                  <path d="M0.5 0V12" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          3000
        </p>
        <div className="flex h-0 items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[12px] relative w-0">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 12">
                  <path d="M0.5 0V12" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          2000
        </p>
        <div className="flex h-0 items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[12px] relative w-0">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 12">
                  <path d="M0.5 0V12" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          1000
        </p>
        <div className="flex h-0 items-center justify-center relative shrink-0 w-[12px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[12px] relative w-0">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 12">
                  <path d="M0.5 0V12" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftSideYAxis() {
  return (
    <div className="content-stretch flex h-full items-center justify-end pb-[28px] relative shrink-0" data-name="Left Side (Y Axis)">
      <YAxisItems />
      <div className="h-full relative shrink-0 w-0" data-name="Y Axis Line">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 135">
            <path d="M0.5 0V135" id="Y Axis Line" stroke="var(--stroke-0, #FFDD36)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LineGraph() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Line Graph">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 241 135">
        <g id="Line Graph">
          <path d={svgPaths.p1fc10d80} id="Vector 11" stroke="var(--stroke-0, #E6484E)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function XAxisItems() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="X Axis Items">
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Mon
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Tue
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Wed
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Thu
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Fri
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Sat
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0" data-name="AxisItem">
        <div className="h-[10px] relative shrink-0 w-0">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 10">
              <path d="M0.5 0V10" id="Vector 8" stroke="var(--stroke-0, #FFDD36)" />
            </svg>
          </div>
        </div>
        <p className="font-['Roboto:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#949494] text-[11px] text-center tracking-[1px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Sun
        </p>
      </div>
    </div>
  );
}

function XAxis() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="X Axis">
      <div className="h-0 relative shrink-0 w-full" data-name="X Axis Line">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 241 1">
            <path d="M0 0.5H241" id="X Axis Line" stroke="var(--stroke-0, #FFDD36)" />
          </svg>
        </div>
      </div>
      <XAxisItems />
    </div>
  );
}

function RightSideGraphAndXAxis() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-end min-h-px min-w-px relative" data-name="Right Side (Graph and X Axis)">
      <LineGraph />
      <XAxis />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[40px] h-[256px] items-start left-[29px] px-[40px] py-[20px] rounded-[8px] top-[596px] w-[364px]">
      <Frame2 />
      <div className="content-stretch flex flex-[1_0_0] items-end min-h-px min-w-px relative w-full" data-name="Graph">
        <LeftSideYAxis />
        <RightSideGraphAndXAxis />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white relative size-full" data-name="Home">
      <Group />
      <div className="absolute h-[63px] left-[124px] top-[72px] w-[183px]" data-name="PocketGuru Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPocketGuruLogo1} />
      </div>
      <div className="absolute bg-[#ffdd36] h-[47px] left-[19px] rounded-[10px] top-[148px] w-[394px]" />
      <Group1 />
      <Group2 />
      <Group4 />
      <Group5 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[28px] not-italic text-[12px] text-white top-[536px]">Expense:</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[15px] text-black top-[489px]">Budget</p>
      <div className="absolute left-[112px] size-[66px] top-[352px]">
        <img alt="" className="absolute block max-w-none size-full" height="66" src={imgEllipse2} width="66" />
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[calc(50%+57.5px)] not-italic text-[48px] text-black text-center top-[382px] tracking-[-0.32px]">75%</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[271px] not-italic text-[13px] text-black text-center top-[341px] tracking-[-0.32px]">Saving Goals</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[16px] not-italic text-[12px] text-black top-[451px] tracking-[-0.32px] w-[397px] whitespace-pre-wrap">{`Tips: Connect with more retailers to get a much powered way to forward `}</p>
      <div className="absolute flex items-center justify-center left-[96px] size-[98px] top-[336px]" style={{ "--transform-inner-width": "1184.796875", "--transform-inner-height": "154" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[98px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
              <path d={svgPaths.p30cfb680} fill="var(--fill-0, #E6484E)" id="Ellipse 1" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[67px] not-italic text-[15px] text-black top-[162px]">Add Income Transaction for the next month</p>
      <Group3 />
      <Frame />
      <div className="absolute left-[26px] size-[30px] top-[156px]" data-name="Last 24 Hours">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgLast24Hours} />
      </div>
    </div>
  );
}