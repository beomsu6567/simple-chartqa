(function ($) {
  $.fn.chartqa = function (options) {

    var settings = $.extend(true, {
      'titleIcon': '',
      'title': 'よくある質問',
      'firstText': 'こちらはチャットボット（自動応答）窓口です。',
      'nextText': '何かご不明点はございますか？',
      'backText01': 'メニューに戻る',
      'backText02': '戻る',
      'parentTagOn': false,
      'searchBox': true,
      'qalist': [],
    }, options);
    var chartMainTag = $(this);
    var baseTag = `<div class="qa-chart">
      <div class="chart-qa-ttl">`;
    if (settings.titleIcon == '') {
      baseTag += `<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path
        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>`;
    } else {
      baseTag += `<div class="ttl-icon-box">${settings.titleIcon}</div>`
    }
    baseTag += `${settings.title}</div>
    <div id="chart-message" class="chart-message">
      <ul class="chart-list"></ul>
    </div>
  </div>`;

    chartMainTag.append(baseTag);

    if (settings.searchBox) {
      $(this).children('.qa-chart').append(`<div class="chart-search-box"><input type="text" name="chartkeyword" value="" placeholder="キーワードから検索"><button type="button" class="chartsearch-btn">送信</button></div>`)
    }

    var firstText = settings.firstText;
    var nextText = settings.nextText;
    var qaList = settings.qalist;
    var sessionStorageId = location.host;
    var sessionStorageItem = [];

    const ul = $('.chart-list');
    var count = 0;
    var level;
    function chatToBottom(num) {
      const chatField = document.getElementById('chart-message');
      if (chatField.clientHeight > $(`.text-num${num}`).innerHeight()) {
        chatField.scroll(0, chatField.scrollHeight - chatField.clientHeight);
      } else {
        chatField.scroll(0, chatField.scrollHeight - ($(`.text-num${num}`).innerHeight() + Number($(chatField).children().css('padding-bottom').replace('px', ''))));
      }
    }
    function chartStart() {
      if (sessionStorage.getItem(sessionStorageId + 'qalist')) {
        sessionStorageItem = JSON.parse(sessionStorage.getItem(sessionStorageId + 'qalist'));
        count = 1;
        ul.append(`<li class="text-num0 left-chart"><div class="text-chart">${firstText}</div></li>`);
        var tagLi = $('<li>', {
          class: `text-num1 left-chart`,
        });
        var divTag = $('<div>', {
          class: `text-chart -btn`,
          text: nextText,
        });
        var tagUl = $('<ul>', {
          class: `choice-box`,
        });

        for (let i = 0; i < qaList.length; i++) {
          tagUl.append(`<li><button type="button" class="choice-btn" data-qanum="${i}" disabled>${qaList[i]["title"]}</button></li>`);
        }
        divTag.append(tagUl);
        tagLi.append(divTag);
        ul.append(tagLi);
        for (let i = 0; i < sessionStorageItem.length; i++) {
          var disabledCheck = "disabled";
          if ((sessionStorageItem.length - 1) == i) {
            if (sessionStorageItem[i]['text'] != undefined || sessionStorageItem[i]['list'] != undefined) {
              level = sessionStorageItem[i];
            }
            disabledCheck = "";
          }
          if (sessionStorageItem[i]["search"] != undefined) {
            var searchVal = `「${sessionStorageItem[i]['search']}」のキーワードからの検索結果です。`;
            var searchValMiss = `「${sessionStorageItem[i]['search']}」のキーワードからの検索結果がありません。`;
            count++;
            ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${sessionStorageItem[i]['search']}</div></li>`);
            count++;
            if (sessionStorageItem[i]["list"].length > 0) {
              ul.append(`<li class="text-num${count} left-chart"><div class="text-chart -btn">${searchVal}<ul class="choice-box"></ul></div></li>`);
              for (let i2 = 0; i2 < sessionStorageItem[i]['list'].length; i2++) {
                $(`.text-num${count} .text-chart .choice-box`).append(`<li><button type="button" class="choice-btn" data-qanum="${i2}" ${disabledCheck}>${sessionStorageItem[i]["list"][i2]["title"]}</button></li>`);
              }
            } else {
              ul.append(`<li class="text-num${count} left-chart"><div class="text-chart">${searchValMiss}</div></li>`);
              count++;
              ul.append(`<li class="text-num${count} left-chart"><div class="text-chart -btn"><button class="back-btn" data-qanum="next" ${disabledCheck}>${settings.backText01}</button></div></li>`);
            }
          } else if (sessionStorageItem[i]["list"] != undefined) {
            count++;
            ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${sessionStorageItem[i]['title']}</div></li>`);
            count++;
            var tagLi02 = $('<li>', {
              class: `text-num${count} left-chart`,
            });
            var divTag = $('<div>', {
              class: `text-chart -btn`,
              text: sessionStorageItem[i]['title'],
            });
            var ulTag = $('<ul>', {
              class: `choice-box`,
            });

            for (let i02 = 0; i02 < sessionStorageItem[i]["list"].length; i02++) {
              ulTag.append(`<li><button type="button" class="choice-btn" data-qanum="${i02}" ${disabledCheck}>${sessionStorageItem[i]["list"][i02]["title"]}</button></li>`);
            }
            ulTag.append(`<li><button type="button" class="choice-btn -back" data-qanum="back" ${disabledCheck}>${settings.backText02}</button></li>`);
            divTag.append(ulTag);
            tagLi02.append(divTag);
            ul.append(tagLi02);
          } else if (sessionStorageItem[i]["text"] != undefined) {
            count++;
            ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${sessionStorageItem[i]['title']}</div></li>`);
            count++;
            ul.append(`<li class="text-num${count} left-chart"><div class="text-chart">${sessionStorageItem[i]['text']}</div></li>`);
            ul.append(`<li class="text-num${count} left-chart"><div class="text-chart -btn"><button class="back-btn" data-qanum="next" ${disabledCheck}>${settings.backText01}</button></div></li>`);
          } else {
            count++;
            var tagLi = $('<li>', {
              class: `text-num${count} left-chart`,
            });
            var divTag = $('<div>', {
              class: `text-chart -btn`,
              text: nextText,
            });
            var tagUl = $('<ul>', {
              class: `choice-box`,
            });
            for (let i = 0; i < qaList.length; i++) {
              tagUl.append(`<li><button type="button" class="choice-btn" data-qanum="${i}" ${disabledCheck}>${qaList[i]["title"]}</button></li>`);
            }

            divTag.append(tagUl);
            tagLi.append(divTag);
            ul.append(tagLi);
          }
        }
        chatToBottom(count);
      } else {
        chartSet('first');
      }
    }

    function chartSet(check) {
      answering = true;
      ul.append(`<li class="text-num${count} left-chart"></li>`);
      chatToBottom(count);
      if (check == 'first' || check == 'next') {
        if (check == 'first') {
          $(`.text-num${count}`).html(`<div class="text-chart" style="display:none;">${firstText}</div>`);
          $(`.text-num${count} .text-chart`).fadeIn(300);
        }

        if (check == 'first') {
          count++;
          ul.append(`<li class="text-num${count} left-chart"></li>`);
          chatToBottom(count);
        }

        setTimeout(function () {
          $(`.text-num${count}`).html(`<div class="text-chart" style="display:none;">${nextText}</div>`);
          if (qaList.length > 0) {
            $(`.text-num${count} .text-chart`).fadeIn(300);
            chatToBottom(count);
            setTimeout(() => {
              var tag = $('<ul>', {
                class: `choice-box`,
                style: 'display:none;',
              });
              for (let i = 0; i < qaList.length; i++) {
                tag.append(`<li><button type="button" class="choice-btn" data-qanum="${i}">${qaList[i]["title"]}</button></li>`);
                chatToBottom(count);
              }
              $(`.text-num${count} .text-chart`).addClass('-btn');
              $(`.text-num${count} .text-chart`).append(tag);
              chatToBottom(count);
              $(`.text-num${count} .text-chart .choice-box`).fadeIn(300);
              chatToBottom(count);
              answering = false;
            }, 500);
          } else {
            var noListText = "現在登録されている質問がありません。"
            for (let i = 0; i < noListText.length; i++) {
              $(`.text-num${count} .text-chart`).append(noListText[i]).fadeIn(300);
              chatToBottom(count);
            };
          }

        }, 500);

      } else if (check == 'back') {
        setTimeout(function () {
          if (level == undefined) {
            $(`.text-num${count}`).html(`<div class="text-chart" style="display:none;">${nextText}</div>`);
            $(`.text-num${count} .text-chart`).fadeIn(300);
            chatToBottom(count);
            setTimeout(() => {
              var tag = $('<ul>', {
                class: `choice-box`,
                style: 'display:none;',
              });
              for (let i = 0; i < qaList.length; i++) {
                tag.append(`<li><button type="button" class="choice-btn" data-qanum="${i}">${qaList[i]["title"]}</button></li>`);
                chatToBottom(count);
              }
              $(`.text-num${count} .text-chart`).addClass('-btn');
              $(`.text-num${count} .text-chart`).append(tag);
              chatToBottom(count);
              $(`.text-num${count} .text-chart .choice-box`).fadeIn(300);
              chatToBottom(count);
              answering = false;
            }, 500);
          } else {
            for (let i = 0; i < level['title'].length; i++) {
              if (i == 0) {
                $(`.text-num${count}`).html('<div class="text-chart" style="display:none;"></div>');
                $(`.text-num${count} .text-chart`).append(level['title'][i]);
                chatToBottom(count);
                $(`.text-num${count} .text-chart`).fadeIn(300);
              } else {
                $(`.text-num${count} .text-chart`).append(level['title'][i]);
                chatToBottom(count);
              }
            }

            setTimeout(() => {
              var tag = $('<ul>', {
                class: `choice-box`,
                style: 'display:none;',
              });

              for (let i = 0; i < level["list"].length; i++) {
                tag.append(`<li><button type="button" class="choice-btn" data-qanum="${i}">${level["list"][i]["title"]}</button></li>`);
              }
              tag.append(`<li><button type="button" class="choice-btn" data-qanum="back">${settings.backText02}</button></li>`);
              $(`.text-num${count} .text-chart`).addClass('-btn');
              $(`.text-num${count} .text-chart`).append(tag);
              $(`.text-num${count} .text-chart .choice-box`).fadeIn(300);
              chatToBottom(count);
              answering = false;
            }, 500);
          }
        }, 500);
      } else {
        setTimeout(function () {
          if (level["list"] != undefined) {
            for (let i = 0; i < level['title'].length; i++) {
              if (i == 0) {
                $(`.text-num${count}`).html('<div class="text-chart" style="display:none;"></div>');
                $(`.text-num${count} .text-chart`).append(level['title'][i]);
                $(`.text-num${count} .text-chart`).fadeIn(300);
                chatToBottom(count);
              } else {
                $(`.text-num${count} .text-chart`).append(level['title'][i]);
                chatToBottom(count);
              }
            }

            setTimeout(() => {
              var tag = $('<ul>', {
                class: `choice-box`,
                style: 'display:none;',
              });

              for (let i = 0; i < level["list"].length; i++) {
                tag.append(`<li><button type="button" class="choice-btn" data-qanum="${i}">${level["list"][i]["title"]}</button></li>`);
              }
              tag.append(`<li><button type="button" class="choice-btn -back" data-qanum="back">${settings.backText02}</button></li>`);
              $(`.text-num${count} .text-chart`).addClass('-btn');
              $(`.text-num${count} .text-chart`).append(tag);
              $(`.text-num${count} .text-chart .choice-box`).fadeIn(300);
              chatToBottom(count);
              answering = false;
            }, 500);

          } else {
            $(`.text-num${count}`).html(`<div class="text-chart" style="display:none;">${level['text']}</div>`);
            $(`.text-num${count} .text-chart`).fadeIn(300);
            chatToBottom(count);
            setTimeout(() => {
              count++;
              ul.append(`<li class="text-num${count} left-chart"><div class="text-chart -btn" style="display:none;"><button class="back-btn" data-qanum="next">${settings.backText01}</button></div></li>`);
              $(`.text-num${count} .text-chart`).fadeIn(300);
              chatToBottom(count);
              answering = false;
            }, 500);
          }
        }, 500);
      }
    }

    function choiceEvent(tag) {
      answering = true;
      if (tag == "next") {
        level = undefined;
        sessionStorageItem.push(qaList);

        sessionStorage.setItem(sessionStorageId + 'qalist', JSON.stringify(sessionStorageItem));
        $(`.text-num${count} .back-btn`).attr('disabled', true);
        count++;
        chartSet('next');
      } else if (tag == "back") {
        if (sessionStorageItem.length <= 1) {
          level = undefined;
          sessionStorageItem.push(qaList);
          sessionStorage.setItem(sessionStorageId + 'qalist', JSON.stringify(sessionStorageItem));
          $(`.text-num${count} .choice-box button`).attr('disabled', true);
          count++;
          chartSet('next');
        } else {
          if (sessionStorageItem[sessionStorageItem.length - 2]['list']) {
            level = sessionStorageItem[sessionStorageItem.length - 2];
            sessionStorageItem.push(level);
          } else {
            level = undefined;
            sessionStorageItem.push(qaList);
          }

          sessionStorage.setItem(sessionStorageId + 'qalist', JSON.stringify(sessionStorageItem));
          $(`.text-num${count} .choice-box button`).attr('disabled', true);
          count++
          chatToBottom(count);
          chartSet('back');
        }
      } else {
        if (level == undefined) {
          level = qaList[tag];
        } else {
          level = level['list'][tag];
        }
        sessionStorageItem.push(level);

        sessionStorage.setItem(sessionStorageId + 'qalist', JSON.stringify(sessionStorageItem));

        $(`.text-num${count} .choice-box button`).attr('disabled', true);
        count++
        ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${level['title']}</div></li>`);
        chatToBottom(count);
        count++;
        chartSet('');
      }
    }

    var searchInput = $('.qa-chart .chart-search-box [name="chartkeyword"]');
    var chartSearchBox = {
      "search": "",
      "list": []
    };
    var answering = false;
    function chartSearchEvent(val) {
      chartSearchBox = {
        "search": "",
        "list": []
      };
      chartSearchBox["search"] = val;
      var searchVal = `「${val}」のキーワードからの検索結果です。`;
      var searchValMiss = `「${val}」のキーワードからの検索結果がありません。`;
      for (let i = 0; i < qaList.length; i++) {
        if (qaList[i]['list']) {
          for (let i2 = 0; i2 < qaList[i]['list'].length; i2++) {
            if (qaList[i]['list'][i2]['list']) {
              for (let i3 = 0; i3 < qaList[i]['list'][i2]['list'].length; i3++) {
                if (qaList[i]['list'][i2]['list'][i3]['text'].indexOf(val) >= 0 || qaList[i]['list'][i2]['list'][i3]['title'].indexOf(val) >= 0) {
                  chartSearchBox["list"].push(qaList[i]['list'][i2]['list'][i3]);
                  // 親タイトルが必要な際につけます。
                  if (settings.parentTagOn) {
                    chartSearchBox["list"][chartSearchBox["list"].length - 1]['title'] = `【${qaList[i]['title']}】${chartSearchBox["list"][chartSearchBox["list"].length - 1]['title']}`;
                  }
                }
              }
            } else {
              if (qaList[i]['list'][i2]['text'].indexOf(val) >= 0 || qaList[i]['list'][i2]['title'].indexOf(val) >= 0) {
                chartSearchBox["list"].push(qaList[i]['list'][i2]);
                // 親タイトルが必要な際につけます。
                if (settings.parentTagOn) {
                  chartSearchBox["list"][chartSearchBox["list"].length - 1]['title'] = `【${qaList[i]['title']}】${chartSearchBox["list"][chartSearchBox["list"].length - 1]['title']}`;
                }
              }
            }
          }
        } else {
          if (qaList[i]['text'].indexOf(val) >= 0 || qaList[i]['title'].indexOf(val) >= 0) {
            chartSearchBox["list"].push(qaList[i]);
          }
        }
      }

      level = chartSearchBox;
      sessionStorageItem.push(chartSearchBox);
      sessionStorage.setItem(sessionStorageId + 'qalist', JSON.stringify(sessionStorageItem));
      $(`.text-num${count}`).html(`<div class="text-chart" style="display:none;"></div>`);
      if (chartSearchBox['list'].length > 0) {
        for (let i = 0; i < searchVal.length; i++) {
          if (i == 0) {
            $(`.text-num${count} .text-chart`).append(searchVal[i]);
          } else {
            $(`.text-num${count} .text-chart`).append(searchVal[i]);
          }
        } $(`.text-num${count} .text-chart`).fadeIn(300);
        chatToBottom(count);

        setTimeout(() => {
          var tag = $('<ul>', {
            class: `choice-box`,
            style: 'display:none;',
          });
          for (let i2 = 0; i2 < chartSearchBox["list"].length; i2++) {
            tag.append(`<li><button type="button" class="choice-btn" data-qanum="${i2}">${chartSearchBox["list"][i2]["title"]}</button></li>`);
            chartSearchBox["list"][i2]["title"] = chartSearchBox["list"][i2]["title"].substr(chartSearchBox["list"][i2]["title"].indexOf("】") + 1);
            chatToBottom(count);
          }
          $(`.text-num${count} .text-chart`).addClass('-btn');
          $(`.text-num${count} .text-chart`).append(tag);

          chatToBottom(count);
          $(`.text-num${count} .text-chart .choice-box`).fadeIn(300);
          chatToBottom(count);
          answering = false;
        }, 500);
      } else {
        for (let i = 0; i < searchValMiss.length; i++) {
          if (i == 0) {
            $(`.text-num${count} .text-chart`).append(searchValMiss[i]);
            chatToBottom(count);
          } else {
            $(`.text-num${count} .text-chart`).append(searchValMiss[i]);
            chatToBottom(count);
          }
        }
        $(`.text-num${count} .text-chart`).fadeIn(300);
        chatToBottom(count);
        setTimeout(() => {
          count++;
          ul.append(`<li class="text-num${count} left-chart" style="display:none;"><div class="text-chart -btn"><button class="back-btn" data-qanum="next">${settings.backText01}</button></div></li>`);
          $(`.text-num${count}.left-chart`).fadeIn(300);
          chatToBottom(count);
          answering = false;
        }, 500);
      }
    }



    searchInput.on('keypress', function (e) {
      if (e.keyCode === 13) {
        if (searchInput.val().length > 0) {
          if (!answering) {
            answering = true;
            $(`.qa-chart .text-num${count} button`).attr('disabled', true);
            var inputVal = searchInput.val();
            searchInput.val('');
            count++;
            ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${inputVal}</div></li>`);
            count++;
            ul.append(`<li class="text-num${count} left-chart"><div class="robot-loading-field"><span class="circle"></span><span class="circle"></span><span class="circle"></span></div></li>`);

            chatToBottom(count);
            setTimeout(function () {
              chartSearchEvent(inputVal);
            }, 600);
          }
        }
      }
    });

    $('.qa-chart .chart-search-box .chartsearch-btn').on('click', function () {
      if (searchInput.val().length > 0) {
        if (!answering) {
          answering = true;
          $(`.qa-chart .text-num${count} button`).attr('disabled', true);
          var inputVal = searchInput.val();
          searchInput.val('');
          count++;
          ul.append(`<li class="text-num${count} right-chart"><div class="text-chart">${inputVal}</div></li>`);
          count++;
          ul.append(`<li class="text-num${count} left-chart"><div class="robot-loading-field"><span class="circle"></span><span class="circle"></span><span class="circle"></span></div></li>`);

          chatToBottom(count);
          setTimeout(function () {
            chartSearchEvent(inputVal);
          }, 600);
        }
      }
    });

    chartMainTag.on('click', '.choice-btn,.back-btn', function () {
      choiceEvent($(this).data('qanum'));
    });

    $('.qa-chart .chart-qa-ttl').on('click', function () {
      if (!$('.qa-chart').hasClass('-open')) {
        $('.qa-chart').addClass('-open');
        sessionStorage.setItem(sessionStorageId + 'qaOpenstatus', '1');
        chartStart();
      } else {
        $('.qa-chart').removeClass('-open');
        $('.qa-chart .chart-list').html('');
        sessionStorage.removeItem(sessionStorageId + 'qaOpenstatus');
      }
    });
    if (sessionStorage.getItem(sessionStorageId + 'qaOpenstatus')) {
      $('.qa-chart').addClass('-open');
      chartStart();
    }
  };
})(jQuery);
