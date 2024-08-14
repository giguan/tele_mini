// components/Roulette.tsx
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './styles.css';
import { useUser } from 'app/UserContext';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface RouletteProps {
  onClose: () => void;
}

const Roulette: React.FC<RouletteProps> = ({onClose}) => {


  const { userData, updateUserData, mutate } = useUser();

  console.log("@@@@@@@@@@@@@@@@@@@@@", userData)

  // items 배열의 타입 정의
  const items: Item[] = [
    { id: 1, name: '1,000', weight: 3, value: 1000 },
    { id: 2, name: '1,000', weight: 3, value: 1000 },
    { id: 3, name: '2,000', weight: 2.5, value: 2000 },
    { id: 4, name: '1,000', weight: 3, value: 1000 },
    { id: 5, name: '10,000', weight: 1, value: 10000 }, //o
    { id: 6, name: '5,000', weight: 1.5, value: 5000 }, //o
    { id: 7, name: '3,000', weight: 2, value: 3000 }, 
    { id: 8, name: '2,000', weight: 2.5, value: 2000 }, //o
  ];

  // 상태 변수들의 타입 정의
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showWinningScreen, setShowWinningScreen] = useState<boolean>(false);


  const spinRoulette = async (): Promise<void> => {

    if (spinning || !userData) return;

    setSpinning(true);
    setShowWinningScreen(false);

    // 항목을 무작위로 선택
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    const selected = items.find((item) => {
      cumulativeWeight += item.weight;
      return randomNum < cumulativeWeight;
    });

    if (selected) {
      setSelectedItem(selected.name);
      const previousMoney = userData.money;
      const newMoney = previousMoney + selected.value;

      const itemIndex = items.indexOf(selected);
      const itemDegree = 360 / items.length;
      const spinTo = 360 * 5 + itemIndex * itemDegree;

      setRotation(spinTo);

      // 옵티미스틱 UI: 먼저 UI에 반영
      setTimeout(async () => {
        mutate({ ...userData, money: newMoney }, false);

        try {
          const response = await axios.post('/api/user/updateMoney', {
            id: userData.id,
            newMoney,
          });
  
          mutate()
  
        } catch (error) {
          console.error(error);
  
          // 오류가 발생하면 원래 상태로 복구
          mutate(userData, false);
        }
  

        setSpinning(false);
        setShowWinningScreen(true);


      }, 4000)
      
    }
  };

  return (
    <div className="roulette-container w-full h-full">
      {/* 룰렛판 이미지 */}
      <div
        className={`roulette-wheel ${spinning ? 'spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image
          src="/images/roullet.png"
          alt="Roulette Wheel"
          className="wheel-image"
          width={384}
          height={384}
        />
      </div>

      {/* 중앙 버튼 */}
      <div className="center-button w-full h-full z-200 ">
        <button
          onClick={spinRoulette}
          className="spin-button"
        >
          <Image src="/images/center.png" alt="Center Button" width={400} height={400} />
        </button>
      </div>

      {/* 핀 이미지 */}
      <div className="pin">
        <Image src="/images/pin.png" alt="Pin" width={200} height={200} />
      </div>

      {/* 당첨 화면 */}
      {showWinningScreen && (
        <>
        <div className="winning-screen w-full h-full">
          <button onClick={onClose} 
            className="absolute bottom-0 left-1/2 w-full transform -translate-x-1/2 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300 ease-in-out cursor-pointer">닫기</button>

          <div className="winning-message">
            NICE!
            <div className="winning-amount">{selectedItem}</div>
          </div>

          {/* 코인 이미지가 아래에서 위로 다이나믹하게 올라오는 효과 */}
          {[...Array(50)].map((_, index) => {

          const startX = Math.random() * 200 - 100;  // 좌우로 퍼지는 효과
          const startY = Math.random() * 100 + 200;  // 아래에서 위로 퍼지는 효과 (시작 위치 조정)

            const direction = Math.random() > 0.5 ? 1 : -1;
            const rotateDegree = Math.random() * 360;  // 랜덤 회전
            const translateX = Math.random() * 100 * direction;  // 랜덤 좌우 이동
            const scaleValue = Math.random() * 0.5 + 0.75;  // 랜덤 크기 조정

            return (
              <Image
                key={index}
                src={`/images/money/coin${(index % 16) + 1}.png`}  // 16개의 코인을 반복적으로 사용
                alt="Coin"
                className="money"
                style={{ 
                  animationDelay: `${index * 0.05}s`,  // 더 빠르게 순차적으로 나오도록 설정
                  transform: `rotate(${rotateDegree}deg) translateX(${translateX}px) scale(${scaleValue})`,
                  '--start-x': `${startX}vw`,  // 시작 X 위치
                  '--start-y': `${startY}vh`,  // 시작 Y 위치
                } as React.CSSProperties} 
                width={50}
                height={50}
              />
            );
          })}
        </div>
      </>
      )}

    </div>

  );
};

export default Roulette;
