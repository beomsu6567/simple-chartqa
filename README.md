<div>
  <h1>使い方</h3>
  <div>
    <h2>コード例</h2>
    <code>
      // スタイルシート読み込み
      <link rel="stylesheet" href="chartqa.css">
      // チャットボットのタグを生成する場所
      <div class="chart-add"><!--  --></div>

      // jquery及びchartqa.jsを読み込む
      <script src="jquery.min.js"></script>
      <script src="chartqa.js"></script>
      <script>
   　　 var qa = [
      　　{
       　　 "title": "チャットQ&A項目1",
       　　 "list": [
          　　{
            　　"title": "チャットQ&A項目1-1",
            　　"text": 'チャットQ&A項目1-1内容です。',
          　　},
         　　 {
            　　"title": "チャットQ&A項目1-2",
           　　 "text": 'チャットQ&A項目1-2内容です。',
         　　 },
         　　 {
          　　  "title": "チャットQ&A項目1-3",
          　　  "list": [
           　　   {
           　　     "title": "チャットQ&A項目1-3-1",
           　　     "text": 'チャットQ&A項目1-3-1内容です。',
           　　   },
           　　   {
               　　 "title": "チャットQ&A項目1-3-2",
               　　 "text": 'チャットQ&A項目1-3-2内容です。',
            　　  },
         　　     {
         　　       "title": "チャットQ&A項目1-3-3",
     　　           "text": 'チャットQ&A項目1-3-3内容です。',
   　　 　　      },
     　　       ],
     　　     },
        　　]
     　　 }, {
        　　"title": "チャットQ&A項目2",
        　　"list": [
          　　{
            　　"title": "チャットQ&A項目2-1",
            　　"text": 'チャットQ&A項目2-1内容です。',
          　　},
          　　{
            　　"title": "チャットQ&A項目2-2",
            　　"text": 'チャットQ&A項目2-2内容です。',
          　　},
          　　{
            　　"title": "チャットQ&A項目2-3",
            　　"list": [
              　　{
               　　 "title": "チャットQ&A項目2-3-1",
                　　"text": 'チャットQ&A項目2-3-1内容です。',
             　　 },
              　　{
               　　 "title": "チャットQ&A項目2-3-2",
                　　"text": 'チャットQ&A項目2-3-2内容です。',
             　　 },
             　　 {
             　　   "title": "チャットQ&A項目2-3-3",
             　　   "text": 'チャットQ&A項目2-3-3内容です。',
             　　 },
      　　      ]
          　　},
     　　   ]
   　　   }
   　　 ];

   　　 $(".chart-add").chartqa({
   　　   title: 'チャットボット',
   　　   firstText: 'よくある質問のチャットです。',
   　　   qalist: qa,
  　　    parentTagOn: true,
 　　   }); 
　　  </script>
    </code>
  </div>
  <div>
    <h2>オープション</h2>
    <table>
      <thead>
        <th>オプション名</th>
        <th>内容</th>
        <th>初期値</th>
      </thead>
      <tbody>
        <tr>
          <td>titleIcon</td>
          <td>タイトルのところのアイコンを任意で変更できます。</td>
          <td>''</td>
        </tr>
        <tr>
          <td>title</td>
          <td>タイトルのところの文字を調整できます。</td>
          <td>'よくある質問'</td>
        </tr>
        <tr>
          <td>firstText</td>
          <td>簡単なチャットボットの説明文を入れます。（チャットボットの一番最初に表示させる文言）</td>
          <td>'こちらはチャットボット（自動応答）窓口です。'</td>
        </tr>
        <tr>
          <td>nextText</td>
          <td>メニューを表示させる際のテキストが入ります。</td>
          <td>'何かご不明点はございますか？'</td>
        </tr>
        <tr>
          <td>backText01</td>
          <td>メニューに戻るボタンのテキストを調整できます。</td>
          <td>'メニューに戻る'</td>
        </tr>
        <tr>
          <td>backText02</td>
          <td>ひとつ前の戻るボタンのテキストを調整できます。</td>
          <td>'戻る'</td>
        </tr>
        <tr>
          <td>parentTagOn</td>
          <td>検索をした制に重複するタイトルがある際にその親配列のタイトルを記入してくれるオープションです。</td>
          <td>false</td>
        </tr>
        <tr>
          <td>searchBox</td>
          <td>検索ボックスを出すか出さないか。</td>
          <td>true</td>
        </tr>
        <tr>
          <td>qalist</td>
          <td>質問内容の配列を保管するところ。(リストを表示させる場合の配列{"title":"","list":[]}、内容を表示させる場合{"title":"","text":""}の形式で保管)</td>
          <td>[]</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h2>デザイン調整</h2>
    <ul>
      <li>charqa.scssの変数($primary,$button-color)で色などの更新はすぐにできます。</li>
      <li>scssを調整することでカスタムなどもできます。</li>
    </ul>
  </div>
</div>
