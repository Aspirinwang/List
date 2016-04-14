(function () {
    'use strict';

    var form = {


        init: function () {

            this.cacheDom();
            this.bindEvents();
            this.evalList();
        },

        cacheDom: function () {
            this.itemInput = document.getElementById("input-item");
            this.addBtn = document.getElementById("add-item-btn");
            this.listBody = document.getElementById("list-body");
            this.listBodyChildren = this.listBody.children;
            this.subBtn = document.getElementById("sub-button");
        },

        bindEvents: function () {
            this.addBtn.onclick = this.addItem.bind(this);
            this.itemInput.onkeypress = this.enterKey.bind(this);
            this.subBtn.onclick = this.subList.bind(this);
        },

        addItem: function () {
            var value = this.itemInput.value;
            var max = 5;
            if (value === "") {
                this.error();
            } else {
                if(this.listBodyChildren.length >= max){
                    this.maxError();} else{
                this.generator();
                this.itemInput.value = "";
                this.evalList();
                }
            }
        },

        generator: function () {
            var listItem, itemValue, delBtn, itemDel;

            listItem = document.createElement("li");
            listItem.setAttribute("class", "item");

            itemValue = document.createTextNode(this.itemInput.value);

            delBtn = document.createElement("button");

            itemDel = document.createElement("i");
            itemDel.setAttribute("class", "fa fa-trash");

            delBtn.appendChild(itemDel);

            listItem.appendChild(itemValue);
            listItem.appendChild(delBtn);

            this.listBody.appendChild(listItem);

        },

        enterKey: function (event) {
            event = event || window.event;
            if (event.keyCode || event.which) {
                this.default()
            };
            if (event.keyCode === 13 || event.which === 13) {
                this.addItem();
            }
        },

        evalList: function () {

            var i, delBtn;

            if (this.listBodyChildren.length != 0) {
                this.subBtn.style.display = "inline-block";
            } else {
                this.subBtn.style.display = "none"
            }

            for (i = 0; i < this.listBodyChildren.length; i++) {
                delBtn = this.listBodyChildren[i].getElementsByTagName("button")[0];
                delBtn.onclick = this.delItem.bind(this, i);
            }
        },

        delItem: function (i) {
            this.listBody.children[i].remove();
            this.evalList();
        },

        default: function () {
            this.itemInput.style.borderColor = "white";
            this.itemInput.placeholder = "Enter Text";
        },

        error: function () {
            this.itemInput.style.borderColor = "red";
            this.itemInput.placeholder = "Please enter an item";
        },

        maxError: function(){
            alert("ouch, too much ");
        },

        subList: function (e) {
            e.preventDefault();
            var listItem = [];

                for (var i = 0; i < this.listBodyChildren.length; i++) {
                    listItem[i] = this.listBodyChildren[i].textContent
                }
                console.log(listItem);

                for (var k = 0; k < this.listBodyChildren.length; i++) {
                    this.delItem(k);
                }


        }

}

    form.init();


}());