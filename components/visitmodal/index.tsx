import React, { useEffect, useState } from 'react';
import Roulette from '../roulette';
import './styles.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (prize: string) => void;
}

const VisitModal: React.FC<ModalProps> = ({ isOpen, onClose, onClaim }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // 트랜지션이 시작될 수 있도록 약간의 지연을 추가
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 500); // 애니메이션 시간이 지나면 완전히 숨김
    }
  }, [isOpen]);

  // const handleSpinEnd = (prize: string) => {
  //   onClaim(prize);
  // };
    
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`p-4 bg-black bg-opacity-70 rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all duration-500 ${
          isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 -translate-y-10'
        }`}
      >
        <h2 className="text-2xl font-extrabold text-yellow-300 mb-4 animate-pulse">
          🎉 환영합니다! 🎉
        </h2>
        <p className="text-base text-center text-white mb-4 animate-fadeIn">
          처음 방문해주셔서 감사합니다! <br /> 무료로 룰렛을 돌려보세요.
        </p>
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-xs">
            <Roulette onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitModal;
