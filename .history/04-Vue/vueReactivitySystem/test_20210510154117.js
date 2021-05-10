const res = Json.parse({ "actionCode" : "1", "transactionId" : "6001020001202104281619617969", "rspTime" : "20210428215249", "rspType" : "0", "rspCode" : "0000", "rspDesc" : "成功", "resultCode" : "00000000", "resultMessage" : "成功", "cryptIndex" : "117", "personalData" : { "iccid" : "89860321245513136600", "imsi" : "460031275136903", "uimid" : "8095F603", "sid" : "3747", "accolc" : "3", "nid" : "FFFF", "akey" : "fa88a8a87d881d11", "pin1" : "1234", "pin2" : "29296899", "puk1" : "37785706", "puk2" : "91015128", "adm" : "47F12F27", "hrpdupp" : "460031275136903@mycdma.cn", "hrpdss" : "662dc8104961cfbb", "sipuppsList" : [ { "sipuppData" : "23200F6374776170406D7963646D612E636E210F63746E6574406D7963646D612E636E20" } ], "sipssList" : [ { "sipssData" : "6f06f608e6cfa3b44df8483736949f56" } ], "mipuppList" : [ { "mipuppData" : "460031275136903@mycdma.cn" } ], "mnhassList" : [ { "mnhassData" : "4401edb6851bcbe0" }, { "mnhassData" : "5a2a24adcc8c5f89" }, { "mnhassData" : "4eae865cea08ee26" }, { "mnhassData" : "230e61e6d9c49b17" }, { "mnhassData" : "40e5ce791ecad545" }, { "mnhassData" : "909af50069479d76" }, { "mnhassData" : "b0b6e1e23c2ca59a" }, { "mnhassData" : "849a28a2e08e7986" }, { "mnhassData" : "9d81ed60210b7243" }, { "mnhassData" : "ec8421d0c85995fe" }, { "mnhassData" : "451bdd18aa1e8c2c" }, { "mnhassData" : "7668860daab71aa9" }, { "mnhassData" : "fecd72a6821cf00a" }, { "mnhassData" : "fab9a2e5935d785c" }, { "mnhassData" : "970a7091e7357c37" } ], "mnaaassList" : [ { "mnaaassData" : "bae495f13f0d6a6e" }, { "mnaaassData" : "02efdb2634453633" }, { "mnaaassData" : "434d52f31b3754fa" }, { "mnaaassData" : "3df15cc3ca1b06c0" }, { "mnaaassData" : "7c6900ca0d047e42" }, { "mnaaassData" : "5e9e648fc05b4ed7" }, { "mnaaassData" : "4a04b2c5465b0c75" }, { "mnaaassData" : "6fa5a36143451df4" }, { "mnaaassData" : "fa8166884d907080" }, { "mnaaassData" : "c8e00da1f7663b82" }, { "mnaaassData" : "4a2b0c0ac3d15bfd" }, { "mnaaassData" : "7592d102a1a196e8" }, { "mnaaassData" : "1469f9bd9be65973" }, { "mnaaassData" : "d3bd600c45c3c719" }, { "mnaaassData" : "33b2bd307701daa0" } ], "imsIg" : "204043346756588", "acc" : "8", "ki" : "17f4dddea12ef3d6c8b039392f75b8e9", "opcg" : "b6f0b53dfb1ecf6609dada921ab47615", "smsp" : "+316540942001", "imsiLte" : "460110232499038", "accLte" : "8", "kiLte" : "427f9f2da4ac9a147a12f68a67235349", "opcLte" : "7bdaa7385a18d61972c0da93262cfdb2" } })

let cardInfo=res.data.personalData;
let cardInfo=Object.assign(this.cardInfo,cardInfo);
this.cardInfo.cryptIndex=res.data.cryptIndex;
let cardShopObj= {
    cardShopType: 'B',//卡商信息
    sdllName: 'TB00052',//卡商dll文件名
    authCode: '12345678123456781234567812345678',//卡商秘钥
  },
makeParam(cardInfo,cardShopObj){
    let sdllName = "";
    let authCode = "";
    //卡商秘钥和写卡组件信息
    sdllName = cardShopObj.paraValue01;
    authCode = cardShopObj.paraValue02;
    let cardStr = String(makeCardStr(cardInfo));
    console.log(cardStr)
    let adm = String(cardInfo.adm);
    return {
      cryptIndex:cardInfo.cryptIndex ,
      adm:adm,
      cardStr:cardStr,
      sdllName:sdllName,
      authCode:authCode
    }
  }

  makeCardStr(cardInfo){ //组装卡信息
    let cardStr = "";
    cardStr =cardInfo.iccid + "," + cardInfo.imsi + "," +
      cardInfo.uimid + "," + cardInfo.sid + "," +
      cardInfo.accolc + "," + cardInfo.nid + "," +
      cardInfo.akey + "," + cardInfo.pin1 + "," +
      cardInfo.pin2 + "," + cardInfo.puk1 + "," +
      cardInfo.puk2 + "," + cardInfo.adm + "," +
      cardInfo.hrpdupp + "," + cardInfo.hrpdss + ",";
    if(!_.isEmpty(cardInfo.sipuppsList)){
      cardInfo.sipuppsList.forEach(el =>{
        cardStr = cardStr + el.sipuppData + ";"
      })
      cardStr = cardStr.substring(0,cardStr.length-1) + ",";
    }
    if(!_.isEmpty(cardInfo.sipssList)){
      cardInfo.sipssList.forEach(el =>{
        cardStr = cardStr + el.sipssData + ";"
      })
      cardStr = cardStr.substring(0,cardStr.length-1) + ",";
    }
    if(!_.isEmpty(cardInfo.mipuppList)){

      cardInfo.mipuppList.forEach(el =>{
        cardStr = cardStr + el.mipuppData + ";"
      })
      cardStr = cardStr.substring(0,cardStr.length-1) + ",";
    }
    if(!_.isEmpty(cardInfo.mnhassList)){
      cardInfo.mnhassList.forEach(el =>{
        cardStr = cardStr + el.mnhassData + ";"
      })
      cardStr = cardStr.substring(0,cardStr.length-1) + ","
    }
    if(!_.isEmpty(cardInfo.mnaaassList)){
      cardInfo.mnaaassList.forEach(el =>{
        cardStr = cardStr + el.mnaaassData + ";"
      })
    }
    cardStr = cardStr.substring(0,cardStr.length-1) + ","
    cardStr = cardStr + cardInfo.imsIg + ","
    cardStr = cardStr + cardInfo.acc + ","
    cardStr = cardStr + cardInfo.ki + ","
    cardStr = cardStr + cardInfo.smsp + ","
    cardStr = cardStr + cardInfo.opcg + ","
    cardStr = cardStr + cardInfo.imsiLte + ","
    cardStr = cardStr + cardInfo.accLte + ","
    cardStr = cardStr + cardInfo.kiLte + ","
    cardStr = cardStr + cardInfo.opcLte
    return cardStr;
  },