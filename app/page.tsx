"use client"

import Image from "next/image";
import DefaultLayout from './casino/layout';

export default function Home() {

  return (
    <DefaultLayout>
      <div className="p-4">
        {/* 메인 이미지 섹션 */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
          <Image
            src="/images/cover2.jpg" // 주신 이미지로 대체하세요
            alt="Main Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-xl font-bold">최대 10 ETH까지 200% 레이크백 보너스!</h2>
            <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">지금 배팅</button>
          </div>
        </div>

        {/* 가로 스크롤 가능한 메뉴 */}
        <div className="mb-4">
          <h3 className="text-white text-lg font-bold mb-2">거래 가능 암호 화폐</h3>
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="inline-block p-2">
              <Image src="/images/coins/bitcoin.png" alt="Bitcoin" width={40} height={40} />
            </div>
            <div className="inline-block p-2">
              <Image src="/images/coins/ethereum.png" alt="Ethereum" width={40} height={40} />
            </div>
            <div className="inline-block p-2">
              <Image src="/images/coins/ltc.png" alt="Tether" width={40} height={40} />
            </div>
            <div className="inline-block p-2">
              <Image src="/images/coins/ton.png" alt="Dogecoin" width={40} height={40} />
            </div>
            <div className="inline-block p-2">
              <Image src="/images/coins/usdt.png" alt="Litecoin" width={40} height={40} />
            </div>
          </div>
        </div>

        {/* 최근에 플레이 한 게임 섹션 */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">최근에 플레이 한</h3>
          <div className="overflow-x-auto whitespace-nowrap">
            
            <div className="inline-block w-40 h-50 mr-2">
              <Image
                src="/images/slots/book-of-dead.jpg"
                alt="Slot Game 1"
                width={160}
                height={160}
                className="rounded-lg"
              />
              {/* <p className="text-center text-white mt-2">게임 1</p> */}
            </div>
            
            <div className="inline-block w-40 h-50 mr-2">
              <Image
                src="/images/slots/dead-or-a-wild.jpg"
                alt="Slot Game 1"
                width={160}
                height={160}
                className="rounded-lg"
              />
              {/* <p className="text-center text-white mt-2">게임 2</p> */}
            </div>
            
            <div className="inline-block w-40 h-50 mr-2">
              <Image
                src="/images/slots/gates-of-olympus.jpg"
                alt="Slot Game 1"
                width={160}
                height={160}
                className="rounded-lg"
              />
              {/* <p className="text-center text-white mt-2">게임 3</p> */}
            </div>
            
            <div className="inline-block w-40 h-50 mr-2">
              <Image
                src="/images/slots/sugar-rush.jpg"
                alt="Slot Game 1"
                width={160}
                height={160}
                className="rounded-lg"
              />
              {/* <p className="text-center text-white mt-2">게임 3</p> */}
            </div>
            
            <div className="inline-block w-40 h-50 mr-2">
              <Image
                src="/images/slots/zeus-vs-hades.jpg"
                alt="Slot Game 1"
                width={160}
                height={160}
                className="rounded-lg"
              />
              {/* <p className="text-center text-white mt-2">게임 3</p> */}
            </div>

          </div>
        </div>

        {/* 최근에 플레이 한 게임 섹션 */}
        <div> {/* 여백 추가 */}
        <h3 className="text-white text-lg font-bold mb-2">게임 제공사</h3>
        <div className="overflow-x-auto flex space-x-4">
          <div className="flex-shrink-0 w-40 h-40 bg-[#5B1BB8] rounded-lg flex items-center justify-center">
            <Image
              src="/images/game-provider/pragmaticplay.png"
              alt="Pragmatic Play"
              className="object-contain p-2 rounded-lg"
              width={160}
              height={160}
            />
          </div>
          <div className="flex-shrink-0 w-40 h-40 bg-[#5B1BB8] rounded-lg flex items-center justify-center">
            <Image
              src="/images/game-provider/evolution.png"
              alt="Evolution"
              className="object-contain p-2 rounded-lg"
              width={160}
              height={160}
            />
          </div>
          <div className="flex-shrink-0 w-40 h-40 bg-[#5B1BB8] rounded-lg flex items-center justify-center">
            <Image
              src="/images/game-provider/hacksaw.png"
              alt="Hacksaw"
              className="object-contain p-2 rounded-lg"
              width={160}
              height={160}
            />
          </div>
          <div className="flex-shrink-0 w-40 h-40 bg-[#5B1BB8] rounded-lg flex items-center justify-center">
            <Image
              src="/images/game-provider/nolimit.png"
              alt="No Limit"
              className="object-contain p-2 rounded-lg"
              width={160}
              height={160}
            />
          </div>
          {/* 추가된 게임 제공사 이미지들 */}
        </div>
      </div>

      </div>
    </DefaultLayout>
  );
};