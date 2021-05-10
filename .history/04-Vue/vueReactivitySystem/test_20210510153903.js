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