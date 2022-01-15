
// 
import checkicon from "../../.../../../../assets/images/checkimggreen.svg";
import crossicon from "../../.../../../../assets/images/crossiconimg.svg";


const CurrentPakagesTableLoop_Array = [
    {
        key: "0",
        tdtext: "Price",
        dataline_1: "$0",
        dataline_2: "$50",
        dataline_3: "$100",
        dataline_4: "$500",
        dataline_5: "$0",
        dataline_6: "$50",
        dataline_7: "$100",
        dataline_8: "$500",
        fontsize: "fontsize40",
    },
    {
        key: "1",
        tdtext: "Employees",
        dataline_1: "20 Members",
        dataline_2: "50 Members",
        dataline_3: "100 Members",
        dataline_4: "500 Members",
        dataline_5: "20 Members",
        dataline_6: "50 Members",
        dataline_7: "100 Members",
        dataline_8: "500 Members",
        // fontsize: "fontsize40",
    },
    {
        key: "2",
        tdtext: "Max Storage",
        dataline_1: "Unlimited",
        dataline_2: "Unlimited",
        dataline_3: "Unlimited",
        dataline_4: "Unlimited",
        dataline_5: "Unlimited",
        dataline_6: "Unlimited",
        dataline_7: "Unlimited",
        dataline_8: "Unlimited",
        // fontsize: "fontsize40",
    },
    {
        key: "3",
        tdtext: "Clients",
        dataline_1: <img alt="" src={checkicon} />,
        dataline_2: <img alt="" src={checkicon} />,
        dataline_3: <img alt="" src={checkicon} />,
        dataline_4: <img alt="" width="12" src={crossicon} />,
        dataline_5: <img alt="" src={checkicon} />,
        dataline_6: <img alt="" src={checkicon} />,
        dataline_7: <img alt="" width="12" src={crossicon} />,
        dataline_8: <img alt="" src={checkicon} />,
        // fontsize: "fontsize40",
    },
]
export default CurrentPakagesTableLoop_Array;