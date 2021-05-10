makeParam(cardInfo,cardShopObj){
    let sdllName = "";
    let authCode = "";
    //卡商秘钥和写卡组件信息
    sdllName = cardShopObj.paraValue01;
    authCode = cardShopObj.paraValue02;
    let cardStr = String(this.makeCardStr(cardInfo));
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