  'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        //名前が空の時は処理を終了する
        return;
    }
    
    // 診断結果表示エリアの作成
    resultDivided.innerText = ""
    const header = document.createElement('h3');
    header.innerText = 'マッチング結果\nあなたにはこの曲がぴったり！！！';
    resultDivided.appendChild(header);

    const paragraph =document.createElement('p');
    const result = assessment(userName);
    paragraph.innerHTML = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    tweetDivided.innerText = ""
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたにぴったりの歌') + 
      '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたにぴったりの歌';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

    
};
 const answers = [
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/3V9952osjnc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //シルヴ・プレジデント
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/dHXC_ahjtEE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //グッバイ宣言
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/1tk1pqwrOys" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //廻廻奇譚
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/bhjNyUPFCyk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //メンタルチェーンソー
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/cm-l2h6GB8Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //KING
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/DC6JppqHkaM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //春を告げる
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/dy90tA3TT1c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //怪物
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/mHP6-D-yBEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //POP SONG
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/UFQEttrn6CQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //感電
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/ptnYBctoexk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //馬と鹿
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/-tKVN2mAKRI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //打上花火
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/9aJVr5tTTWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ピースサイン
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/Xg-qfsKN2_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ロキ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ey_NHZNYTeE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //脳漿炸裂ガール
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/KushW6zvazM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ゴーストルール
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/oRJBwaZ59fQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ベノム
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/HtBqK6xsQ9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //アニマル
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/7zwCIz-Ohn4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //乙女解剖
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/e1xCOsgWG0M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ヴァンパイア
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/hxSg2Ioz3LM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ヒバナ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/8pGRdRhjX3o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //妄想感傷代償連盟
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/oBgADhsOoog" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //いーあるふぁんくらぶ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/shs0rAiwsGQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //千本桜
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/adGhT_-JbZI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //シンデレラ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/-H2PCK7DJsQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //サラマンダー
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/WysuxO4yR04" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //モザイクロール
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/TA5OFS_xX0c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //シャルル
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/agcoHM2CJ3s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //パラサイト
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/Rkrm5foi188" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ダーリンダンス
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/RqxnjgFj1HU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //リバーシブル・キャンペーン
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/TXfJVNqaHiM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //失敗作少女
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/HbSMzi9niVg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //メンタルチェーンソー本家
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/hZFBTnzKa54" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //だれかの心臓になれたなら
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/BOrdMrh4uKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //カメレオン
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/paoXdQREpYM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ときめきブローカー
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/TkroHwQYpFE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ヒビカセ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/XfUao0_54yM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //ルマ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/L-MVk5I6wjo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //チューニングラブ
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/hm1na9R2uYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //一途
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/0HYm60Mjm0k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //命に嫌われている
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/8r-_K32fsSU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, //彼氏のジュード

];
 
 /**
  * 名前の文字列を渡すと診断結果を返す関数
  * @param {string} userName ユーザーの名前
  * @return {string} 診断結果
  */
 function assessment(userName){
     //全文字のコード番号を取得してそれを足し合わせる
     let sumOfCharCode = 0;
     for (let i = 0; i < userName.length; i++){
         sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
     }
 
      // 文字のコード番号の合計を回答の数で割って添字の数値を求める
      const index = sumOfCharCode % answers.length;
      let result = answers[index];
    
      result = result.replaceAll('{userName}', userName);
      return result;
 }
    // Enter
 userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};