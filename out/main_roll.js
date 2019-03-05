var contractAddr = "0x5137814e854fa10ee6d8ac3ad836d345db6ed44e";
// const contractAddr = "0x813f22b365a8d487225c642ba370e39eb95c9860";//t 
// const serverURL = "http://54.205.230.215:6769/";
// const providerURL = "http://etzrpc.org:80";
var serverURL = "http://54.205.230.215:6769/";
var providerURL = "http://54.205.230.215:9646";
// const serverURL = "http://192.168.199.214:6769/";//t 
// const providerURL = "http://192.168.199.214:9646";//t 
var MUNITE_3 = 3 * 60 * 1000;
var targetNetwork = "90";
var platform = platform();
var etz_web3;
var etzWeb3;
var gameIndex = 3;
var modulo = 100; //总共多少种可能
//每个选项有几种组合可能
var betTargets = [1, 2, 3, 4, 5, 6]; //押注目标，可以押注多个目标
var optionChance = [1, 1, 1, 1, 1, 1]; //每个押注目标的组合数
var MIN_JACKPOT_BET = 100;
var JACKPOT_FEE = 1;
var JACKPOT_MODULO = 1000;
var MAX_MASK_MODULO = 40;
var MAX_AMOUNT = 2000; //最大下注额diceMax的上限
var winRate = 0.5; //赢的概率
var fee = 0; //手续费
var jackpotFee = 0; //大奖筹费
var feeRate = 0.02; //手续费费率
var standZoomRate = 1; //标准倍率
var realZoomRate = 1; //实际倍率
var winAmount = 0; //将赢得金额
var diceMax = 5.10; //最大下注额
var minAddAmount = 1;
var minAmount = 10;
var selectedBetNum = 0; //选择下注目标数量
var maskBinStr100 = "";
var betMask = 0; //押注对象组成的掩码，过山车的betMask直接为100内的押注比例
var amount = 18; //押注金额etz
var preSelectOption; //打开网页预先设置为胜利率为50%的押注组合
var lastCommit = "";
var waitSettleCommit; //正在等待开奖的押注
var onlySelf = false;
var diceName; //游戏类别名
var betTargetElem; //押注对象
var resultElem; //开奖结果
var petContractABI = [{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"addCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"reveal","type":"uint256"},{"name":"placeBlockNum","type":"uint256"}],"name":"settleBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"jackpotSize","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dealFailList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"betMask","type":"uint256"},{"name":"modulo","type":"uint256"},{"name":"commitLastBlock","type":"uint256"},{"name":"commit","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"undealBetNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dealFailNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxProfit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"withdrawAmount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptNextOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_nextOwner","type":"address"}],"name":"approveNextOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"increaseAmount","type":"uint256"}],"name":"increaseJackpot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lockedInBets","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"commit","type":"uint256"}],"name":"refundBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_maxProfit","type":"uint256"}],"name":"setMaxProfit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"commit","type":"uint256"},{"indexed":true,"name":"gambler","type":"address"},{"indexed":true,"name":"modulo","type":"uint8"},{"indexed":false,"name":"mask","type":"uint40"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"playceBlock","type":"uint256"}],"name":"OnPlaceBet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"FailedPayment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"beneficiary","type":"address"},{"indexed":false,"name":"totalAmount","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Payment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"commit","type":"uint256"},{"indexed":true,"name":"gambler","type":"address"},{"indexed":true,"name":"totalAmount","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"reveal","type":"uint256"},{"indexed":false,"name":"entropy","type":"uint256"},{"indexed":false,"name":"dice","type":"uint256"}],"name":"SettleBetPayment","type":"event"}];
var resultPanel = document.getElementById("resultPanel");
var waitSubmit = document.getElementById("waitSubmit");
var resultPanelTitle = document.getElementById("resultPanelTitle");
var betOn = document.getElementById("betOn");
var betResult = document.getElementById("betResult");
var restartBtn = document.getElementById("restartBtn");
var betNum = document.getElementById("betNum");
var winChance = document.getElementById('winChance');
var rateLabel = document.getElementById('rateLabel');
var winCoin = document.getElementById('winCoin');
var bigAwardDes = document.getElementById('bigAwardDes');
var luckyNumber = document.getElementById('luckyNumber');
var bigAwardMinDes = document.getElementById('bigAwardMinDes');
var betBtn = document.getElementById('betBtn');
var bigAwardNum = document.getElementById('bigAwardNum');
var historyItemList = document.getElementById('historyItemList');
var feeRateLabel = document.getElementById('feeRateLabel');
var selectWarning = document.getElementById('selectWarning');
var onlySelfBtn = document.getElementById('onlySelfBtn');
var zeroStr64 = "0000000000000000000000000000000000000000000000000000000000000000";
var fStr64 = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
var Wei = 1000000000000000000;
window.onload = function () {
    // var el = document.getElementById('content');
    // var greeter = new Greeter(el);
    initWeb3();
    initGame();
};
function initWeb3() {
    if (platform != "pc") //t 注释暂时关闭检测
        return;
    // if(!window.web3_etz){//用来判断你是否安装了goETZ钱包插件
    if (!window.web3_etz && !window.web3) { //用来判断你是否安装了goETZ或metamask钱包插件
        betBtn.hidden = true;
        window.alert('Please install wallet plugin first. goETZ\n请先安装goETZ插件'); //如果没有会去提示你先去安装
        //显示安装按钮
        var installImg = new Image();
        installImg.src = "./static/installMetalMask.png";
        betBtn.parentNode.appendChild(installImg);
        installImg.onclick = function () {
            //window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en","_blank");
            window.open("https://etherzero.gitbook.io/doc/yi-tai-fang-dapp-ru-he-qian-yi-dao-yi-tai-ling-shang-yun-hang", "_blank");
        };
        //    var installInterValHandle;
        //    installInterValHandle = setInterval(()=>{
        //        if(window.web3){
        //            clearInterval(installInterValHandle);
        //            betBtn.hidden = false;
        //            installImg.hidden = true;
        //            checkProvider();
        //        }
        //    }, 1000);
        return;
    }
    checkProvider();
}
function checkProvider() {
    if (platform != "pc")
        return;
    var network;
    if (window.web3_etz) {
        etzWeb3 = window.web3_etz; //new Web3(new Web3.providers.HttpProvider(providerURL));
        network = etzWeb3.version.network;
    }
    else {
        web3 = window.web3; //new Web3(new Web3.providers.HttpProvider(providerURL));
        network = web3.version.network;
    }
    console.log("network:", network);
    if (network && network != targetNetwork) {
        //显示切换网络按钮
        // var switchNetImg = new Image();
        // switchNetImg.src = "./static/switchNet.png";
        // betBtn.parentNode.appendChild(switchNetImg);
        // betBtn.hidden = true;
        if (window.web3_etz) {
            // window.web3_etz.setProvider(new Web3.providers.HttpProvider(providerURL));
            // etzWeb3 = window.web3_etz;
            etzWeb3 = new Web3(new Web3.providers.HttpProvider(providerURL));
            console.log("etzWeb3.version.network:", etzWeb3.version.network);
        }
        else {
            // window.web3.setProvider(new Web3.providers.HttpProvider(providerURL));
            // web3 = window.web3;
            web3 = new Web3(new Web3.providers.HttpProvider(providerURL));
            console.log("web3.version.network:", web3.version.network);
        }
    }
}
function getWeb3() {
    if (etzWeb3) {
        return etzWeb3;
    }
    else {
        return web3;
    }
}
function getCoinBase() {
    if (platform == "pc")
        return getWeb3().eth.coinbase;
    else
        return window.easyetz.getAddress();
}
// function onSelectOption(i){
//     var elem = document.getElementById("option"+i);
//     if(elem.dataset['checked']=="true"){
//         if(selectedBetNum-optionChance[i]<=1){
//             return;
//         }
//         elem.dataset['checked'] = "false";
//         onChangeBetTarget(i, "0");
//     }else{
//         if(selectedBetNum+optionChance[i]==modulo){
//             return;
//         }
//         elem.dataset['checked'] = "true";
//         onChangeBetTarget(i, "1");
//     }
// }
function initSlider() {
    var sliderBack0 = document.getElementById('sliderBack0');
    var sliderBar = document.getElementById('sliderBar');
    var sliderCont = document.getElementById('sliderCont');
    var minPercent = 1; //1%
    var maxPercent = 97; //97%
    var sliderLength = sliderCont.clientWidth; //sliderCont.getBoundingClientRect().width;
    var sliderStartPos;
    var mouseStartPos;
    var sliderContOffsetX = document.body.scrollLeft + sliderCont.getBoundingClientRect().left;
    var sliderOffsetX = Number(sliderCont.style.left.replace("px", ""));
    var minPos = sliderOffsetX + (minPercent / 100) * sliderLength;
    var maxPos = sliderOffsetX + (maxPercent / 100) * sliderLength;
    //移动到指定位置
    var moveSliderTo = function (targetPos) {
        if (targetPos < minPos)
            targetPos = minPos;
        if (targetPos > maxPos)
            targetPos = maxPos;
        sliderBar.style.left = targetPos + "px";
        sliderBack0.style.width = targetPos + "px";
        betMask = Math.ceil((targetPos / sliderLength) * 100);
        if (betMask > maxPercent) //High modulo range, betMask larger than modulo.
            betMask = maxPercent;
        onChangeBetTarget(betMask);
    };
    sliderCont.onclick = function (e) {
        sliderLength = sliderCont.offsetWidth;
        sliderOffsetX = Number(sliderCont.style.left.replace("px", ""));
        minPos = sliderOffsetX + (minPercent / 100) * sliderLength;
        maxPos = sliderOffsetX + (maxPercent / 100) * sliderLength;
        moveSliderTo(e.clientX - sliderContOffsetX /* - sliderBar.clientWidth/2*/);
    };
    var sliderTouchMove = function (evt) {
        var addPos = evt.changedTouches[0].screenX - mouseStartPos;
        moveSliderTo(sliderStartPos + addPos);
    };
    sliderBar.ontouchstart = function (touchEvent) {
        sliderStartPos = Number(sliderBar.style.left.replace("px", ""));
        mouseStartPos = touchEvent.changedTouches[0].screenX;
        sliderBar.addEventListener("touchmove", sliderTouchMove);
    };
    sliderBar.ontouchend = function (e) {
        sliderBar.removeEventListener("touchmove", sliderTouchMove);
    };
    var sliderMove = function (evt) {
        var addPos = evt.clientX - mouseStartPos;
        moveSliderTo(sliderStartPos + addPos);
    };
    sliderBar.onmousedown = function (elem) {
        sliderStartPos = Number(sliderBar.style.left.replace("px", ""));
        mouseStartPos = elem.clientX;
        document.addEventListener("mousemove", sliderMove);
    };
    document.onmouseup = function (e) {
        document.removeEventListener("mousemove", sliderMove);
    };
    //随机初始押注比例
    var initDiceNum = 35 + Math.ceil(30 * Math.random());
    var randPos = minPos + (initDiceNum / 100) * sliderLength;
    // console.log("initDiceNum:",initDiceNum);
    moveSliderTo(randPos);
}
function initGame() {
    initSlider();
    //初始化40个二进制字符串
    for (var z = 0; z < 40; z++) {
        maskBinStr100 += "0";
    }
    luckyNumber.hidden = true;
    resultPanel.style.display = "none";
    waitSubmit.style.display = "none";
    waitSettleCommit = localStorage.getItem("waitSettleCommit");
    var waitStartTime = parseInt(localStorage.getItem("waitStartTime"));
    if (waitSettleCommit && Date.now() - waitStartTime < MUNITE_3) {
        showWait();
    }
    else {
        waitSettleCommit = null;
        localStorage.removeItem("waitSettleCommit");
        betBtn.hidden = false;
    }
    restartBtn.onclick = function () {
        betBtn.hidden = false;
        resultPanel.style.display = "none";
        waitSubmit.style.display = "none";
    };
    onlySelfBtn.onclick = function () {
        if (onlySelf) {
            onlySelf = false;
            onlySelfBtn.innerHTML = "只看我的";
        }
        else {
            onlySelf = true;
            onlySelfBtn.innerHTML = "查看全部";
        }
        while (historyItemList.hasChildNodes()) {
            historyItemList.removeChild(historyItemList.firstChild);
        }
        lastCommit = "";
        updateHistoryList();
    };
    //监听骰子按钮
    // for(let i=0; i<optionChance.length; i++){
    //     let elem = document.getElementById("option"+i);
    //     elem.onclick = function(){onSelectOption(i);}
    // }
    //监听押注金额
    betNum.onchange = function () {
        onChangeBetNum();
    };
    var _loop_1 = function (i) {
        var betNumBtn = document.getElementById("betNumBtn" + i);
        betNumBtn.onclick = function () {
            betNum["value"] = (15 * (i + 1)).toFixed(2);
            onChangeBetNum();
        };
    };
    //监听投注数量Btn
    for (var i = 0; i < 3; i++) {
        _loop_1(i);
    }
    //最大投注额
    var betNumBtnMax = document.getElementById("betNumBtnMax");
    betNumBtnMax.onclick = function () {
        betNum["value"] = diceMax.toFixed(2);
        onChangeBetNum();
    };
    //监听投注加减
    var betNumSub = document.getElementById("betNumSub");
    betNumSub.onclick = function () {
        var subRes = Number(betNum["value"]) - minAddAmount;
        if (subRes < minAmount)
            subRes = minAmount;
        betNum["value"] = subRes.toFixed(2);
        onChangeBetNum();
    };
    var betNumAdd = document.getElementById("betNumAdd");
    betNumAdd.onclick = function () {
        var addRes = Number(betNum["value"]) + minAddAmount;
        if (addRes > diceMax)
            addRes = diceMax;
        betNum["value"] = addRes.toFixed(2);
        onChangeBetNum();
    };
    //监听下注按钮
    betBtn.onclick = function () {
        var showTime = 0;
        var intervalHandle = 0;
        if (selectedBetNum == 0) {
            intervalHandle = setInterval(function () {
                showTime++;
                if (showTime % 2 == 1)
                    selectWarning.style.color = "#ff3333";
                else
                    selectWarning.style.color = "#ffffff";
                if (showTime == 10) {
                    clearInterval(intervalHandle);
                    selectWarning.style.color = "#ffffff";
                }
            }, 300);
            return;
        }
        httpRequest(serverURL + "getSign", function (response, err) {
            if (response) {
                var serverSign_1 = JSON.parse(response);
                var coinbase = getCoinBase();
                if (!coinbase) { //这个是判断你有没有登录，coinbase是你此时选择的账号
                    window.alert('Please activate MetaMask first.');
                    return;
                }
                // if (typeof web3 !== 'undefined') {}
                var inputData = encodeABI("placeBet", betMask, modulo, serverSign_1.commitLastBlock, serverSign_1.commit, serverSign_1.v, serverSign_1.r, serverSign_1.s);
                if (platform == "pc") {
                    getWeb3().eth.sendTransaction({
                        // gasPrice: 180000,
                        // gas: 100000000,
                        "gasLimit": 800000,
                        from: coinbase,
                        to: contractAddr,
                        value: amount * Wei,
                        data: inputData
                    }, function (err, hash) {
                        if (err) {
                            console.log("sendTX err: ", err);
                        }
                        else {
                            console.log(hash);
                            waitSettleCommit = serverSign_1.commit;
                            localStorage.setItem("waitSettleCommit", waitSettleCommit);
                            localStorage.setItem("waitStartTime", String(Date.now()));
                            intervalUpdateHistoryList(1000);
                            showWait();
                        }
                    });
                }
                else { //移动端通过钱包app发交易
                    var sendObj = {
                        "gasPrice": 1,
                        "gasLimit": 800000,
                        "keyTime": serverSign_1.commit,
                        "contractAddress": contractAddr,
                        "etzValue": amount * Wei,
                        "datas": inputData
                    };
                    var txJsonStr = JSON.stringify(sendObj);
                    window.easyetz.etzTransaction(txJsonStr);
                }
            }
        });
    };
    setPreSelectOption();
    updateHistoryList();
    intervalUpdateHistoryList(5000);
}
function showWait() {
    betBtn.hidden = true;
    resultPanel.style.display = "none";
    waitSubmit.style.display = "block";
}
//钱包发送交易后的回调
function makeSaveData(txHash, keyTime) {
    console.log(txHash);
    waitSettleCommit = keyTime;
    localStorage.setItem("waitSettleCommit", waitSettleCommit);
    localStorage.setItem("waitStartTime", String(Date.now()));
    intervalUpdateHistoryList(1000);
    // betBtn.innerHTML = "约5秒后开奖";
    showWait();
}
function setPreSelectOption() {
    //imp 
}
var updateHistoryListHandle = 0;
function intervalUpdateHistoryList(t) {
    if (updateHistoryListHandle != 0)
        clearInterval(updateHistoryListHandle);
    updateHistoryListHandle = setInterval(updateHistoryList, t);
}
function updateHistoryList() {
    //更新奖池
    httpRequest(serverURL + "jackpot", function (jackpotStr) {
        if (jackpotStr) {
            var jackpotData = JSON.parse(jackpotStr);
            bigAwardNum.innerText = jackpotData.data.toFixed(3);
        }
    });
    //更新交易列表
    var selfAddr = "";
    if (onlySelf)
        selfAddr = getCoinBase();
    httpRequest(serverURL + "historyLog?gameIndex=" + gameIndex + "&address=" + selfAddr + "&lastCommit=" + lastCommit, function (newBetListStr) {
        var newBetListData = JSON.parse(newBetListStr);
        if (newBetListData && newBetListData.data.length > 0) {
            var betResultMsg = null;
            lastCommit = newBetListData.data[0].commit;
            for (var i = newBetListData.data.length - 1; i >= 0; i--) {
                if (newBetListData.data[i].commit == waitSettleCommit) {
                    waitSettleCommit = null;
                    localStorage.removeItem("waitSettleCommit");
                    betResultMsg = { "winNum": Number(newBetListData.data[i].totalWin) };
                }
                appendHistoryItem(newBetListData.data[i]);
            }
            if (betResultMsg) { //显示开奖
                betBtn.hidden = true;
                resultPanel.style.display = "block";
                waitSubmit.style.display = "none";
                var checkFlag = "win-roll ";
                if (betResultMsg.winNum > 0) {
                    // betResult.hidden = false;
                    resultPanelTitle.innerHTML = "恭喜！您赢了^^";
                    playStar();
                }
                else {
                    resultPanelTitle.innerHTML = "您输了:(";
                    checkFlag = "";
                }
                betOn.innerHTML = "<span class=\"bet " + diceName + " " + checkFlag + "\">" + betTargetElem + "</span>";
                betResult.innerHTML = "<span class=\"result " + diceName + " " + checkFlag + "\">" + resultElem + "</span>";
                intervalUpdateHistoryList(5000);
            }
        }
    });
}
function showOrHidden(liElem) {
    liElem.addEventListener("click", function () {
        var t = $(this);
        if (t.find("div").is(":hidden")) {
            t.find("div").show(0);
        }
        else {
            t.find("div").hide(0);
        }
    });
}
function httpRequest(urlStr, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function (err) { console.log("onerror:", err); };
    xhr.ontimeout = function (err) { console.log("time out err:", err); };
    xhr.onreadystatechange = function (evt) {
        if (evt.target.status == 200) {
            // console.log("xhr.response:", evt.target.responseText);
            cb(evt.target.responseText);
        }
        else {
            // console.log("xhr.statuts:", evt.target.status);
        }
    };
    xhr.open("get", urlStr, false);
    try {
        xhr.send();
    }
    catch (e) {
        console.log("err:", e);
    }
}
//给开奖列表增加item
function appendHistoryItem(historyItem) {
    var itemNode = document.createElement("li");
    var winClassStr = "";
    var betWinNum = "\u2014";
    var jackpotNum = "\u2014";
    var isWin = false;
    if (Number(historyItem.totalWin) > 0)
        isWin = true;
    jackpotNum = historyItem.jeckpot;
    if (isWin) {
        itemNode.className = "settled won";
        winClassStr = " class=\"win\"";
        betWinNum = historyItem.betWin;
    }
    else {
        itemNode.className = "settled";
    }
    var betTarget = parseBetTarget(historyItem.mask);
    var betResult = parseBetResult(historyItem.diceResultIndex);
    var itemLuckyNumber = parseLuckyNumber(historyItem.betAmount, Number(historyItem.sha3_betBlockHash_secretNumber));
    if (modulo == 2) {
        diceName = "coin-flip";
        if (betTarget[0] == 1) {
            betTargetElem = "<i class=\"coin-option option-heads\"></i>";
        }
        else {
            betTargetElem = "<i class=\"coin-option option-tails\"></i>";
        }
        if (betResult[0] == 1) {
            resultElem = "<i class=\"coin-option option-heads\"></i>";
        }
        else {
            resultElem = "<i class=\"coin-option option-tails\"></i>";
        }
    }
    else if (modulo == 6) {
        diceName = "dice";
        betTargetElem = "";
        for (var i = 0; i < betTarget.length; i++) {
            betTargetElem += ("<i class=\"dice-option option-" + (betTarget[i] - 1) + "\"></i>");
        }
        resultElem = "<i class=\"dice-option option-" + (betResult[0] - 1) + "\"></i>";
    }
    else if (modulo == 36) {
        diceName = "two-dice";
        betTargetElem = betTarget.toString();
        resultElem = "<i class=\"dice-option option-" + (betResult[0] - 1) + "\"></i><i class=\"dice-option option-" + (betResult[1] - 1) + "\"></i>";
    }
    else {
        diceName = "etheroll";
        betTargetElem = "≤" + betTarget[0];
        resultElem = "<strong>" + betResult[0] + "</strong>";
    }
    itemNode.innerHTML = "<span class=\"address \">" + historyItem.gambler.substr(0, 8) + "</span><span class=\"amount\"><span class=\"ethers\">" + historyItem.betAmount + "</span></span><span class=\"bet " + diceName + "\">" + betTargetElem + "</span><span class=\"result " + diceName + "\">" + resultElem + "</span><span" + winClassStr + "><span class=\"ethers\">" + betWinNum + "</span></span><span class=\"jackpot\">" + itemLuckyNumber + "</span><button class=\"\"></button>\n                    <div><table><tbody><tr title=\"An EtherZero address which issued bet transaction\"><td>\u5730\u5740</td><td data-uri=\"http://etzscan.com/addr/" + historyItem.gambler + "\">" + historyItem.gambler + "</td></tr><tr title=\"The amount of EtherZero that was sent as a bet\"><td>\u8D4C\u6CE8</td><td><span class=\"ethers\">" + historyItem.betAmount + "<small>\u4EE5\u592A\u96F6</small></span></td></tr><tr title=\"The numbers the bet was made on\"><td>\u5C06\u8D4C\u6CE8\u62BC\u5728</td><td>" + betTarget.toString() + "</td></tr><tr title=\"Transaction hash of the bet transaction\"><td>bet trx</td><td data-uri=\"https://etzscan.com/tx/" + historyItem.betTX + "\">" + historyItem.betTX + "</td></tr><tr title=\"Hash of the secret number from the house\"><td>sha3(secret)</td><td>" + historyItem.sha3_secretNumber + "</td></tr><tr title=\"Actual secret number from the house\"><td>secret</td><td>" + historyItem.secretNumber + "</td></tr><tr title=\"number of the maximum block where \"commit\" is still considered valid\"><td>maximum block</td><td>" + historyItem.commitLastBlock + "</td></tr><tr title=\"Hash of the bet block hash and secret number\"><td>sha3(blk + secret)</td><td>" + historyItem.sha3_betBlockHash_secretNumber + "</td></tr><tr title=\"The same as above, but with modulo over available options\"><td>sha3 mod " + modulo + "</td><td>" + betResult.join("+") + "</td></tr><tr title=\"Jackpot number\"><td>jackpot</td><td>" + itemLuckyNumber + "</td></tr><tr title=\"The total winning of the bet\"><td>\u83B7\u80DC</td><td data-uri=\"https://etzscan.com/tx/" + historyItem.settleTX + "\"><span class=\"ethers\">" + historyItem.totalWin + "<small>\u4EE5\u592A\u96F6</small></span></td></tr></tbody></table>\n                    </div>";
    if (historyItemList.children.length == 0) {
        historyItemList.appendChild(itemNode);
    }
    else {
        historyItemList.insertBefore(itemNode, historyItemList.children[0]);
    }
    $(itemNode).find("div").hide(0);
    showOrHidden(itemNode);
}
function parseLuckyNumber(betAmount, itemEntropy) {
    //var jackpotLuckyNum = "-";
    //if (Number(betAmount) >= MIN_JACKPOT_BET) {
    //    jackpotLuckyNum = (itemEntropy / modulo) % JACKPOT_MODULO;
    //}
    //return jackpotLuckyNum;
    return (itemEntropy / modulo) % JACKPOT_MODULO;
}
//解析押注对象。比如："6, 7, 8, 9"
function parseBetTarget(betMask) {
    //imp 
    return [betMask];
}
//根据随机开奖结果求出结果对应的押注
function parseBetResult(diceResultIndex) {
    //imp 
    return [diceResultIndex + 1]; //押注值
}
//将每一种赌注结果用一个二进制位标识。双骰子游戏一种选择可能有多重包含结果；另外除投硬币外都可以多投
function onChangeBetTarget(_selectedBetNum) {
    //设置赢的概率
    selectedBetNum = _selectedBetNum;
    winRate = selectedBetNum / modulo;
    standZoomRate = modulo / selectedBetNum;
    diceMax = Number((5000 / (standZoomRate - 1)).toFixed(2));
    if (diceMax > MAX_AMOUNT)
        diceMax = MAX_AMOUNT;
    winChance.innerText = (winRate * 100).toFixed(2) + "%";
    //更新betMask
    betMask = selectedBetNum;
    //更新标签
    update();
}
function onChangeBetNum() {
    amount = Number(betNum["value"]);
    if (isNaN(amount) || amount < minAmount) {
        amount = minAmount;
        betNum["value"] = minAmount.toFixed(2);
        // alert("minnum is "+minAmount);
    }
    if (amount > diceMax) {
        amount = diceMax;
        betNum["value"] = diceMax.toFixed(2);
        // alert("maxnum is "+diceMax);
    }
    if (amount < 60) {
        feeRate = 0.02;
    }
    else if (amount < 100) {
        feeRate = 0.01;
    }
    else {
        feeRate = 0.005;
    }
    if (amount > 100) {
        jackpotFee = 1;
    }
    else {
        jackpotFee = 0;
    }
    update();
}
//更新amount和betMask改变导致的标签变化
function update() {
    fee = amount * standZoomRate * feeRate;
    jackpotFee = amount >= MIN_JACKPOT_BET ? JACKPOT_FEE : 0;
    realZoomRate = (amount * standZoomRate - fee - jackpotFee) / amount;
    //更新费率
    feeRateLabel.innerText = (feeRate * 100).toFixed(1) + "% 费用";
    //更新倍率
    rateLabel.innerText = realZoomRate.toFixed(2) + "%";
    //更新将赢得额度
    winAmount = amount * realZoomRate;
    winCoin.innerText = winAmount.toFixed(2);
    if (amount < MIN_JACKPOT_BET) { //不参与抽奖
        bigAwardDes.hidden = true;
        luckyNumber.hidden = true;
        bigAwardMinDes.hidden = false;
    }
    else {
        bigAwardDes.hidden = false;
        luckyNumber.hidden = false;
        bigAwardMinDes.hidden = true;
    }
}
//获取主合约方法调用的sha3
function encodeABI(methodName) {
    var param = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        param[_i - 1] = arguments[_i];
    }
    var funcObj;
    for (var i = 0; i < petContractABI.length; i++) {
        funcObj = petContractABI[i];
        if (funcObj.name == methodName && funcObj.type == "function") {
            break;
        }
    }
    return encodeSha3.apply(void 0, [funcObj].concat(param));
}
//获取调用合约方法所需要的inputData.
//param必须都是字符串类型(数字类型的转成字符串再传入)
function encodeSha3(funcObj) {
    var param = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        param[_i - 1] = arguments[_i];
    }
    if (!funcObj)
        return "";
    //系列化方法名
    var methodStr = funcObj.name + "(";
    if (funcObj.inputs) {
        for (var j = 0; j < funcObj.inputs.length; j++) {
            methodStr = methodStr + funcObj.inputs[j].type;
            if (j < funcObj.inputs.length - 1) {
                methodStr = methodStr + ",";
            }
        }
    }
    methodStr = methodStr + ")";
    var methodCode = "0x" + keccak256(methodStr);
    methodCode = methodCode.substr(0, 10);
    var inputData = methodCode;
    var paramType;
    var preStr;
    //追加参数
    var dynamicData = "";
    for (var k = 0; k < param.length; k++) {
        //console.log("typeof(param[k]):"+typeof(param[k]));
        paramType = typeof (param[k]);
        if (paramType == "number") { //转成16进制字符串
            if (param[k] >= 0) {
                param[k] = param[k].toString(16);
                preStr = zeroStr64.substr(0, 64 - param[k].length);
            }
            else {
                var negativeVHx = (-param[k]).toString(16);
                var carryV = "0x1"; //negativeVHx的十六进制进位值
                for (var i = 0; i < negativeVHx.length; i++) {
                    carryV = carryV + "0";
                }
                param[k] = (parseInt(carryV) + param[k]).toString(16);
                //param[k] = "f";
                preStr = fStr64.substr(0, 64 - param[k].length);
            }
        }
        else if (paramType == "string") { //最长32个字符
            if (param[k].indexOf("0x") == 0) {
                param[k] = param[k].substr(2);
                preStr = zeroStr64.substr(0, 64 - param[k].length);
            }
            else {
                var elemData = "";
                for (var n = 0; n < param[k].length; n++) {
                    var elem = param[k].charCodeAt(n).toString(16);
                    elemData += elem;
                }
                //系列化偏移量
                param[k] = (funcObj.inputs.length * 32 + dynamicData.length / 2).toString(16);
                preStr = zeroStr64.substr(0, 64 - param[k].length);
                elemData += zeroStr64.substr(0, 64 - elemData.length);
                //系列化数组长度
                var elemNum = param[k].length.toString(16);
                dynamicData = dynamicData + zeroStr64.substr(0, 64 - elemNum.length) + elemNum;
                //系列化数组元素
                dynamicData = dynamicData + elemData;
            }
        }
        else if (paramType == "boolean") {
            preStr = ""; //t 待补充
        }
        else if (paramType == "object") {
            if (Array.isArray(param[k])) { //数组类型只记偏移量，具体元素值通过dynamicData追加到inputData后面
                var elemData = "";
                if (funcObj.inputs[k].type.indexOf("int") != -1) { //整型
                    for (var n = 0; n < param[k].length; n++) {
                        var elem = parseInt(param[k][n]).toString(16);
                        elemData += (zeroStr64.substr(0, 64 - elem.length) + elem);
                    }
                }
                else if (funcObj.inputs[k].type == "address[]") {
                    for (var n = 0; n < param[k].length; n++) {
                        var elem = String(param[k][n]);
                        if (elem.indexOf("0x") == 0) {
                            elem = elem.substr(2);
                        }
                        elemData += (zeroStr64.substr(0, 64 - elem.length) + elem);
                    }
                }
                else {
                    elemData = ""; //t 待补充
                }
                //系列化偏移量
                param[k] = (funcObj.inputs.length * 32 + dynamicData.length / 2).toString(16);
                preStr = zeroStr64.substr(0, 64 - param[k].length);
                //系列化数组长度
                var elemNum = param[k].length.toString(16);
                dynamicData = dynamicData + zeroStr64.substr(0, 64 - elemNum.length) + elemNum;
                //系列化数组元素
                dynamicData = dynamicData + elemData;
            }
            else {
                preStr = ""; //t 待补充
            }
        }
        else {
            preStr = ""; //t 待补充
        }
        inputData = inputData + preStr + param[k];
    }
    inputData = inputData + dynamicData;
    // console.log("input:", inputData);
    return inputData;
}
//# sourceMappingURL=main_roll.js.map