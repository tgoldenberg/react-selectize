(function(){
  var ref$, each, filter, find, findIndex, id, initial, last, map, objToPairs, partition, reject, reverse, Str, sortBy, sum, values, clamp, isEqualToObject, React, div, input, span, createClass, createFactory, findDOMNode, ReactCSSTransitionGroup, Tether, Div, OptionWrapper, ValueWrapper, cancelEvent, classNameFromObject;
  ref$ = require('prelude-ls'), each = ref$.each, filter = ref$.filter, find = ref$.find, findIndex = ref$.findIndex, id = ref$.id, initial = ref$.initial, last = ref$.last, map = ref$.map, objToPairs = ref$.objToPairs, partition = ref$.partition, reject = ref$.reject, reverse = ref$.reverse, Str = ref$.Str, sortBy = ref$.sortBy, sum = ref$.sum, values = ref$.values;
  ref$ = require('prelude-extension'), clamp = ref$.clamp, isEqualToObject = ref$.isEqualToObject;
  React = require('react'), ref$ = React.DOM, div = ref$.div, input = ref$.input, span = ref$.span, createClass = React.createClass, createFactory = React.createFactory;
  findDOMNode = require('react-dom').findDOMNode;
  ReactCSSTransitionGroup = createFactory(require('react-addons-css-transition-group'));
  Tether = createFactory(require('./Tether'));
  Div = createFactory(require('./Div'));
  OptionWrapper = createFactory(require('./OptionWrapper'));
  ValueWrapper = createFactory(require('./ValueWrapper'));
  ref$ = require('./utils'), cancelEvent = ref$.cancelEvent, classNameFromObject = ref$.classNameFromObject;
  module.exports = createClass({
    displayName: 'ReactSelectize',
    focusLock: false,
    scrollLock: false,
    getDefaultProps: function(){
      return {
        anchor: null,
        autosize: function($search){
          var x$, $input, ref$;
          if ($search.value.length === 0) {
            $search.style.width = !!($search != null && $search.currentStyle) ? '4px' : '2px';
          } else {
            if ($search.scrollWidth > 0) {
              $search.style.width = (2 + $search.scrollWidth) + "px";
            } else {
              x$ = $input = document.createElement('div');
              x$.innerHTML = $search.value;
              (function(){
                var ref$;
                return ref$ = $input.style, ref$.display = 'inline-block', ref$.width = "", ref$;
              })(
              each(function(arg$){
                var key, value;
                key = arg$[0], value = arg$[1];
                return $input.style[key] = value;
              })(
              objToPairs(
              !!$search.currentStyle
                ? $search.currentStyle
                : (ref$ = document.defaultView) != null
                  ? ref$
                  : window.getComputedStyle($search))));
              document.body.appendChild($input);
              $search.style.width = (4 + $input.clientWidth) + "px";
              document.body.removeChild($input);
            }
          }
        },
        delimiters: [],
        disabled: false,
        dropdownDirection: 1,
        firstOptionIndexToHighlight: function(options){
          return 0;
        },
        groupId: function(it){
          return it.groupId;
        },
        groupsAsColumns: false,
        highlightedUid: undefined,
        onAnchorChange: function(anchor){},
        onBlur: function(values, reason){},
        onEnter: function(highlightedOption){},
        onFocus: function(values, reason){},
        onHighlightedUidChange: function(uid, callback){},
        onOpenChange: function(open, callback){},
        onPaste: function(e){
          true;
        },
        onSearchChange: function(search, callback){},
        onValuesChange: function(values, callback){},
        open: false,
        options: [],
        renderNoResultsFound: function(){
          return div({
            className: 'no-results-found'
          }, "No results found");
        },
        renderGroupTitle: function(index, arg$){
          var groupId, title;
          if (arg$ != null) {
            groupId = arg$.groupId, title = arg$.title;
          }
          return div({
            className: 'simple-group-title',
            key: groupId
          }, title);
        },
        renderOption: function(arg$){
          var label, newOption, selectable, isSelectable;
          if (arg$ != null) {
            label = arg$.label, newOption = arg$.newOption, selectable = arg$.selectable;
          }
          isSelectable = typeof selectable === 'undefined' || selectable;
          return div({
            className: "simple-option " + (isSelectable ? '' : 'not-selectable')
          }, span(null, !!newOption ? "Add " + label + " ..." : label));
        },
        renderValue: function(arg$){
          var label;
          label = arg$.label;
          return div({
            className: 'simple-value'
          }, span(null, label));
        },
        search: "",
        style: {},
        tether: false,
        transitionEnter: false,
        transitionLeave: false,
        transitionEnterTimeout: 200,
        transitionLeaveTimeout: 200,
        uid: id,
        values: []
      };
    },
    render: function(){
      var anchorIndex, dynamicClassName, ref$, renderSelectedValues, this$ = this;
      anchorIndex = (function(){
        var ref$;
        switch (false) {
        case !(typeof this.props.anchor === 'undefined' || this.props.anchor === null):
          return -1;
        default:
          return (ref$ = findIndex(function(it){
            return this$.isEqualToObject(it, this$.props.anchor);
          }, this.props.values)) != null
            ? ref$
            : this.props.values.length - 1;
        }
      }.call(this));
      dynamicClassName = classNameFromObject((ref$ = {}, ref$[this.props.className + ""] = 1, ref$.disabled = this.props.disabled, ref$.open = this.props.open, ref$.flipped = this.props.dropdownDirection === -1, ref$.tethered = this.props.tether, ref$));
      renderSelectedValues = function(it){
        return map(function(index){
          var item, uid;
          item = this$.props.values[index];
          uid = this$.props.uid(item);
          return ValueWrapper({
            uid: uid,
            key: this$.uidToString(uid),
            item: item,
            renderItem: this$.props.renderValue
          });
        })(
        it);
      };
      return div({
        className: "react-selectize " + dynamicClassName,
        style: this.props.style
      }, !!this.props.name ? input({
        type: 'hidden',
        name: this.props.name,
        value: this.props.serialize(this.props.values)
      }) : void 8, div({
        className: 'react-selectize-control',
        ref: 'control',
        onClick: function(){
          return this$.props.onAnchorChange(last(this$.props.values), function(){
            return this$.props.onOpenChange(true, function(){
              return this$.focusOnInput();
            });
          });
        }
      }, this.props.search.length === 0 && this.props.values.length === 0 ? div({
        className: 'react-selectize-placeholder'
      }, this.props.placeholder) : void 8, renderSelectedValues((function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = anchorIndex; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }())), input({
        disabled: this.props.disabled,
        ref: 'search',
        type: 'text',
        value: this.props.search,
        onChange: function(arg$){
          var value;
          value = arg$.currentTarget.value;
          return this$.props.onSearchChange(value, function(){
            return this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1);
          });
        },
        onFocus: function(){
          (function(){
            return function(callback){
              if (!!this$.focusLock) {
                return callback(this$.focusLock = false);
              } else {
                return this$.props.onOpenChange(true, function(){
                  return callback(true);
                });
              }
            };
          })()(function(result){
            return this$.props.onFocus(this$.props.values, !!result ? 'event' : 'function-call');
          });
        },
        onPaste: this.props.onPaste,
        onKeyDown: function(e){
          var highlightedOption, index;
          switch (e.which) {
          case 9:
            this$.closeDropdown(function(){
              return this$.props.onBlur(this$.props.values, 'tab');
            });
            break;
          case 8:
            if (this$.props.search.length > 0 || anchorIndex === -1) {
              return;
            }
            (function(){
              var anchorIndexOnRemove, nextAnchor, valueToRemove, ref$;
              anchorIndexOnRemove = anchorIndex;
              nextAnchor = anchorIndex - 1 < 0
                ? undefined
                : this$.props.values[anchorIndex - 1];
              valueToRemove = this$.props.values[anchorIndex];
              return this$.props.onValuesChange((ref$ = reject(function(it){
                return this$.isEqualToObject(it, valueToRemove);
              }, this$.props.values)) != null
                ? ref$
                : [], function(){
                return function(){
                  return function(callback){
                    if (typeof find(function(it){
                      return this$.isEqualToObject(it, valueToRemove);
                    }, this$.props.values) === 'undefined') {
                      if (!!this$.props.restoreOnBackspace) {
                        return this$.props.onSearchChange(this$.props.restoreOnBackspace(valueToRemove), function(){
                          return callback(true);
                        });
                      } else {
                        return callback(true);
                      }
                    } else {
                      return callback(false);
                    }
                  };
                }()(function(result){
                  if (!!result) {
                    this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1);
                  }
                  if (!!result && anchorIndex === anchorIndexOnRemove && (typeof nextAnchor === 'undefined' || !!find(function(it){
                    return this$.isEqualToObject(it, nextAnchor);
                  })(
                  this$.props.values))) {
                    return this$.props.onAnchorChange(nextAnchor, function(){});
                  }
                });
              });
            })();
            cancelEvent(e);
            break;
          case 27:
            (function(){
              if (this$.props.open) {
                return function(it){
                  return this$.props.onOpenChange(false, it);
                };
              } else {
                return function(it){
                  return this$.props.onValuesChange([], it);
                };
              }
            })()(function(){
              return this$.props.onSearchChange("", function(){
                return this$.focusOnInput();
              });
            });
          }
          if (in$(e.which, [13].concat(this$.props.delimiters)) && this$.props.open) {
            highlightedOption = (function(){
              switch (false) {
              case typeof this.props.highlightedUid !== 'undefined':
                return undefined;
              default:
                return this.props.options[this.optionIndexFromUid(this.props.highlightedUid)];
              }
            }.call(this$));
            this$.props.onEnter(highlightedOption);
            this$.selectHighlightedUid(anchorIndex, function(selectedValue){
              if (!selectedValue) {
                return this$.blur('enter');
              }
            });
            return cancelEvent(e);
          }
          if (this$.props.search.length === 0) {
            switch (e.which) {
            case 37:
              this$.props.onAnchorChange(anchorIndex - 1 < 0 || e.metaKey
                ? undefined
                : this$.props.values[clamp(anchorIndex - 1, 0, this$.props.values.length - 1)], function(){});
              break;
            case 39:
              this$.props.onAnchorChange(e.metaKey
                ? last(this$.props.values)
                : this$.props.values[clamp(anchorIndex + 1, 0, this$.props.values.length - 1)], function(){});
            }
          }
          switch (e.which) {
          case 38:
            this$.scrollLock = true;
            index = -1 + this$.optionIndexFromUid(this$.props.highlightedUid);
            return this$.highlightAndScrollToSelectableOption(index, -1, function(result){
              if (!result) {
                return this$.highlightAndScrollToSelectableOption(this$.props.options.length - 1, -1);
              }
            });
          case 40:
            this$.scrollLock = true;
            index = 1 + this$.optionIndexFromUid(this$.props.highlightedUid);
            return this$.highlightAndScrollToSelectableOption(index, 1, function(result){
              if (!result) {
                return this$.highlightAndScrollToSelectableOption(0, 1);
              }
            });
          }
        }
      }), renderSelectedValues((function(){
        var i$, to$, results$ = [];
        for (i$ = anchorIndex + 1, to$ = this.props.values.length; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }.call(this))), div({
        className: 'react-selectize-reset',
        onClick: function(e){
          (function(){
            return this$.props.onValuesChange([], function(){
              return this$.props.onSearchChange("", function(){
                return this$.focusOnInput();
              });
            });
          })();
          return cancelEvent(e);
        }
      }, '×'), div({
        className: 'react-selectize-arrow',
        onClick: function(e){
          if (this$.props.open) {
            this$.blur('arrow-click');
          } else {
            this$.props.onAnchorChange(last(this$.props.values), function(){
              return this$.props.onOpenChange(true, function(){
                return this$.focusOnInput();
              });
            });
          }
          return cancelEvent(e);
        }
      })), this.renderTetheredDropdown({
        anchorIndex: anchorIndex,
        dynamicClassName: dynamicClassName
      }));
    },
    renderTetheredDropdown: function(computedState){
      var this$ = this;
      if (this.props.tether) {
        return Tether({
          target: function(){
            return findDOMNode(this$.refs.control);
          },
          options: {
            attachment: "top left",
            targetAttachment: "bottom left",
            constraints: [{
              to: 'scrollParent'
            }]
          }
        }, this.renderAnimatedDropdown(computedState));
      } else {
        return this.renderAnimatedDropdown(computedState);
      }
    },
    renderAnimatedDropdown: function(computedState){
      var dynamicClassName;
      dynamicClassName = computedState.dynamicClassName;
      if (!!this.props.transitionEnter || !!this.props.transitionLeave) {
        return ReactCSSTransitionGroup({
          component: 'div',
          transitionName: 'slide',
          transitionEnter: this.props.transitionEnter,
          transitionLeave: this.props.transitionLeave,
          transitionEnterTimeout: this.props.transitionEnterTimeout,
          transitionLeaveTimeout: this.props.transitionLeaveTimeout,
          className: "react-selectize-dropdown-container " + dynamicClassName,
          ref: 'dropdown-container'
        }, this.renderDropdown(computedState));
      } else {
        return this.renderDropdown(computedState);
      }
    },
    renderOptions: function(options, anchorIndex){
      var this$ = this;
      return map(function(index){
        var option, uid;
        option = options[index];
        uid = this$.props.uid(option);
        return OptionWrapper(import$({
          uid: uid,
          ref: "option-" + this$.uidToString(uid),
          key: this$.uidToString(uid),
          item: option,
          highlight: isEqualToObject(this$.props.highlightedUid, uid),
          selectable: option != null ? option.selectable : void 8,
          onMouseMove: function(arg$){
            var currentTarget;
            currentTarget = arg$.currentTarget;
            if (this$.scrollLock) {
              this$.scrollLock = false;
            }
          },
          onMouseOut: function(){
            if (!this$.scrollLock) {
              this$.props.onHighlightedUidChange(undefined);
            }
          },
          renderItem: this$.props.renderOption
        }, (function(){
          switch (false) {
          case !(typeof (option != null ? option.selectable : void 8) === 'boolean' && !option.selectable):
            return {
              onClick: cancelEvent
            };
          default:
            return {
              onClick: function(e){
                this$.selectHighlightedUid(anchorIndex, function(){});
              },
              onMouseOver: function(arg$){
                var currentTarget;
                currentTarget = arg$.currentTarget;
                if (!this$.scrollLock) {
                  this$.props.onHighlightedUidChange(uid);
                }
              }
            };
          }
        }())));
      })(
      (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = options.length; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }()));
    },
    renderDropdown: function(arg$){
      var anchorIndex, dynamicClassName, ref$, ref1$, groups, this$ = this;
      anchorIndex = arg$.anchorIndex, dynamicClassName = arg$.dynamicClassName;
      if (this.props.open) {
        return Div({
          className: "react-selectize-dropdown " + dynamicClassName,
          key: 'dropdown',
          ref: 'dropdown',
          onHeightChange: function(height){
            if (this$.refs['dropdown-container']) {
              findDOMNode(this$.refs['dropdown-container']).style.height = height + "px";
            }
          }
        }, this.props.options.length === 0
          ? this.props.renderNoResultsFound()
          : ((ref$ = this.props) != null ? (ref1$ = ref$.groups) != null ? ref1$.length : void 8 : void 8) > 0
            ? (groups = map(function(index){
              var group, groupId, options;
              group = this$.props.groups[index], groupId = group.groupId;
              options = filter(function(it){
                return this$.props.groupId(it) === groupId;
              })(
              this$.props.options);
              return {
                index: index,
                group: group,
                options: options
              };
            })(
            (function(){
              var i$, to$, results$ = [];
              for (i$ = 0, to$ = this.props.groups.length; i$ < to$; ++i$) {
                results$.push(i$);
              }
              return results$;
            }.call(this))), div({
              className: "groups " + (!!this.props.groupsAsColumns ? 'as-columns' : '')
            }, map(function(arg$){
              var index, group, groupId, options;
              index = arg$.index, group = arg$.group, groupId = group.groupId, options = arg$.options;
              return div({
                key: groupId
              }, this$.props.renderGroupTitle(index, group, options), div({
                className: 'options'
              }, this$.renderOptions(options, anchorIndex)));
            })(
            filter(function(it){
              return it.options.length > 0;
            })(
            groups))))
            : this.renderOptions(this.props.options, anchorIndex));
      } else {
        return null;
      }
    },
    componentDidMount: function(){
      var this$ = this;
      document.addEventListener('click', this.externalClickListener = function(arg$){
        var target, nodes, domNodeContains;
        target = arg$.target;
        nodes = map(findDOMNode)(
        filter(function(it){
          return !!it;
        })(
        [this$, this$.refs.dropdown]));
        domNodeContains = function(element){
          if (typeof element === 'undefined' || element === null) {
            return false;
          }
          if (in$(element, nodes)) {
            return true;
          }
          return domNodeContains(element.parentElement);
        };
        if (this$.props.open && !domNodeContains(target)) {
          return this$.blur('click-outside');
        }
      }, true);
    },
    componentWillUnmount: function(){
      document.removeEventListener('click', this.externalClickListener, true);
    },
    componentDidUpdate: function(prevProps){
      var x$, $search, ref;
      if (this.props.open && !prevProps.open && this.props.highlightedUid === undefined) {
        this.highlightAndScrollToSelectableOption(this.props.firstOptionIndexToHighlight(this.props.options), 1);
        this.focusOnInput();
      }
      if (!this.props.open && prevProps.open) {
        this.props.onHighlightedUidChange(undefined);
      }
      x$ = $search = findDOMNode(this.refs.search);
      x$.style.width = "0px";
      x$.style.width = this.props.autosize($search) + "px";
      ref = this.refs[!!this.refs['dropdown-container'] ? 'dropdown-container' : 'dropdown'];
      if (!!ref) {
        findDOMNode(ref).style.bottom = this.props.dropdownDirection === -1 ? findDOMNode(this.refs.control).offsetHeight : "";
      }
    },
    componentWillReceiveProps: function(props){
      if ((typeof this.props.disabled === 'undefined' || this.props.disabled === false) && (typeof props.disabled !== 'undefined' && props.disabled === true)) {
        this.props.onOpenChange(false);
      }
    },
    optionIndexFromUid: function(uid){
      var this$ = this;
      return findIndex(function(it){
        return isEqualToObject(uid, this$.props.uid(it));
      })(
      this.props.options);
    },
    closeDropdown: function(callback){
      var this$ = this;
      this.props.onOpenChange(false, function(){
        return this$.props.onAnchorChange(last(this$.props.values), callback);
      });
    },
    blur: function(reason){
      var input, this$ = this;
      reason == null && (reason = 'function-call');
      input = findDOMNode(this.refs.search);
      if (input === document.activeElement) {
        input.blur();
      }
      return this.closeDropdown(function(){
        return this$.props.onBlur(this$.props.values, reason);
      });
    },
    focusOnInput: function(){
      var input;
      input = findDOMNode(this.refs.search);
      if (input !== document.activeElement) {
        this.focusLock = true;
        input.focus();
      }
    },
    highlightAndScrollToOption: function(index, callback){
      var uid, this$ = this;
      callback == null && (callback = function(){});
      uid = this.props.uid(this.props.options[index]);
      this.props.onHighlightedUidChange(uid, function(){
        var ref$, ref1$, optionElement, parentElement, optionHeight;
        if ((ref$ = findDOMNode((ref1$ = this$.refs) != null ? ref1$["option-" + this$.uidToString(uid)] : void 8)) != null) {
          optionElement = ref$;
        }
        parentElement = findDOMNode(this$.refs.dropdown);
        if (!!optionElement) {
          optionHeight = optionElement.offsetHeight - 1;
          if (optionElement.offsetTop - parentElement.scrollTop >= parentElement.offsetHeight) {
            parentElement.scrollTop = optionElement.offsetTop - parentElement.offsetHeight + optionHeight;
          } else if (optionElement.offsetTop - parentElement.scrollTop + optionHeight <= 0) {
            parentElement.scrollTop = optionElement.offsetTop;
          }
        }
        return callback();
      });
    },
    highlightAndScrollToSelectableOption: function(index, direction, callback){
      var this$ = this;
      callback == null && (callback = function(){});
      if (direction === 0) {
        index = 0;
      }
      (function(){
        if (!this$.props.open) {
          return function(it){
            return this$.props.onOpenChange(true, it);
          };
        } else {
          return function(it){
            return it();
          };
        }
      })()(function(){
        var option, ref$, ref1$;
        if (index < 0 || index >= this$.props.options.length) {
          return this$.props.onHighlightedUidChange(undefined, function(){
            return callback(false);
          });
        } else {
          option = (ref$ = this$.props) != null ? (ref1$ = ref$.options) != null ? ref1$[index] : void 8 : void 8;
          if (typeof (option != null ? option.selectable : void 8) === 'boolean' && !option.selectable) {
            return this$.highlightAndScrollToSelectableOption(index + direction, direction, callback);
          } else {
            return this$.highlightAndScrollToOption(index, function(){
              return callback(true);
            });
          }
        }
      });
    },
    isEqualToObject: function(){
      return isEqualToObject(this.props.uid(arguments[0]), this.props.uid(arguments[1]));
    },
    selectHighlightedUid: function(anchorIndex, callback){
      var index, option, this$ = this;
      if (this.props.highlightedUid === undefined) {
        return callback();
      }
      index = this.optionIndexFromUid(this.props.highlightedUid);
      if (typeof index !== 'number') {
        return callback();
      }
      option = this.props.options[index];
      this.props.onValuesChange(map(function(it){
        return this$.props.values[it];
      }, (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = anchorIndex; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }())).concat([option], map(function(it){
        return this$.props.values[it];
      }, (function(){
        var i$, to$, results$ = [];
        for (i$ = anchorIndex + 1, to$ = this.props.values.length; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }.call(this)))), function(){
        var value;
        value = find(function(it){
          return this$.isEqualToObject(it, option);
        }, this$.props.values);
        if (!value) {
          return callback();
        }
        return this$.props.onSearchChange("", function(){
          return this$.props.onAnchorChange(value, function(){
            if (!this$.props.open) {
              return callback(value);
            }
            return this$.highlightAndScrollToSelectableOption(index, 1, function(result){
              if (!!result) {
                return callback(value);
              }
              return this$.highlightAndScrollToSelectableOption(this$.props.firstOptionIndexToHighlight(this$.props.options), 1, function(result){
                if (!result) {
                  return this$.props.onOpenChange(false, function(){
                    return callback(value);
                  });
                } else {
                  return callback(value);
                }
              });
            });
          });
        });
      });
    },
    uidToString: function(uid){
      return (typeof uid === 'object' ? JSON.stringify : id)(uid);
    }
  });
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
