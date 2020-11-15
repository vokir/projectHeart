(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var load = document.querySelector('#heart');
  var text = document.getElementsByClassName('heart-text');
  load.addEventListener("click", function () {
    load.classList.remove('heart-beat');
    load.classList.toggle('tool');
    text[0].style.opacity = '0';
    load.classList.add('heart-scale');
    setTimeout(function () {
      document.getElementById('loader').classList.add('loaded');
      setTimeout(function () {
        document.getElementById('loader').remove();
        next();
        document.body.style.overflow = 'auto';
      }, 600);
    }, 1550);
  }); // ——————————————————————————————————————————————————
  // TextScramble
  // ——————————————————————————————————————————————————

  var TextScramble = /*#__PURE__*/function () {
    function TextScramble(el) {
      _classCallCheck(this, TextScramble);

      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    _createClass(TextScramble, [{
      key: "setText",
      value: function setText(newText) {
        var _this = this;

        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function (resolve) {
          return _this.resolve = resolve;
        });
        this.queue = [];

        for (var i = 0; i < length; i++) {
          var from = oldText[i] || '';
          var to = newText[i] || '';
          var start = Math.floor(Math.random() * 40);
          var end = start + Math.floor(Math.random() * 40);
          this.queue.push({
            from: from,
            to: to,
            start: start,
            end: end
          });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
    }, {
      key: "update",
      value: function update() {
        var output = '';
        var complete = 0;

        for (var i = 0, n = this.queue.length; i < n; i++) {
          var _this$queue$i = this.queue[i],
              from = _this$queue$i.from,
              to = _this$queue$i.to,
              start = _this$queue$i.start,
              end = _this$queue$i.end,
              _char = _this$queue$i["char"];

          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!_char || Math.random() < 0.28) {
              _char = this.randomChar();
              this.queue[i]["char"] = _char;
            }

            output += "<span class=\"chars\">".concat(_char, "</span>");
          } else {
            output += from;
          }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
    }, {
      key: "randomChar",
      value: function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }]);

    return TextScramble;
  }(); // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————


  var phrases = ['Neo,', 'sooner or later', 'you\'re going to realize', 'just as I did', 'that there\'s a difference', 'between knowing the path', 'and walking the path'];
  var el = document.querySelector('.introduce-info__text');
  var fx = new TextScramble(el);
  var counter = 0;

  var next = function next() {
    fx.setText(phrases[counter]).then(function () {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };

  var bar = document.querySelectorAll('.burger-menu')[0].children;
  var menustate = 0;

  function open() {
    bar[0].style.width = "5%";
    bar[2].style.width = "5%";
    bar[1].style.width = "5%";
    bar[1].style.left = "47.5%";
    setTimeout(function () {
      bar[0].style.transform = "rotateZ(45deg)";
      bar[2].style.transform = "rotateZ(45deg)";
      bar[1].style.transform = "rotateZ(135deg)";
      setTimeout(function () {
        bar[2].style.top = "47%";
        bar[0].style.top = "47%";
        bar[0].style.width = "100%";
        bar[2].style.width = "100%";
        bar[1].style.left = "0px";
        bar[1].style.width = "100%";
      }, 50);
    }, 100);
    document.getElementById("myNav").style.height = "100%";
    menustate = 1;
  }

  function close() {
    bar[0].style.top = "25px";
    bar[2].style.top = "45px";
    bar[0].style.width = "5%";
    bar[2].style.width = "5%";
    bar[1].style.left = "47.5%";
    bar[1].style.width = "5%";
    setTimeout(function () {
      bar[0].style.transform = "rotateZ(0deg)";
      bar[2].style.transform = "rotateZ(0deg)";
      bar[1].style.transform = "rotateZ(0deg)";
      setTimeout(function () {
        bar[0].style.width = "100%";
        bar[2].style.width = "100%";
        bar[1].style.width = "100%";
        bar[1].style.left = "0%";
      }, 50);
    }, 100);
    menustate = 0;
    document.getElementById("myNav").style.height = "0%";
  }

  document.querySelector(".burger-menu").addEventListener("click", function () {
    if (menustate === 0) {
      open();
    } else {
      close();
    }
  });
  $("#myNav a").on("click", function () {
    $('html,body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 100
    }, 1000);
    document.getElementById("myNav").style.height = "0%";
    close();
  });

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('form')) {
      var myform = new Form(document.querySelectorAll('form'), {
        focusValidate: true,
        classes: {
          empty: 'input_empty',
          error: 'input-group__input_error',
          correct: 'input-group__input_correct'
        },
        fields: [{
          fieldName: 'name',
          maxLength: 32,
          realTimeRegExp: 'text',
          realTime: true,
          required: true
        }, {
          fieldName: 'message',
          realTimeRegExp: 'text',
          realTime: true
        }, {
          fieldName: 'phone',
          maxLength: 32,
          realTimeRegExp: 'phone',
          realTime: true,
          required: true,
          regExp: 'phone',
          mask: '+7 (***) ***-**-**'
        }]
      });
    }
  });

  function valid(e) {
    var inputs = document.querySelectorAll('form input');
    status = 0;

    var _iterator = _createForOfIteratorHelper(inputs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _input = _step.value;

        if (_input.classList.contains('input-group__input_correct')) {
          status++;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (status == 3) {
      e.preventDefault();
      var messages = {
        'message': []
      };

      var _inputs = document.querySelectorAll('form input');

      var _iterator2 = _createForOfIteratorHelper(_inputs),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var input = _step2.value;
          messages.message.push(input.value);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      JSON.stringify(messages);
      $.ajax({
        type: "POST",
        url: 'ajax.php',
        cache: false,
        data: {
          name: messages.message[0],
          phone: messages.message[1],
          text: messages.message[3]
        },
        dataType: "json",
        success: function success(data) {
          document.querySelector('.overlay-loader').classList.toggle('overlay-loader_active');
          document.querySelector('form').remove();
          $('.form-container').append("<div class=\"logo\"></div><br>\n\t\t\t\t<h1>\u0424\u043E\u0440\u043C\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430</h1>");
          setTimeout(function () {
            document.querySelector('.overlay-loader').classList.toggle('overlay-loader_active');
          }, 1000);
          console.log("Не проиграл");
        },
        error: function error(data) {
          console.log("Проиграл", data);
        }
      });
    }
  }

  try {
    document.getElementById('submit').addEventListener('click', function (e) {
      valid(e);
    });
  } catch (error) {}

}));
