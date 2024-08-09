import { useUser } from "app/UserContext";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => {
  return res.json()
});

const Header = () => {

  const { userData } = useUser();

  const { data, error } = useSWR(userData ? `/api/user/${userData.id}` : null, fetcher);

    return (
        <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-16 max-w-xl bg-header-footer-gradient flex justify-around items-center z-50 text-xs">
            <div className="text-lg font-bold">Goat</div>

            <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <Image
                src="/images/dollar.png"
                alt="Exchange"
                className="w-8 h-8"
                width={8}
                height={8}
              />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">보유 금액</p>
                <div className="flex items-center justify-center space-x-1">
                  {/* <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" /> */}
                  <p className="text-sm">{data ? data.money : 0 }</p>
                  {/* <Info size={20} className="text-[#43433b]" /> */}
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Image
                    src='/images/setting.png'
                    alt="Setting"
                    className="w-8 h-8 invert filter brightness-0"
                    width={8}
                    height={8}
                  />
            </div>
        </header>
    )
}

export default Header;
