(function($) {
  var comp = function(a, b) {
    return a - b;
  };

  JSAV._types.ds.BinaryTree.prototype.postOrderTraversal = function() {
    var i = 0,
        jsav = this.jsav;
    var postorderNode = function(node) {
      if (node.left()) {
        postorderNode(node.left());
      }
      if (node.right()) {
        postorderNode(node.right());
      }
      node.highlight();
      jsav.label(i + 1, {relativeTo: node, visible: true, anchor: "right top"});
      jsav.stepOption("grade", true);
      jsav.step();
      i++;
    };
    postorderNode(this.root());
  };

  var initWrapper = function (tt) {
    return function() {
      var bt;
      var nodeNum = 9;
      if (bt) {
        bt.clear();
      }
      var dataTest = (function() {
        return function(dataArr) {
          var bst = tt.jsav.ds.bintree();
          bst.insert(dataArr);
          var result = bst.height() <= 4;
          bst.clear();
          return result;
        };
      })();
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum, {test: dataTest, tries: 30});
      bt = tt.jsav.ds.bintree({center: true, visible: true, nodegap: 15});
      bt.insert(initData);
      bt.layout();
      bt.click(tt.nodeClick(tt.exercise));
      tt.bt = bt;
      tt.initData = initData;
      tt.jsav.displayInit();
      return bt;
    };
  };

  var modelWrapper = function(tt) {
    return function model(modeljsav) {
      var modelBst = modeljsav.ds.bintree({center: true, nodegap: 15});
      for (var i = 0, l = tt.initData.length; i < l; i++) {
        modelBst.insert(tt.initData[i]);
      }
      modelBst.layout();
      modeljsav.clear();
      tt.modelFunction.call(modelBst);
      return modelBst;
    };
  };

  var TreeTraversal = function () {
    this.modelFunction = JSAV._types.ds.BinaryTree.prototype.postOrderTraversal;
    console.log(this.modelFunction);
    this.jsav = new JSAV($(".avcontainer"));
    this.jsav.recorded();
    this.exercise = this.jsav.exercise(modelWrapper(this), initWrapper(this), {"css": "background-color"}, {
      controls: $(".jsavexercisecontrols")
    });
    this.exercise.reset();
  };
  TreeTraversal.prototype.nodeClick = function(exercise) {
    return function() {
      if (this.element.hasClass("jsavnullnode") || this.isHighlight()) { return; }
      this.highlight();
      var pos = exercise.jsav.canvas.find(".jsavlabel:visible").size();
      exercise.jsav.label(pos + 1, {relativeTo: this, anchor: "right top"});
      exercise.gradeableStep();
    };
  };
  window.TreeTraversal = TreeTraversal;
}(jQuery));