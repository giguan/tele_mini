"use client"
import axios from 'axios';

// 공급자 검색
// 슬릇은 솔루션이 없으면 금액에 대한 배팅 결과를 가져올 수 없을것 같은데?
const SLOT_PROVIDER = {
    PRAGMENTPLAY: {
        short_name: "ppg"
    },
    EVOLUTION: {
        short_name: "EVL"
    },
    NOLIMITCITY: {
        short_name: "NCE"
    },
    HACKSAW: {
        short_name: "HKS"
    }
};

const Casino = () => {
    return (
        <>
            <select>
                <option></option>
            </select>
        </>
    )
}

export default Casino;